import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import CloseIcon from "@material-ui/icons/Close";

import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";

import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  closeButton: {
    color: "white",
    position: "absolute",
    right: 15
  },
  flex: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  dialogTitle: {
    backgroundColor: "#5f7d98",
    color: "#ffff",
    height: "70px",
    padding: "0 24px"
  },

  uploadFileBtn: {
    paddingTop: "30px",
    display: "flex",
    justifyContent: "space-between",
    textTransform: "none",
    color: "#777777",
    fontSize: "16px",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  chooseFile: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#1194f6",
    minWidth: "130px",
    fontSize: "16px"
  },
  uploadIcon: {
    margin: theme.spacing(-1, 1)
  },
  checkBox: {
    color: "#777777",
    "& .MuiFormControlLabel-label": {
      fontSize: "16px"
    }
  },
  checkText: {
    marginTop: "-5px",
    paddingRight: "5px"
  },
  checkOption: {
    padding: "15px 0 25px 0"
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#1194f6" },
    error: { 500: "#ff504d" }
  }
});

export default function UploadAudioResource(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const matches = useMediaQuery("(min-width:640px)");

  const [modification, handleModification] = useState(false);
  const [convert, handleConvert] = useState(true);
  const [fadeIn, handleFadeIn] = useState(true);
  const [fadeOut, handleFadeOut] = useState(true);

  const [file, handleFile] = useState(null);

  function changeAudio(e) {
    let files = e.target.files[0];
    var uploadFile = new FormData();
    uploadFile.append("file", files);

    handleFile(uploadFile);
  }

  return (
    <div>
      <Dialog
        id="upload-dialog"
        open={true}
        aria-labelledby="form-dialog-title"
        fullScreen={matches ? false : true}
      >
        <ThemeProvider theme={theme}>
          <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
            <div className={classes.flex}>
              <p>{props.currentResourceInfo.name}</p>
              <IconButton
                id="upload-close-dialog"
                aria-label="close"
                className={classes.closeButton}
                onClick={() => props.handleUploadResourceModal("close")}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>

          <DialogContent
            style={{ height: "400px", width: matches ? "440px" : null }}
          >
            <React.Fragment>
              {/* Upload audio files here */}
              <input
                accept="audio/*"
                style={{ display: "none", padding: "30px 0" }}
                id="raised-button-file"
                type="file"
                name="file"
                onChange={e => changeAudio(e)}
              />
              <label htmlFor="raised-button-file">
                <Button component="span" className={classes.uploadFileBtn}>
                  <span
                    style={{
                      textOverflow: "ellipsis",
                      width: "100%",
                      overflow: "hidden",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {file ? file.get("file").name : "No file chosen"}
                  </span>
                  <div className={classes.chooseFile}>
                    <CloudUploadIcon className={classes.uploadIcon} />
                    Choose File
                  </div>
                </Button>
              </label>
              <Divider />
              <br />
            </React.Fragment>

            <Grid item container xs justify="center">
              <Grid item xs={12} md={6} className={classes.checkOption}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={modification}
                      onChange={() => handleModification(!modification)}
                      color="primary"
                    />
                  }
                  label="No Modifications"
                  className={classes.checkBox}
                />
                <FormHelperText className={classes.checkText}>
                  Disable modifications to the audio file upon uploading.
                </FormHelperText>
              </Grid>

              <Grid item xs={12} md={6} className={classes.checkOption}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={convert}
                      onChange={() => handleConvert(!convert)}
                      color="primary"
                    />
                  }
                  label="Convert"
                  className={classes.checkBox}
                />
                <FormHelperText className={classes.checkText}>
                  Enable converting the audio file to a different format.
                </FormHelperText>
              </Grid>

              <Grid item xs={12} md={6} className={classes.checkOption}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={fadeIn}
                      onChange={() => handleFadeIn(!fadeIn)}
                      color="primary"
                    />
                  }
                  label="Fade In"
                  className={classes.checkBox}
                />
                <FormHelperText className={classes.checkText}>
                  Enable fading in the audio when played.
                </FormHelperText>
              </Grid>

              <Grid item xs={12} md={6} className={classes.checkOption}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={fadeOut}
                      onChange={() => handleFadeOut(!fadeOut)}
                      color="primary"
                    />
                  }
                  label="Fade Out"
                  className={classes.checkBox}
                />
                <FormHelperText className={classes.checkText}>
                  Enable fading out the audio when played.
                </FormHelperText>
              </Grid>
            </Grid>

            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "30px"
              }}
            >
              <Button
                onClick={() =>
                  file
                    ? props.uploadResourceAudio(
                        file,
                        modification,
                        convert,
                        fadeIn,
                        fadeOut
                      )
                    : null
                }
                style={{
                  backgroundColor: "#b6d36b",
                  color: "#ffffff",
                  fontWeight: 500,
                  fontSize: "14px",
                  width: "165px",
                  height: "40px"
                }}
              >
                Save Audio File
              </Button>
            </DialogActions>
          </DialogContent>
        </ThemeProvider>
      </Dialog>
    </div>
  );
}
