import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText
} from "@material-ui/core";
import { useStyles } from "../../users-new/styles";

type InputProps = {
  error: any;
  htmlFor: string;
  name: string;
  label: string;
  required?: boolean;
  value: any;
  onBlur: any;
  onChange: any;
};

const TextField = ({
  error,
  htmlFor,
  name,
  label,
  required,
  value,
  onBlur,
  onChange
}: InputProps) => {
  const classes = useStyles(0);

  const hasContent = (str: any) => {
    return str.match(/(?=.{1,}$)/);
  };

  return (
    <FormControl fullWidth error={hasContent(error)}>
      <InputLabel
        classes={{ focused: classes.focused, error: classes.err }}
        htmlFor={htmlFor}
        required={required}
      >
        {name}
      </InputLabel>
      <Input
        data-cy={htmlFor}
        classes={{ underline: classes.underline }}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      <FormHelperText data-cy={`${label}-error`}>
        {hasContent(error) && error}
      </FormHelperText>
    </FormControl>
  );
};

export { TextField };
