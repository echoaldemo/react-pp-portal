import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import MicIcon from "@material-ui/icons/Mic";
import StopIcon from "@material-ui/icons/Stop";
import MicOffIcon from "@material-ui/icons/MicOff";
import NextIcon from "@material-ui/icons/SkipNext";
import PrevIcon from "@material-ui/icons/SkipPrevious";
import IconButton from "@material-ui/core/IconButton";
import LoadingAddAudio from "../audio-loading";
import Toast from "../toast";
import { ReactMic } from "@cleandersonlobo/react-mic";
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
    color: "#2b9ff7",
    margin: theme.spacing(0, 1)
  },
  recordBtn: {
    width: "100px",
    height: "100px",
    fontFamily: "Material Icons",
    fontSize: "48px",
    color: "#e74c3c",
    background: "none",
    border: "2px solid #e74c3c",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "0.15s linear",
    "&:hover": {
      transition: "0.15s linear",
      transform: "scale(1.05)",
      backgroundColor: "white"
    }
  },
  recordBtnDisabled: {
    border: "2px solid #ccc",
    "&:hover": {
      transition: "0.15s linear",
      transform: "none",
      color: "#ccc"
    }
  },
  micOff: {
    color: "#ccc"
  },
  micStyle: {
    fontSize: 48
  },
  micWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  scriptWrapper: {
    backgroundColor: "#f1fbff",
    marginTop: 2,
    marginBottom: 2,
    padding: 12
  },
  soundWave: {
    width: 620,
    "@media (max-width: 425px)": {
      width: 280,
      marginTop: 15,
      marginBottom: 20
    }
  },
  dialog: {
    textAlign: "justify"
  }
});

class RecordAudio extends Component {
  constructor() {
    super();
    this.state = {
      active: true,
      record: false,
      recorded: false,
      audio: [],
      openToast: false,
      openAddAudio: false,
      vertical: "top",
      horizontal: "right",
      session: []
    };
  }

  toggleMenu = () => {
    navigator.mediaDevices.ondevicechange = function(event) {
      navigator.mediaDevices.enumerateDevices().then(function(devices) {
        devices.forEach(function(device) {
          // check if this is the device that was disconnected
        });
      });
    };
    const { active } = this.state;
    this.setState({
      active: !active
    });
    if (active === true) {
      this.startRecording();
    } else {
      this.stopRecording();
    }
  };

  startRecording = () => {
    this.setState({
      record: true,
      recorded: false
    });
  };

  stopRecording = () => {
    this.setState({
      record: false,
      recorded: true
    });
  };

  onStop = recordedBlob => {
    this.setState({ audio: recordedBlob });
    if (this.props.handleRecordedAudio !== undefined) {
      this.props.handleRecordedAudio(recordedBlob);
    }
    var form = new FormData();
    var file = new File([recordedBlob.blob], `${this.props.audioName}`, {
      type: "audio/wav"
    });
    form.append("file", file);
    this.props.audioUpload(form);
  };

  render() {
    const { classes } = this.props;

    return (
      <div id="record-audio">
        <div className={classes.micWrapper}>
          <div className={classes.scriptWrapper}>
            <Typography variant="subtitle1" className={classes.dialog}>
              {this.props.dialog}
            </Typography>
          </div>
          <ReactMic
            record={this.state.record}
            className={classes.soundWave}
            onStop={this.onStop}
            strokeColor="#000000"
          />
          {this.props.hasMic ? (
            <React.Fragment>
              <Button
                className={classes.recordBtn}
                active={this.state.active}
                onClick={() => {
                  this.toggleMenu();
                }}
              >
                {!this.state.record ? (
                  <MicIcon className={classes.micStyle} />
                ) : (
                  <StopIcon className={classes.micStyle} />
                )}
              </Button>
              <br />
              <Typography
                variant="subtitle1"
                style={{ fontSize: "16px", color: "#615f5f" }}
                gutterBottom
              >
                Click to start recording
              </Typography>
              <br />
              {this.state.recorded && this.props.recordedAudio !== undefined ? (
                this.props.recordedAudio.length !== 0 ? (
                  <React.Fragment>
                    <audio controls>
                      <source src={this.props.recordedAudio.blobURL} />
                    </audio>

                    <Typography variant="subtitle1" gutterBottom>
                      Audio Preview
                    </Typography>
                  </React.Fragment>
                ) : null
              ) : this.state.recorded && this.state.audio.length !== 0 ? (
                <React.Fragment>
                  <audio controls>
                    <source src={this.state.audio.blobURL} />
                  </audio>

                  <Typography variant="subtitle1" gutterBottom>
                    Audio Preview
                  </Typography>
                </React.Fragment>
              ) : null}

              <span>
                <IconButton
                  variant="contained"
                  disabled={this.state.record || this.props.backButtonState}
                  onClick={() => {
                    if (this.props.typeOfAudio === "phrase") {
                      if (this.props.page > 0) {
                        this.props.handleBackButton(this.props.index - 1);

                        this.props.prevIndex();
                        this.props.setNewAudioDetails(
                          this.props.audio[
                            this.props.index +
                              this.props.rowsPerPage * this.props.page -
                              1
                          ].uuid,
                          this.props.audio[
                            this.props.index +
                              this.props.rowsPerPage * this.props.page -
                              1
                          ].name,
                          this.props.audio[
                            this.props.index -
                              this.props.rowsPerPage * this.props.page -
                              1
                          ].phrase
                        );
                      } else {
                        this.props.handleBackButton(this.props.index - 1);
                        this.props.prevIndex();

                        this.props.setNewAudioDetails(
                          this.props.audio[this.props.index - 1].uuid,
                          this.props.audio[this.props.index - 1].name,
                          this.props.audio[this.props.index - 1].phrase
                        );
                      }
                    } else {
                      if (this.props.page > 0) {
                        this.props.handleBackButton(this.props.index - 1);

                        this.props.prevIndex();
                        this.props.setNewAudioDetails(
                          this.props.audio[
                            this.props.index +
                              this.props.rowsPerPage * this.props.page -
                              1
                          ].key,
                          this.props.audio[
                            this.props.index +
                              this.props.rowsPerPage * this.props.page -
                              1
                          ].name,
                          this.props.audio[
                            this.props.index -
                              this.props.rowsPerPage * this.props.page -
                              1
                          ].text
                        );
                      } else {
                        this.props.handleBackButton(this.props.index - 1);
                        this.props.prevIndex();
                        this.props.setNewAudioDetails(
                          this.props.audio[this.props.index - 1].key,
                          this.props.audio[this.props.index - 1].name,
                          this.props.audio[this.props.index - 1].text
                        );
                      }
                    }
                  }}
                >
                  <PrevIcon />
                  <Typography style={{ fontSize: "16px" }}>Prev</Typography>
                </IconButton>
                <IconButton
                  variant="contained"
                  disabled={
                    this.state.record ||
                    this.props.index === this.props.audio.length - 1
                  }
                  onClick={() => {
                    if (this.props.typeOfAudio === "phrase") {
                      if (this.props.page === undefined) {
                        this.props.nextIndex(this.props.index);

                        this.props.handleBackButton(this.props.index + 1);
                        this.props.setNewAudioDetails(
                          this.props.audio[this.props.index + 1].uuid,
                          this.props.audio[this.props.index + 1].name,
                          this.props.audio[this.props.index + 1].phrase
                        );
                      }
                      if (this.props.page > 0) {
                        this.props.nextIndex();
                        this.props.handleBackButton(this.props.index + 1);
                        this.props.setNewAudioDetails(
                          this.props.audio[
                            this.props.index +
                              this.props.rowsPerPage * this.props.page +
                              1
                          ].uuid,
                          this.props.audio[
                            this.props.index +
                              this.props.rowsPerPage * this.props.page +
                              1
                          ].name,
                          this.props.audio[
                            this.props.index +
                              this.props.rowsPerPage * this.props.page +
                              1
                          ].phrase
                        );
                      } else {
                        this.props.nextIndex();
                        this.props.handleBackButton(this.props.index + 1);

                        this.props.setNewAudioDetails(
                          this.props.audio[this.props.index + 1].uuid,
                          this.props.audio[this.props.index + 1].name,
                          this.props.audio[this.props.index + 1].phrase
                        );
                      }
                    } else {
                      if (this.props.page === undefined) {
                        this.props.nextIndex(this.props.index);

                        this.props.handleBackButton(this.props.index + 1);
                        this.props.setNewAudioDetails(
                          this.props.audio[this.props.index + 1].key,
                          this.props.audio[this.props.index + 1].name,
                          this.props.audio[this.props.index + 1].text
                        );
                      }
                      if (this.props.page > 0) {
                        this.props.nextIndex();
                        this.props.handleBackButton(this.props.index + 1);
                        this.props.setNewAudioDetails(
                          this.props.audio[
                            this.props.index +
                              this.props.rowsPerPage * this.props.page +
                              1
                          ].key,
                          this.props.audio[
                            this.props.index +
                              this.props.rowsPerPage * this.props.page +
                              1
                          ].name,
                          this.props.audio[
                            this.props.index +
                              this.props.rowsPerPage * this.props.page +
                              1
                          ].text
                        );
                      } else if (this.props.page === 0) {
                        this.props.nextIndex();
                        this.props.handleBackButton(this.props.index + 1);
                        this.props.setNewAudioDetails(
                          this.props.audio[this.props.index + 1].key,
                          this.props.audio[this.props.index + 1].name,
                          this.props.audio[this.props.index + 1].text
                        );
                      }
                    }
                  }}
                >
                  <Typography style={{ fontSize: "16px" }}>Next</Typography>
                  <NextIcon />
                </IconButton>
              </span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button
                active={this.state.active}
                className={`${classes.recordBtn} ${classes.recordBtnDisabled}`}
                onClick={this.props.detectMic}
              >
                <MicOffIcon
                  className={`${classes.micStyle} ${classes.micOff} `}
                />
              </Button>
              <Typography variant="subtitle1" gutterBottom>
                Error accessing the microphone. Click the icon to check for mic
              </Typography>
            </React.Fragment>
          )}
        </div>
        <br />
        <Dialog open={this.state.openAddAudio}>
          <LoadingAddAudio
            open={this.state.openToast}
            handleClose={this.handleCloseAudio}
          />
        </Dialog>
        <Toast
          open={this.state.openToast}
          handleClose={this.handleCloseToast}
          toastType={this.state.toastType}
          message={this.state.message}
          vertical={this.state.vertical}
          horizontal={this.state.horizontal}
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(RecordAudio);
