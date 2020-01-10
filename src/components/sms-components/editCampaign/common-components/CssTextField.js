import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

const styles = theme => ({
  formControl: {
    marginTop: theme.spacing(0.5),
    width: "100%"
  },
  helperText: {
    marginTop: "2px"
  },
  root: {
    "& label.Mui-focused": {
      color: "#1194f6"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(238, 238, 238, 0.99)"
      },
      "&:hover fieldset": {
        border: "1.5px solid #1194f6"
        // borderColor: "#1194f6"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1194f6"
      },
      "& .Mui-error": {
        color: "#cc0300"
      }
    },
    width: "100%"
  },
  error: {
    "& label.Mui-focused": {
      color: "#cc0300"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(238, 238, 238, 0.99)"
      },
      "&:hover fieldset": {
        border: "1.5px solid #1194f6"
        // borderColor: "#1194f6"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#cc0300"
      },
      "& .Mui-error": {
        color: "#cc0300"
      },
      "& .Mui-error::after": {
        borderBottomColor: "#cc0300"
      }
    },
    width: "100%"
  },
  maxtextLimit: {
    color: "#999999"
  },
  mintextLimit: {
    color: "#999999"
  }
});

class InputTextField extends Component {
  render() {
    const {
      classes,
      label,
      name,
      value,
      handleTextChange,
      errorText,
      required,
      type,
      variant,
      helpertext
    } = this.props;
    return (
      <React.Fragment>
        <TextField
          id="standard-name"
          label={label}
          type={type}
          name={name}
          value={value}
          onChange={handleTextChange}
          margin="normal"
          required={required}
          variant={variant}
          className={errorText ? classes.error : classes.root}
          inputProps={{ maxLength: 160 }}
        />
        {label === "Message" ? (
          <FormHelperText className={classes.helperText}>
            {helpertext}
          </FormHelperText>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(InputTextField);
