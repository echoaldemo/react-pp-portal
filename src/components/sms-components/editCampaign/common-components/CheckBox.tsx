import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import { styles, checkBoxStyles } from "../styles/style";

interface Props {
  name?: any;
  input: any;
  label: any;
  formLabel: any;
  onchange: any;
  formSubLabel?: any;
}
const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);
class CheckBox extends Component<Props, {}> {
  render() {
    const {
      classes,
      input,
      label,
      formLabel,
      onchange,
      formSubLabel
    }: any = this.props;
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
