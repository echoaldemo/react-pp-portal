import React, { useState } from "react";
import {
  Typography,
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  Input
} from "@material-ui/core";
import { useStyles } from "../styles";

type Props = {
  disabled: any;
  setDisabled: any;
};

const SetupPassword = ({ disabled, setDisabled }: Props) => {
  const classes = useStyles(0);
  const [passwordError, setPasswordError] = useState({
    original: false,
    confirm: false
  });

  function handlePasswords(event: any, type: string) {}

  return (
    <div
      style={{
        minWidth: 360,
        minHeight: 320,
        margin: "0 auto"
      }}
    >
      <Typography className={classes.p}>Setup password</Typography>

      <Grid item xs>
        <FormControl fullWidth error={passwordError.original}>
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
            value={passwordError.original}
            onChange={(e) => handlePasswords(e, "password")}
          />
          <FormHelperText data-cy="password-error">
            {passwordError.original && "Password Msg"}
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs>
        <FormControl fullWidth error={passwordError.confirm}>
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
            value={passwordError.confirm}
            onChange={(e) => handlePasswords(e, "repassword")}
          />
          <FormHelperText data-cy="re-password-error">
            {passwordError.confirm && "Repass Error"}
          </FormHelperText>
        </FormControl>
      </Grid>

      <Typography className={classes.note}>
        *The password must contains at least 10 characters.
      </Typography>
    </div>
  );
};

export { SetupPassword as Setup };
