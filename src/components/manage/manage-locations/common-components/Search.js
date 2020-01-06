import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import Downshift from 'downshift'
import deburr from 'lodash/deburr'
import React, { Component } from 'react'

const styles = {
  input: {
    fontSize: '18px',
    '&:before': {
      borderBottom: '1px solid #e0e0e0'
    },
    '&:after': {
      borderColor: '#1194f6'
    }
  }
}

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps
  return (
    <TextField
      color="primary"
      InputProps={{
        inputRef: ref,
        ...InputProps,
        classes: { underline: classes.classes.input },
        endAdornment: (
          <InputAdornment position="end" style={{ color: '#bbbbbb' }}>
            <SearchIcon />
          </InputAdornment>
        )
      }}
      {...other}
    />
  )
}
function getHighlightedText(fname, lname, user_name, higlight) {
  // Split text on higlight term, include term itself into parts, ignore case
  var parts = fname.split(new RegExp(`(${higlight})`, 'gi'))
  var part2 = lname.split(new RegExp(`(${higlight})`, 'gi'))
  var username = user_name.split(new RegExp(`(${higlight})`, 'gi'))
  return (
    <React.Fragment>
      <span>
        {parts.map(part =>
          part.toLowerCase() === higlight.toLowerCase() ? (
            <b style={{ color: '#2b9ff7' }}>{part}</b>
          ) : (
            part
          )
        )}
      </span>
      &nbsp;
      <span>
        {part2.map(part =>
          part.toLowerCase() === higlight.toLowerCase() ? (
            <b style={{ color: '#2b9ff7' }}>{part}</b>
          ) : (
            part
          )
        )}
      </span>
      &nbsp; | &nbsp;
      <span>
        {username.map(part =>
          part.toLowerCase() === higlight.toLowerCase() ? (
            <b style={{ color: '#2b9ff7' }}>{part}</b>
          ) : (
            part
          )
        )}
      </span>
    </React.Fragment>
  )
}
function renderSuggestion(suggestionProps) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    inputValue
  } = suggestionProps
  const isHighlighted = highlightedIndex === index
  const highlightedText = getHighlightedText(
    suggestion.first_name,
    suggestion.last_name,
    suggestion.username,
    inputValue
  )
  return (
    <MenuItem
      {...itemProps}
      key={suggestion.fullname}
      selected={isHighlighted}
      component="div"
    >
      {highlightedText}
    </MenuItem>
  )
}
class Search extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { setRef } = this.props
    if (setRef && typeof setRef === 'function') {
      setRef(this.downshift)
    }
  }
  getSuggestions = (value, { showEmpty = false } = {}) => {
    const inputValue = deburr(value.trim()).toLowerCase()
    const inputLength = inputValue.length
    let count = 0
    return inputLength === 0 && !showEmpty
      ? []
      : this.props.data.filter(suggestion => {
          const splitName = suggestion.first_name.split(' ')
          const splitLName = suggestion.last_name.split(' ')
          const keep =
            (count < 5 &&
              suggestion.first_name.slice(0, inputLength).toLowerCase() ===
                inputValue) ||
            splitName[0].slice(0, inputLength).toLowerCase() === inputValue ||
            suggestion.last_name.slice(0, inputLength).toLowerCase() ===
              inputValue ||
            splitLName[0].slice(0, inputLength).toLowerCase() === inputValue
          if (keep) {
            count += 1
          }
          return keep
        })
  }
  render() {
    let popperNode
    const { classes } = this.props
    return (
      <div style={{ width: '100%' }}>
        <Downshift
          ref={downshift => (this.downshift = downshift)}
          itemToString={selectedItem =>
            selectedItem
              ? `${selectedItem.first_name} ${selectedItem.last_name} | ${selectedItem.username}`
              : ''
          }
          onChange={selectedItem => {
            if (selectedItem) {
              this.props.searchFunction(selectedItem)
            }
          }}
          id="downshift-popper"
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            highlightedIndex,
            inputValue,
            isOpen,
            selectedItem,
            clearSelection
          }) => {
            const { onBlur, onFocus, onChange, ...inputProps } = getInputProps({
              placeholder: this.props.searchText
            })
            return (
              <div>
                {renderInput({
                  fullWidth: true,
                  classes: { classes },
                  InputProps: {
                    onBlur,
                    onFocus,
                    onChange,
                    clearSelection
                  },
                  InputLabelProps: getLabelProps({ shrink: true }),
                  inputProps,
                  ref: node => {
                    popperNode = node
                  }
                })}
                <Popper
                  open={isOpen}
                  anchorEl={popperNode}
                  id={'suggestions'}
                  styles={{ zIndex: 0 }}
                >
                  <div
                    {...(isOpen
                      ? getMenuProps({}, { suppressRefError: true })
                      : {})}
                  >
                    <Paper
                      square
                      style={{
                        marginTop: 8,
                        maxHeight: 210,
                        overflow: 'auto',
                        width: popperNode ? popperNode.clientWidth : undefined
                      }}
                    >
                      {this.getSuggestions(inputValue).map(
                        (suggestion, index) =>
                          renderSuggestion({
                            suggestion,
                            index,
                            itemProps: getItemProps({ item: suggestion }),
                            highlightedIndex,
                            selectedItem,
                            inputValue
                          })
                      )}
                    </Paper>
                  </div>
                </Popper>
              </div>
            )
          }}
        </Downshift>
      </div>
    )
  }
}

export default withStyles(styles)(Search)
