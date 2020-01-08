import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, useStyles, TitleTag } from "../styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { TextField } from "../../components/TextField";
type Props = {
  disabled: any;
  inputValues: any;
  handleInputChange: any;
  handleInputBlur: any;
  handleEmail: any;
  handleDatePick: any;
  setDisabled?: any;
};

type Indexable = { [key: string]: any };

function Step1({
  disabled,
  setDisabled,
  inputValues,
  handleInputChange,
  handleInputBlur,
  handleEmail,
  handleDatePick
}: Props) {
  const classes = useStyles(1);
  const [error, setError] = useState({
    first_name_error: "",
    last_name_error: "",
    username_error: "",
    email_error: ""
  });

  let classProp = {
    classes: {
      underline: classes.underline
    }
  };

  const hasContent = (str: any) => {
    return str.match(/(?=.{1,}$)/);
  };

  const handleInput = (type: any) => (label: any) => (value: any) => {
    if (!hasContent(value.target.value) && type !== "email") {
      if (hasContent((inputValues as Indexable)[type])) {
        setError(
          Object.assign(error, {
            [`${type}_error`]: `${label} is required.`
          })
        );
      }
    } else if (type === "email" && hasContent(value.target.value)) {
      if (
        value.target.value.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        setError(Object.assign(error, { email_error: "" }));
      } else {
        setError(Object.assign(error, { email_error: "Invalid email" }));
      }
    } else {
      setError(
        Object.assign(error, {
          [`${type}_error`]: ""
        })
      );
    }
    handleInputBlur(type)(value);
    handleInputChange(type)(value);
  };

  return (
    <Grid container spacing={1} style={{ overflow: "hidden" }}>
      <TitleTag>Personal info</TitleTag>
      <div style={{ marginTop: "3px" }} />
      <Grid item xs>
        <TextField
          error={error.first_name_error}
          htmlFor="first_name"
          label="Firstname"
          name="First Name"
          autoComplete
          value={inputValues.first_name}
          onBlur={handleInput("first_name")("Firstname")}
          onChange={handleInput("first_name")("Firstname")}
          required={true}
        />
      </Grid>

      <Grid item xs>
        <TextField
          error={error.last_name_error}
          htmlFor="last_name"
          label="Lastname"
          name="Last Name"
          autoComplete
          value={inputValues.last_name}
          onBlur={handleInput("last_name")("Lastname")}
          onChange={handleInput("last_name")("Lastname")}
          required={true}
        />
      </Grid>

      <Grid item xs={12} style={{ marginTop: -8 }}>
        <TextField
          error={error.username_error}
          htmlFor="username"
          label="Username"
          name="Username"
          autoComplete
          value={inputValues.username}
          onBlur={handleInput("username")("Username")}
          onChange={handleInput("username")("Username")}
          required={true}
        />
      </Grid>

      <Grid item xs={12} style={{ marginTop: -8 }}>
        <TextField
          error={error.email_error}
          htmlFor="email"
          label="Email"
          name="Email"
          autoComplete
          value={inputValues.email}
          onBlur={handleInput("email")("Email")}
          onChange={handleInput("email")("Email")}
          required={true}
        />
      </Grid>

      <Grid item xs={12} style={{ marginTop: -7 }}>
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
