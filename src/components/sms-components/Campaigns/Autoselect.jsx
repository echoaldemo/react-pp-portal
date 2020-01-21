import React, { useEffect } from 'react'
import deburr from 'lodash/deburr'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'

import { TextField, Paper, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import styles from './Styles/Autoselect.styles'

const useStyles = makeStyles(styles)

let suggestions = []
let camp = []

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps

  return (
    <TextField
      fullWidth
      autoFocus
      data-cy-add-new-campaign-field
      InputLabelProps={{ style: { color: '#777' } }}
      InputProps={{
        inputRef: node => {
          ref(node)
          inputRef(node)
        },
        classes: { input: classes.input }
      }}
      {...other}
    />
  )
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query)
  const parts = parse(suggestion.name, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, i) => (
          <span key={i} style={{ fontWeight: part.highlight ? 500 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  )
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.name.slice(0, inputLength).toLowerCase() === inputValue

        if (keep) count += 1

        return keep
      })
}

function getSuggestionValue(suggestion) {
  camp = suggestion
  return suggestion.name
}

export default function Autoselect(props) {
  const classes = useStyles()

  const [stateSuggestions, setSuggestions] = React.useState([])

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value))
  }

  const handleSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const handleChange = name => (event, { newValue }) => {
    if (camp.name === newValue) {
      props.handleC(newValue, camp.uuid, camp.realms, camp.company)
    } else {
      props.handleC(newValue)
    }
    let x = 0
    props.data.forEach(data => {
      if (data.name === newValue) {
        x++
      }
    })
    if (x !== 0) {
      props.setAutoSuggest(false)
      props.setError('Campaign already exist')
    } else {
      props.setAutoSuggest(true)
      props.setError('')
    }
  }

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion
  }

  useEffect(() => {
    suggestions = props.suggestion
  })
  return (
    <div className={classes.root}>
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          id: 'react-autosuggest-simple',
          label: 'Campaign',
          placeholder: 'Search a campaign',
          value: props.value,
          onChange: handleChange('single'),
          helperText: props.error,
          error: props.error ? true : false
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderSuggestionsContainer={options => (
          // console.log(options.children)
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
      <div className={classes.divider} />
    </div>
  )
}
