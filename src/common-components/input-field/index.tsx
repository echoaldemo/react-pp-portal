import React from "react";
import { SelectField } from "./styles";
interface Props {
  children?: React.ReactNode;
  style?: any;
  label?: any;
  select?: any;
  margin?: any;
  value?: any;
  onBlur?: any;
  onChange?: any;
  required?: any;
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
