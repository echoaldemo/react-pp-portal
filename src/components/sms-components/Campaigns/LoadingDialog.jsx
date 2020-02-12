import React from "react";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import CircularProgress from "@material-ui/core/CircularProgress";

import { Dialog, DialogContent, useMediaQuery } from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import styles from "./Styles/LoadingDialog.styles";

const useStyles = makeStyles(styles);

export default function LoadingDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const [state, setState] = React.useState({
    open: true,
    done: false
  });

  function handleClose() {
    setState({ ...state, open: false });
    setState({ ...state, done: true });
  }

  return (
    <Dialog
      open={state.open}
      onClick={handleClose}
      disableEscapeKeyDown={false}
      disableBackdropClick={false}
      // width={420}
      className={classes.dialog}
      fullScreen={fullScreen}
    >
      <div style={{ width: "100%" }}>
        {/* <DialogTitle className={classes.dialogTitle}  id="simple-dialog-title">
                <p className={classes.dialogText}> {props.header} </p>
            </DialogTitle> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: 500,
            color: "#7c8a97"
          }}
        >
          <span style={{ width: "272px", marginTop: 40 }}>
            One moment. We're adding the new campaign...
          </span>
        </div>
        <DialogContent
          className={classes.content}
          style={{ width: fullScreen ? "" : 345 }}
        >
          <div className={classes.textContent}>
            {/* <Loader type="Circles"
                height={100} width={100}
                color="#00BFFF" /> */}
            <CircularProgress
              style={{ color: "#1194f6", width: 45, height: 45 }}
            />
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}
