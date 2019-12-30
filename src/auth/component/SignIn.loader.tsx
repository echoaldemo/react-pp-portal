import React from "react";
import { CircularProgress, Typography } from "@material-ui/core/";
import { useStyles } from "./styled/styledComponents";

export default function SignInLoader() {
  const classes: any = useStyles();
  return (
    <div className={classes.loader} data-cy="sign-in-loader">
      <Typography
        style={{
          color: "rgba(0,0,0,0.6)"
        }}
        variant="h6"
      >
        Logging in...
      </Typography>
      <CircularProgress
        thickness={5}
        variant={"indeterminate"}
        style={{
          marginTop: "30px",
          height: "45px",
          width: "45px",
          color: "#5f7d98"
        }}
      />
    </div>
  );
}
