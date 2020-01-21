import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import { CssTextStyle as styles } from "../styles/style";
interface Props {
  id: any;
  name: string;
  label: string;
  value: any;
  required: any;
  helperText?: any;
  variant?: any;
  handleTextChange: any;
  type: any;
  errorText: any;
}
class InputTextField extends Component<Props, {}> {
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
    }: any = this.props;
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
