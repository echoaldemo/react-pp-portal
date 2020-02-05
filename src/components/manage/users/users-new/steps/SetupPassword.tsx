import React, { useState } from "react";
import {
  Typography,
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  Input
} from "@material-ui/core";
import { useStyles, TitleTag } from "../styles";

type Props = {
  handlePassword: any;
  password: any;
  custom?: any;
};

const SetupPassword = ({ password, handlePassword, custom }: Props) => {
  const classes = useStyles(0);
  const [passwordError, setPasswordError] = useState({
    original: "",
    confirm: "",
    guideline: false
  });

  const checkGuideline = (pass: any) => {
    return pass.match(/(?=.{10,}$)/);
  };

  const hasContent = (str: any) => {
    return str.match(/(?=.{1,}$)/);
  };

  const matchPassword = (value: any) => {
    if (hasContent(password.original) && hasContent(value)) {
      if (password.original !== value) {
        setPasswordError(
          Object.assign(passwordError, {
            confirm: "Password not match."
          })
        );
      } else {
        setPasswordError(Object.assign(passwordError, { confirm: "" }));
      }
    }
  };

  const processPassword = (type: any) => ({ target: { value } }: any) => {
    if (type === "original") {
      handlePassword(type, value);
      // handlePassword("confirm", "");
    } else {
      matchPassword(value);
      if (checkGuideline(password.original)) {
        handlePassword(type, value);
      }
    }
  };

  let dynamicStyle = !checkGuideline(password.original) ? { color: "red" } : {};

  return (
    <div
      style={{
        minWidth: 360,
        minHeight: "auto",
        margin: "0 auto"
      }}
    >
      {!custom && <TitleTag>Setup password</TitleTag>}
      <div style={{ marginTop: "14px" }} />
      <Grid item xs>
        <FormControl fullWidth error={passwordError.original.length > 0}>
          <InputLabel
            classes={{ focused: classes.focused, error: classes.err }}
            htmlFor="fname"
            required
          >
            Enter password
          </InputLabel>
          <Input
            data-cy="password"
            type="password"
            classes={{ underline: classes.underline }}
            autoComplete="new-password"
            required
            value={password.original}
            onChange={processPassword("original")}
          />
          <FormHelperText data-cy="password-error">
            {passwordError.original}
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs style={{ marginTop: -5 }}>
        <FormControl
          fullWidth
          error={
            passwordError.confirm.length > 0 && password.confirm.length > 0
          }
        >
          <InputLabel
            classes={{ focused: classes.focused, error: classes.err }}
            htmlFor="fname"
            required
          >
            Re-enter password
          </InputLabel>
          <Input
            data-cy="re-password"
            type="password"
            classes={{ underline: classes.underline }}
            autoComplete="new-password"
            value={password.confirm}
            onChange={processPassword("confirm")}
          />
          <FormHelperText data-cy="re-password-error">
            {hasContent(password.confirm) && passwordError.confirm}
          </FormHelperText>
        </FormControl>
      </Grid>

      <Typography style={dynamicStyle} className={classes.note}>
        *The password must contains at least 10 characters.
      </Typography>
    </div>
  );
};

export { SetupPassword as Setup };
