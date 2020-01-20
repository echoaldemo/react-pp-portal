import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const styles = () => ({
  menu: {
    width: 200
  }
});

const CssTextField = withStyles({
  root: {
    "& label": {
      color: "#999999",
      fontSize: "20px"
    },
    "& label.Mui-focused": {
      color: "#1194f6"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1194f6"
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
      }
    },
    width: "100%"
  }
})(TextField);

class Textfield extends Component {
  render() {
    const {
      classes,
      label,
      input,
      onchange,
      values,
      require,
      helperText,
      field,
      variant
    }: any = this.props;
    return (
      <CssTextField
        select
        label={label}
        required={require}
        value={input}
        onChange={e => onchange(e.target.value)}
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
        {values.map((option: any) => (
          <MenuItem key={option.id} value={option.id} data-testid="menu">
            {option.name}
          </MenuItem>
        ))}
      </CssTextField>
    );
  }
}
export default withStyles(styles)(Textfield);
