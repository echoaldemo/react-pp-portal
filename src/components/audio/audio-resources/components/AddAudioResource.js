import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@material-ui/core";
import {
  makeStyles,
  createMuiTheme,
  withStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    backgroundColor: "#5f7d98",
    color: "#ffff"
  },
  textFieldSize: {
    width: "420px",
    "@media (max-width: 425px)": {
      width: "200px"
    },
    "@media (max-width: 320px)": {
      width: "170px"
    }
  },
  customTitle: {
    display: "flex",
    justifyContent: "center",
    "@media (max-width: 425px)": {
      fontSize: "12pt"
    },
    "@media (max-width: 320px)": {
      fontSize: "10.5pt"
    }
  },
  saveBtn: {
    width: "50%",
    backgroundColor: "#b6d36b",
    padding: "10px",
    fontWeight: "700",
    margin: "auto",
    color: "white",
    "&:hover": {
      backgroundColor: "#b6d36b"
    },
    "@media (max-width: 425px)": {
      width: "80%"
    },
    "@media (max-width: 320px)": {
      fontSize: "8pt"
    }
  },
  resize: {
    fontSize: "30px"
  }
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#1194f6"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1194f6"
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "#1194f6"
    }
  }
})(TextField);

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#1194f6" },
    error: { 500: "#ff504d" }
  }
});

export default function AddAudioResource(props) {
  const classes = useStyles();
  const [audioName, setAudioName] = useState("");

  return (
    <div>
      <Dialog
        data-cy="add-ar-modal"
        open={props.addResourceModal}
        onClose={() => {
          props.handleAddResourceModal("close");
          props.handleClose();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        <ThemeProvider theme={theme}>
          <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
            <div className={classes.customTitle}>
              <span>New audio resource</span>
              <span
                style={{
                  position: "absolute",
                  right: "20px",
                  cursor: "pointer"
                }}
              >
                <CloseIcon
                  onClick={() => {
                    props.handleAddResourceModal("close");
                    props.handleClose();
                  }}
                  className={classes.closeIcon}
                />
              </span>
            </div>
          </DialogTitle>
          <DialogContent style={{ paddingTop: "40px" }}>
            <CssTextField
              onChange={e => setAudioName(e.target.value)}
              className={classes.textFieldSize}
              label="Audio name*"
              id="textfield-ar"
              InputLabelProps={{
                classes: {
                  input: classes.resize
                }
              }}
              defaultValue={
                props.currentResourceInfo ? props.currentResourceInfo.name : ""
              }
            />
          </DialogContent>
          <DialogActions style={{ padding: "30px" }}>
            <Button
              data-cy="save-ar-btn"
              onClick={() => props.saveAudioName(audioName)}
              className={classes.saveBtn}
              style={{
                backgroundColor: audioName.length === 0 ? "#eeeeee" : "#b6d36b"
              }}
              disabled={audioName.length === 0 ? true : false}
            >
              Save Audio
            </Button>
          </DialogActions>
        </ThemeProvider>
      </Dialog>
    </div>
  );
}
