import React, { Component } from "react";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import {
  createMuiTheme,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Typography,
  IconButton,
  FormControlLabel,
  FormHelperText,
  Switch,
  Checkbox,
  Divider,
  Grid
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import Toast from "../toast";
import Recorder from "../record-audio";
import Loader from "../loader";

const useStyles = theme => ({
  dialogTitle: {
    width: "100%",
    backgroundColor: "#5f7d98",
    color: "#fff"
  },
  closeButton: {
    color: "#fff"
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  saveBtn: {
    width: "100%",
    backgroundColor: "#a6c556",
    "&:hover": {
      backgroundColor: "#a6c556"
    }
  },
  mainContent: {
    color: "#4b4f57"
  },
  uploadFileBtn: {
    display: "flex",
    justifyContent: "space-between",
    textTransform: "none",
    color: "#566b81",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  uploadIcon: {
    color: "#a6c556",
    margin: theme.spacing(0, 1)
  },
  container: {
    color: "slategray",
    width: "100%",
    height: "20vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  circularProgress: {
    color: "#a6c556",
    textAlign: "center"
  },
  nameText: {
    color: "#777777",
    textAlign: "center",
    justify: "center",
    margin: "10px",
    fontSize: "20px"
  },
  phraseText: {
    color: "#777777",
    textAlign: "center",
    alignItems: "center",
    justify: "center",
    margin: "15px",
    fontSize: "16px",
    lineSpacing: "0.2px"
  },
  uploadText: {
    textAlign: "center",
    marginBottom: "-20px",
    fontSize: "12px"
  }
});

// MuiThemeProvider
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#bfd87e"
    }
  }
});

class AddNewVoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openToast: false,
      modification: false,
      fadein: true,
      fadeout: true,
      convert: true,
      recordAudio: false,
      anchorEl: null,
      activeStep: 0,
      switchVal: false,
      audioFile: null,
      session: []
    };
  }

  handleCloseToast = () => {
    this.setState({
      openToast: false
    });
  };

  handleCloseAudio() {
    this.setState({
      openAddAudio: false
    });
  }

  handleCheckbox = type => {
    if (type === "modification") {
      this.setState(prevState => ({
        modification: !prevState.modification
      }));
    } else if (type === "fadeout") {
      this.setState(prevState => ({
        fadeout: !prevState.fadeout
      }));
    } else if (type === "fadein") {
      this.setState(prevState => ({
        fadein: !prevState.fadein
      }));
    } else {
      this.setState(prevState => ({
        convert: !prevState.convert
      }));
    }
  };

  recordAudioDialog = () => {
    this.setState({
      recordAudio: true,
      anchorEl: null
    });
  };

  recordAudioClose = () => {
    this.setState({
      recordAudio: false
    });
  };

  handleNext = () => {
    this.setState(prevActiveStep => ({
      activeStep: prevActiveStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevActiveStep => ({
      activeStep: prevActiveStep - 1
    }));
  };

  handleSwitch = () => {
    this.setState(prevState => ({
      switchVal: !prevState.switchVal
    }));
  };

  handleAudioFile = file => {
    this.setState({ audioFile: file });
  };
  handleSessionUpload = (blob, name, key) => {
    let temp = {
      audioKey: this.audioKey,
      file: this.file
    };
    let tempArray = [];
    var form = new FormData();
    var file = new File([blob], `${name}`, {
      type: "audio/wav"
    });

    form.append("file", file);
    temp.audioKey = key;
    temp.file = form;
    tempArray.push(temp);
    setTimeout(() => {
      if (this.state.session.length !== 0) {
        this.setState(prevState => ({
          session: [...prevState.session, ...tempArray]
        }));
      } else {
        this.setState({
          session: [temp]
        });
      }
    }, 200);
  };
  sessionUpload = arr => {
    arr.map(data => {
      this.props.upload(
        this.props.voice,
        this.props.version,
        "",
        data.audioKey,
        data.file,
        this.state.modification,
        this.state.fadein,
        this.state.fadeout,
        this.state.convert
      );
      return null;
    });
  };
  render() {
    const {
      classes,
      addNewVoiceModal,
      openAddNewVoiceModal,
      handleAudio,
      fileName
    } = this.props;
    return (
      <Dialog
        //disableBackdropClick
        //disableEscapeKeyDown
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="confirmation-dialog-title"
        open={addNewVoiceModal}
        //open={true}
        fullScreen={window.innerWidth < "425" ? true : false}
      >
        {this.props.uploadLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <DialogTitle className={classes.dialogTitle}>
              <div className={classes.flex}>
                <Typography variant="h6">Add New Voice</Typography>
                <IconButton
                  aria-label="close"
                  className={classes.closeButton}
                  onClick={() => openAddNewVoiceModal(false)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </DialogTitle>

            <DialogContent dividers>
              <div className={classes.mainContent}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.switchVal}
                      onChange={() => this.handleSwitch()}
                      color="primary"
                    />
                  }
                  label={this.state.switchVal ? "Upload Audio" : "Record Audio"}
                />

                <Grid container alignItems="center" spacing={1}>
                  <Grid item container xs={12} justify="center">
                    {this.state.switchVal ? (
                      <Grid item xs={12}>
                        <center>
                          <Typography className={classes.nameText}>
                            <b>Audio Dialog: {this.props.audioName}</b>
                          </Typography>
                          <Typography className={classes.phraseText}>
                            {this.props.dialog}
                          </Typography>
                          <div
                            style={{
                              height: "300px",
                              width: "50%",
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                              justifyContent: "center"
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              style={{ textAlign: "center" }}
                              gutterBottom
                            >
                              {fileName
                                ? fileName
                                : "Select audio file to upload..."}
                            </Typography>
                            <br />

                            <input
                              accept="audio/*"
                              className={classes.input}
                              style={{ display: "none" }}
                              id="raised-button-file"
                              multiple
                              type="file"
                              name="file"
                              onChange={handleAudio}
                            />
                            <label htmlFor="raised-button-file">
                              <Button
                                component="span"
                                className={classes.uploadFileBtn}
                              >
                                {fileName ? "Change file" : "No file selected"}
                                <div className={classes.flex}>
                                  &nbsp;&nbsp;
                                  <CloudUploadIcon
                                    className={classes.uploadIcon}
                                  />
                                  Choose File
                                </div>
                              </Button>
                            </label>

                            <Divider />
                          </div>
                        </center>
                        <br />
                      </Grid>
                    ) : (
                      <Grid item xs={12}>
                        <Typography className={classes.nameText}>
                          <b>Audio Dialog: {this.props.audioName}</b>
                        </Typography>
                        <Recorder
                          audioName={this.props.audioName}
                          dialog={this.props.dialog}
                          audioUpload={this.handleAudioFile}
                          index={this.props.index}
                          audio={this.props.campaigns}
                          page={this.props.page}
                          rowsPerPage={this.props.rowsPerPage}
                          nextIndex={this.props.nextIndex}
                          prevIndex={this.props.prevIndex}
                          setNewAudioDetails={this.props.setNewAudioDetails}
                          backButtonState={this.props.backButtonState}
                          handleBackButton={this.props.handleBackButton}
                          hasMic={this.props.hasMic}
                          detectMic={this.props.detectMic}
                          audioKey={this.props.audioKey}
                          session={this.state.session}
                          handleSessionAdd={this.handleSessionUpload}
                          sessionUpload={this.sessionUpload}
                          upload={this.props.upload}
                          phrase={this.props.phrase}
                          typeOfAudio={this.props.typeOfAudio}
                        />
                      </Grid>
                    )}
                  </Grid>

                  <Grid container spacing={2}>
                    <MuiThemeProvider theme={theme}>
                      <Grid item container justify="center">
                        <Grid item xs={12} md={6}>
                          <FormControlLabel
                            className={classes.checkbox}
                            label="No Modification"
                            control={
                              <Checkbox
                                color="primary"
                                checked={this.state.modification}
                              />
                            }
                            checked={this.state.modification}
                            onChange={() => this.handleCheckbox("modification")}
                          />
                          <FormHelperText className={classes.checkText}>
                            Disable any modifications to the audio file upon
                            upload
                          </FormHelperText>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControlLabel
                            className={classes.checkbox}
                            label="Convert"
                            control={
                              <Checkbox
                                color="primary"
                                checked={this.state.convert}
                              />
                            }
                            onChange={() => this.handleCheckbox("convert")}
                          />
                          <FormHelperText className={classes.checkText}>
                            Enable converting the audio file to a different
                            format
                          </FormHelperText>
                        </Grid>
                      </Grid>

                      <Grid item container xs justify="center">
                        <Grid item xs={12} md={6}>
                          <FormControlLabel
                            className={classes.checkbox}
                            label="Fade In"
                            control={
                              <Checkbox
                                color="primary"
                                checked={this.state.fadein}
                              />
                            }
                            onChange={() => this.handleCheckbox("fadein")}
                          />
                          <FormHelperText className={classes.checkText}>
                            Enable fading in the recordings audio
                          </FormHelperText>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControlLabel
                            className={classes.checkbox}
                            label="Fade Out"
                            control={
                              <Checkbox
                                color="primary"
                                checked={this.state.fadeout}
                              />
                            }
                            onChange={() => this.handleCheckbox("fadeout")}
                          />
                          <FormHelperText className={classes.checkText}>
                            Enable fading out the recordings audio
                          </FormHelperText>
                        </Grid>
                      </Grid>
                    </MuiThemeProvider>
                  </Grid>
                </Grid>
              </div>

              <Toast
                open={this.state.openToast}
                handleClose={this.handleCloseToast}
                toastType={this.state.toastType}
                message={this.state.message}
                vertical={this.state.vertical}
                horizontal={this.state.horizontal}
              />
            </DialogContent>

            <DialogActions>
              <Button
                color="primary"
                variant="contained"
                className={classes.saveBtn}
                //onClick={this.save}
                // onClick={this.openAddVoice}
                onClick={() => {
                  if (this.state.switchVal) {
                    this.props.upload(
                      this.props.voice,
                      this.props.version,
                      this.props.slug,
                      this.props.audioKey,
                      this.props.file,
                      this.state.modification,
                      this.state.fadein,
                      this.state.fadeout,
                      this.state.convert
                    );
                  } else {
                    this.props.upload(
                      this.props.voice,
                      this.props.version,
                      this.props.slug,
                      this.props.audioKey,
                      this.state.audioFile,
                      this.state.modification,
                      this.state.fadein,
                      this.state.fadeout,
                      this.state.convert
                    );
                  }
                }}
              >
                {this.props.uploadLoading ? "Saving..." : "Save Audio File"}
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    );
  }
}

export default withStyles(useStyles)(AddNewVoice);
