import React from "react";
import { SelectField } from "./styles";
interface Props {
  children?: any;
  name?:any;
  style?: any;
  label?: any;
  select?: any;
  margin?: any;
  value?: any;
  onBlur?: any;
  onChange?: any;
  required?: any;
  fullWidth?: any;
  disabled?: any;
  error?: any;
  InputProps?: any;
  helperText?: any;
}
const InputField: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <SelectField data-cy="text-field" {...rest}>
      {children}
    </SelectField>
  );
};
InputField.defaultProps = {
  children: ""
} as Partial<Props>;

export { InputField };
