import React from "react";
import { DialogContent, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: "29px",
    color: "white",
    margin: 0
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr",
    justifyItems: "center",
    marginTop: "30px"
  },
  content: {
    padding: "8px 30px 30px 30px",
    fontSize: "24px",
    letterSpacing: "1px",
    textAlign: "justify"
  },
  progress: {
    justifyContent: "center",
    display: " flex",
    height: "100px"
  }
}));

export default function Confirmation(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <DialogContent>
        <div className={classes.container}>
          <Typography
            variant="h4"
            className={classes.content}
            style={{ display: props.loading }}
          >
            Please Wait....
          </Typography>
        </div>
        <div className={classes.progress}>
          <CircularProgress size={80} style={{ color: "#a6c556" }} />
        </div>
      </DialogContent>
    </React.Fragment>
  );
}
