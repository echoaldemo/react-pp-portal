import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import TextField from "@material-ui/core/TextField";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";

const styles: any = {
  input: {
    "&:after": {
      borderColor: "#1194f6"
    }
  }
};

function renderInput(inputProps: any) {
  const { InputProps, classes, ref, ...other }: any = inputProps;
  return (
    <TextField
      InputProps={{
        inputRef: ref,
        ...InputProps,
        classes: { underline: classes.classes.input }
      }}
      {...other}
    />
  );
}
function getHighlightedText(
  fname: any,
  lname: any,
  user_name: any,
  higlight: any
) {
  // Split text on higlight term, include term itself into parts, ignore case
  var parts = fname.split(new RegExp(`(${higlight})`, "gi"));
  var part2 = lname.split(new RegExp(`(${higlight})`, "gi"));
  var username = user_name.split(new RegExp(`(${higlight})`, "gi"));
  return (
    <React.Fragment>
      <span>
        {parts.map((part: any) =>
          part.toLowerCase() === higlight.toLowerCase() ? (
            <b style={{ color: "#2b9ff7" }}>{part}</b>
          ) : (
            part
          )
        )}
      </span>
      &nbsp;
      <span>
        {part2.map((part: any) =>
          part.toLowerCase() === higlight.toLowerCase() ? (
            <b style={{ color: "#2b9ff7" }}>{part}</b>
          ) : (
            part
          )
        )}
      </span>
      &nbsp; | &nbsp;
      <span>
        {username.map((part: any) =>
          part.toLowerCase() === higlight.toLowerCase() ? (
            <b style={{ color: "#2b9ff7" }}>{part}</b>
          ) : (
            part
          )
        )}
      </span>
    </React.Fragment>
  );
}
function renderSuggestion(suggestionProps: any) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    inputValue
  } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const highlightedText = getHighlightedText(
    suggestion.first_name,
    suggestion.last_name,
    suggestion.username,
    inputValue
  );
  return (
    <MenuItem
      {...itemProps}
      key={suggestion.fullname}
      selected={isHighlighted}
      component="div"
    >
      {highlightedText}
    </MenuItem>
  );
}
interface IProps {
  voices: any;
  searchFunction: any;
}
class Search extends Component<IProps, {}> {
  getSuggestions = (value: any, { showEmpty = false } = {}) => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    return inputLength === 0 && !showEmpty
      ? []
      : this.props.voices.filter((suggestion: any) => {
          const splitName = suggestion.first_name.split(" ");
          const splitLName = suggestion.last_name.split(" ");
          const keep =
            (count < 5 &&
              suggestion.first_name.slice(0, inputLength).toLowerCase() ===
                inputValue) ||
            splitName[0].slice(0, inputLength).toLowerCase() === inputValue ||
            suggestion.last_name.slice(0, inputLength).toLowerCase() ===
              inputValue ||
            splitLName[0].slice(0, inputLength).toLowerCase() === inputValue;
          if (keep) {
            count += 1;
          }
          return keep;
        });
  };
  render() {
    let popperNode: any;
    const { classes }: any = this.props;
    return (
      <div style={{ width: "100%" }}>
        <Downshift
          itemToString={selectedItem =>
            selectedItem
              ? `${selectedItem.first_name} ${selectedItem.last_name} | ${selectedItem.username}`
              : ""
          }
          onChange={selectedItem => {
            this.props.searchFunction(selectedItem.uuid);
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
            selectedItem
          }) => {
            const { onBlur, onFocus, onChange, ...inputProps } = getInputProps({
              placeholder: "Search a voice",
              disabled: localStorage.getItem("type") === "10" ? true : false
            });
            return (
              <div style={{ color: "red " }}>
                {renderInput({
                  classes: { classes },
                  fullWidth: true,
                  InputProps: { onBlur, onFocus, onChange },
                  inputProps,
                  ref: (node: any) => {
                    popperNode = node;
                  }
                })}
                <Popper
                  open={isOpen}
                  anchorEl={popperNode}
                  style={{ color: "red" }}
                  id={"suggestions"}
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
                        overflow: "auto",
                        width: popperNode ? popperNode.clientWidth : undefined
                      }}
                    >
                      {this.getSuggestions(inputValue).map(
                        (suggestion: any, index: any) =>
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
            );
          }}
        </Downshift>
      </div>
    );
  }
}

export default withStyles(styles)(Search);
