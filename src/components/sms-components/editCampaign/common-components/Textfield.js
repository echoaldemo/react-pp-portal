import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
const styles = theme => ({
  textField: {
    marginTop: theme.spacing(3),
    // marginBottom: theme.spacing(4),
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    textAlign: "left",
    "& label": {
      color: "#999999",
      fontSize: "20px",
      fontWeight: "bold",
      marginTop: "-10px"
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(238, 238, 238, 0.99)"
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "#1194f6"
    },
    "& label.Mui-focused": {
      color: "#1194f6"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1194f6"
    },
    "& .MuiSelect-selectMenu": {
      fontSize: "18px",
      color: "#444851"
    },
    "& .MuiFormHelperText-root": {
      width: "100%",
      color: "#999999",
      fontSize: "12px"
    },
    marginBottom: "20px"
  },
  textFieldNoInput: {
    marginTop: theme.spacing(3),
    // marginBottom: theme.spacing(4),
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    textAlign: "left",
    "& label": {
      color: "#999999",
      fontSize: "16px",
      marginTop: "-10px"
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(238, 238, 238, 0.99)"
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "#1194f6"
    },
    "& label.Mui-focused": {
      color: "#1194f6"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1194f6"
    },
    "& .MuiSelect-selectMenu": {
      fontSize: "18px",
      color: "#444851"
    },
    "& .MuiFormHelperText-root": {
      width: "100%",
      color: "#999999",
      fontSize: "12px"
    },
    marginBottom: "20px"
  },
  menu: {
    width: 200
  }
});
class Textfield extends Component {
  render() {
    const {
      classes,
      name,
      label,
      input,
      onchange,
      values,
      require,
      helperText,
      field,
      variant
    } = this.props;
    return (
      <TextField
      id="smsNumberMinutes"
        select
        label={label}
        name={name}
        required={require}
        // className={
        //   input.length === 0 ? classes.textFieldNoInput : classes.textField
        // }
        className={classes.textField}
        value={input}
        onChange={onchange}
        SelectProps={{
          MenuProps: {
            className: classes.menu
          }
        }}
        margin="normal"
        helperText={helperText}
        data-testid="textfield"
        variant={variant}
      >
        {values.map((option, i) => (
          <MenuItem key={option.id} value={option.id} data-cy={`menu${i}`}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}
export default withStyles(styles)(Textfield);
