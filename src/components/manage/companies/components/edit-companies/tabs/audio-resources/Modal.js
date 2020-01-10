import React from "react";
import { Dialog, Paper, Button } from "@material-ui/core";

import { Close } from "@material-ui/icons";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { makeStyles } from "@material-ui/styles";

const theme = createMuiTheme({
  shape: {
    borderRadius: 0
  }
});

const useStyles = makeStyles({
  root: {
    width: "400px",
    height: "fit-content",
    padding: "0 0 2rem 0",
    overflow: "hidden"
  },
  modalHeader: {
    width: "100%",
    background: "#5f7d98",
    height: "50px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold"
  },
  closeIcon: {
    flex: 1,
    fontSize: "18px",
    color: "#fff",
    fontWeight: "bolder",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },

  headerTitle: {
    flex: 3,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  }
});

const Modal = props => {
  let classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <Dialog open={props.open} onClose={() => props.onClose()}>
        <Paper className={classes.root}>
          <div className={classes.modalHeader}>
            <div className={classes.headerTitle}>{props.title}</div>

            <div className={classes.closeIcon}>
              <Button
                disableRipple
                style={{ color: "#fff", backgroundColor: "transparent" }}
                onClick={() => props.close()}
              >
                <Close />
              </Button>
            </div>
          </div>
          {props.children}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              flexDirection: "column"
            }}
          >
            {props.error.status && (
              <>
                <Button
                  disableRipple
                  disableFocusRipple
                  style={{ margin: "1rem", backgroundColor: "transparent" }}
                  onClick={() => props.resetError()}
                >
                  DISMISS
                </Button>
                <Paper
                  style={{
                    width: "inherit",
                    backgroundColor: "red",
                    fontWeight: "bolder",
                    fontSize: "18px",
                    width: "80%",
                    height: "fit-content",
                    padding: "0.5rem",
                    margin: "1rem",
                    color: "#fff"
                  }}
                >
                  {props.error.message}
                </Paper>
              </>
            )}
          </div>
        </Paper>
      </Dialog>
    </MuiThemeProvider>
  );
};

export default Modal;
