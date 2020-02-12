import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import styles from "./Styles/DoneDialog.styles";
import ErrorIcon from "@material-ui/icons/Error";
const useStyles = makeStyles(styles);

export default function DoneDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClick={props.handleClose}
        disableEscapeKeyDown={false}
        disableBackdropClick={false}
        width={420}
        className={classes.dialog}
        fullScreen={fullScreen}
        id="doneDialog"
      >
        <DialogTitle
          className={classes.dialogTitle}
          style={{ backgroundColor: props.error ? "#ff504d" : "#5f7d98" }}
        >
          {" "}
          <div className={classes.flex}>
            <span
              className={classes.span}
              style={{
                padding: 10,
                width: 280,
                textAlign: "center",
                marginLeft: 30
              }}
            >
              {props.message}
            </span>
            <span className={classes.span}>
              <Close
                onClick={props.handleClose}
                className={classes.dialogCloseIcon}
                style={{ color: "white" }}
                id="doneDialogBtn"
              />
            </span>
          </div>
        </DialogTitle>
        <DialogContent align="center">
          <div className={classes.textContent}>
            <span>
              <ErrorIcon style={{ color: "#ff504d" }} />
            </span>
            <h3 className={classes.error}>{props.pop}</h3>
          </div>
          <div className={classes.buttonDiv}>
            {/* <Button autoFocus onClick={props.handleClose}>Close</Button> */}
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
