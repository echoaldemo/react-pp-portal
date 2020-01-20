import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = (theme: any) => ({
  textField: {
    marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(5),
    width: "100%",
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
    "& label.Mui-error": {
      color: "#cc0300"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1194f6"
    },
    "& .Mui-error": {
      color: "#cc0300"
    },
    "& .Mui-error::after": {
      borderBottomColor: "#cc0300"
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "#999999"
    },
    "& .MuiFormHelperText-root": {
      width: "100%",
      color: "#999999",
      fontSize: "12px"
    },
    marginBottom: "20px"
  }
});
interface Props {
  helperText?: any;
  label: string;
  name: string;
  value: any;
  handleTextChange: (event: any) => void;
  keyup?: (event: any) => void;
  error?: boolean;
  required: boolean;
  type: string;
  id?: any;
  input?: any;
  onchange?: any;
  field?: any;
  variant?: any;
  onBlur?: any;
  dataCyID?: any;
}
class InputTextField extends Component<Props, {}> {
  render() {
    const {
      classes,
      label,
      name,
      value,
      handleTextChange,
      keyup,
      error,
      required,
      onBlur,
      type,
      helperText
    }: any = this.props;
    return (
      <TextField
        id={`standard-name`}
        label={label}
        type={type}
        name={name}
        className={classes.textField}
        value={value}
        onChange={handleTextChange}
        margin="normal"
        onKeyUp={keyup}
        onBlur={onBlur}
        error={error}
        required={required}
        helperText={helperText}
        inputProps={{
          style: { fontSize: "18px", color: "#444851" }
        }}
      />
    );
  }
}
export default withStyles(styles)(InputTextField);
