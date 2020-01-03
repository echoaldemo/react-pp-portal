import React from "react";
import { Grid } from "@material-ui/core";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, useStyles, TitleTag } from "../styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

type Props = {
  disabled: any;
  inputValues: any;
  handleInputChange: any;
  handleInputBlur: any;
  inputErrors: any;
  handleEmail: any;
  handleDatePick: any;
  setDisabled?: any;
};

function Step1({
  disabled,
  setDisabled,
  inputValues,
  handleInputChange,
  handleInputBlur,
  inputErrors,
  handleEmail,
  handleDatePick
}: Props) {
  const classes = useStyles(1);

  let classProp = {
    classes: {
      underline: classes.underline
    }
  };

  return (
    <Grid container spacing={1} style={{ overflow: "hidden" }}>
      <TitleTag>Personal Info</TitleTag>
      <Grid item xs>
        <FormControl fullWidth error={inputErrors.first_name_error}>
          <InputLabel
            classes={{ focused: classes.focused, error: classes.err }}
            htmlFor="first_name"
            required
          >
            First name
          </InputLabel>
          <Input
            data-cy="first_name"
            classes={{ underline: classes.underline }}
            autoComplete="off"
            required
            value={inputValues.first_name}
            onBlur={handleInputBlur("first_name")}
            onChange={handleInputChange("first_name")}
          />
          <FormHelperText data-cy="first_name_error">
            {inputErrors.first_name_error && "Firstname is required"}
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs>
        <FormControl fullWidth error={inputErrors.last_name_error}>
          <InputLabel
            classes={{ focused: classes.focused, error: classes.err }}
            htmlFor="first_name"
            required
            error={inputErrors.last_name}
          >
            Last name
          </InputLabel>
          <Input
            data-cy="last_name"
            classes={{ underline: classes.underline }}
            autoComplete="off"
            required
            value={inputValues.last_name}
            onChange={handleInputChange("last_name")}
          />
          <FormHelperText data-cy="last_name_error">
            {inputErrors.last_name_error && "Lastname is required"}
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth error={inputErrors.username_error}>
          <InputLabel
            classes={{ focused: classes.focused, error: classes.err }}
            htmlFor="fname"
            required
          >
            Username
          </InputLabel>
          <Input
            data-cy="username"
            classes={{ underline: classes.underline }}
            autoComplete="off"
            required
            value={inputValues.username}
            onChange={handleInputChange("username")}
          />
          <FormHelperText data-cy="username-error">
            {inputErrors.username_error && "Username is required"}
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth error={inputErrors.email_error}>
          <InputLabel
            classes={{ focused: classes.focused, error: classes.err }}
            htmlFor="fname"
          >
            Email
          </InputLabel>
          <Input
            data-cy="email"
            classes={{ underline: classes.underline }}
            autoComplete="off"
            value={inputValues.email}
            onChange={handleEmail}
          />
          <FormHelperText data-cy="re-email">
            {inputErrors.email_error && "Invalid email"}
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} {...classProp}>
          <DatePicker
            fullWidth
            label="Hired Date"
            format="MM/dd/yyyy"
            value={inputValues.date}
            onChange={handleDatePick}
            InputProps={{
              classes: {
                underline: classes.inputField,
                root: classes.inputField
              }
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </Grid>
  );
}

export { Step1 };
