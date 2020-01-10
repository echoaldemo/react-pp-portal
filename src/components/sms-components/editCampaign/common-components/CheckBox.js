import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
const styles = theme => ({
  formControl: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: theme.spacing(3),
    width: "100%"
  },
  helperText: {
    color: "#999999",
    marginTop: "-3px",
    fontSize: "12px"
  },
  subHelperText: {
    color: "#999999",
    marginTop: "15px",
    fontSize: "12px"
  },
  label: {
    "& .MuiFormControlLabel-label": {
      color: "#444851"
    }
  }
});
const checkBoxStyles = theme => ({
  root: {
    "&$checked": {
      color: "#1194f6"
    }
  },
  checked: {}
});
const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);
class CheckBox extends Component {
  render() {
    const {
      classes,
      input,
      label,
      formLabel,
      onchange,
      formSubLabel
    } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <FormControlLabel
          control={
            <CustomCheckbox
              checked={input}
              onChange={() => onchange()}
              value={input}
            />
          }
          label={label}
          className={classes.label}
        />

        {formLabel === "" ? null : (
          <FormHelperText className={classes.helperText}>
            {formLabel}
          </FormHelperText>
        )}
        {formSubLabel === "" ? null : (
          <FormHelperText className={classes.subHelperText}>
            {formSubLabel}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}
export default withStyles(styles)(CheckBox);
