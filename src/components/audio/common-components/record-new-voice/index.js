import React, { Component } from "react";
import { ReactMic } from "@cleandersonlobo/react-mic";
import $ from "jquery";

import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import UploadIcon from "@material-ui/icons/CloudUpload";
import NextIcon from "@material-ui/icons/SkipNext";
import PreviousIcon from "@material-ui/icons/SkipPrevious";
import StopIcon from "@material-ui/icons/Stop";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import RecordIcon from "@material-ui/icons/FiberManualRecord";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip";

import ConfirmationDialog from "./ConfirmationDialog";
import styles from "./styles";

const DialogTitle = withStyles(styles)(props => {
  const {
    openConfirm,
    session,
    test,
    children,
    classes,
    onClose,
    ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={session === 0 ? onClose : openConfirm}
          disabled={test ? true : false}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

class AddNewVoice_Desktop extends Component {
  constructor() {
    super();

    this.currentTimer = 0;
    this.interval = 0;
    this.lastUpdateTime = new Date().getTime();

    this.state = {
      uploadedAudio: null,
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
      session: [],
      recording: false,
      record: false,
      play: false,
      recordedAudio: null,
      confirmationDialog: false,
      hasMic: true
    };
  }

  componentDidMount() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        this.setState({ hasMic: true });
      })
      .catch(err => {
        this.setState({ hasMic: false });
      });
    const copiedThis = this;
    $(document).on("keydown", function(e) {
      if (copiedThis.props.addNewVoiceModal) {
        if (e.keyCode === 32) {
          if (copiedThis.state.recordedAudio !== null) {
            if (copiedThis.state.play === false) {
              document.getElementById("recorded-audio").play();
            } else {
              document.getElementById("recorded-audio").pause();
            }
            copiedThis.setState({ play: !copiedThis.state.play });
          }
        } else if (e.keyCode === 82 && copiedThis.state.hasMic) {
          copiedThis.startRecording();
        } else if (e.keyCode === 83 && copiedThis.state.hasMic) {
          copiedThis.stopRecording();
        } else if (e.keyCode === 37) {
          copiedThis.prevBtn.click();
        } else if (e.keyCode === 39) {
          copiedThis.nextBtn.click();
        }
      }
    });
  }

  addToSession = () => {
    let temp = {};
    var form = new FormData();
    var file = new File(
      [this.state.recordedAudio.blob],
      `${this.props.audioName}`,
      {
        type: "audio/wav"
      }
    );
    form.append("file", file);
    if (this.props.typeOfAudio === "phrase") {
      temp = {
        audioName: this.props.audioName,
        voice: this.props.voice,
        phrasebook: this.props.version,
        phrase: this.props.audioKey,
        url: this.state.recordedAudio.blobURL,
        file: form,
        modification: this.state.modification,
        fadein: this.state.fadein,
        fadeout: this.state.fadeout,
        convert: this.state.convert
      };
    } else {
      temp = {
        audioName: this.props.audioName,
        voice: this.props.voice,
        version: this.props.version,
        audioKey: this.props.audioKey,
        url: this.state.recordedAudio.blobURL,
        file: form,
        modification: this.state.modification,
        fadein: this.state.fadein,
        fadeout: this.state.fadeout,
        convert: this.state.convert
      };
    }
    let push;
    //if (this.props.typeOfAudio === 'phrase')
    let tempArray = [];
    if (this.state.session.length !== 0) {
      this.state.session.find(() => {
        this.state.session.map(data => {
          if (this.props.typeOfAudio === "phrase") {
            if (data.phrase === temp.phrase) {
              push = true;
            }
            return null;
          } else {
            if (data.audioKey === temp.audioKey) {
              push = true;
            }
            return null;
          }
        });
        return null;
      });
      if (!push) {
        tempArray.push(temp);
        this.props.showToast("check", "Added to session");
      } else {
        this.props.showToast(
          "caution",
          "Error adding to session. Recording is currently in session"
        );
      }
      this.setState(prevState => ({
        session: [...prevState.session, ...tempArray],
        recordedAudio: []
      }));
    } else {
      this.props.showToast("check", "Added to session");
      tempArray.push(temp);
      this.setState({
        session: [temp],
        recordedAudio: []
      });
    }
  };

  removeFromSession = index => {
    let temp = this.state.session;
    temp.splice(index, 1);
    this.setState({
      session: temp
    });
  };

  uploadAudio = () => {
    $("#upload").click();
  };

  //RECORD VOICE
  startRecording = () => {
    if (this.props.addNewVoiceModal) {
      this.startTimer();
      this.setState({
        record: true,
        recordedAudio: null
      });
    }
  };

  stopRecording = () => {
    if (this.props.addNewVoiceModal) {
      this.stopTimer();
      this.setState({ record: false });
    }
  };

  onStop = recordedBlob => {
    this.setState({
      recordedAudio: recordedBlob
    });
  };

  //TIMER
  pad = n => {
    return ("00" + n).substr(-2);
  };

  update = () => {
    var mins = document.querySelector("span.minutes");
    var secs = document.querySelector("span.seconds");
    var cents = document.querySelector("span.centiseconds");
    var now = new Date().getTime();
    var dt = now - this.lastUpdateTime;

    this.currentTimer += dt;

    var time = new Date(this.currentTimer);

    mins.innerHTML = this.pad(time.getMinutes());
    secs.innerHTML = this.pad(time.getSeconds());
    cents.innerHTML = this.pad(Math.floor(time.getMilliseconds() / 10));

    this.lastUpdateTime = now;
  };

  startTimer = () => {
    var mins = document.querySelector("span.minutes");
    var secs = document.querySelector("span.seconds");
    var cents = document.querySelector("span.centiseconds");

    //RESET TIMER
    this.currentTimer = 0;
    mins.innerHTML = secs.innerHTML = cents.innerHTML = this.pad(0);

    //START TIMER
    if (!this.interval) {
      this.lastUpdateTime = new Date().getTime();
      this.interval = setInterval(this.update, 1);
    }
  };

  stopTimer = () => {
    clearInterval(this.interval);
    this.interval = 0;
  };

  openConfirmation = () => {
    this.setState({
      confirmationDialog: !this.state.confirmationDialog
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <DialogTitle
          id="customized-dialog-title"
          onClose={this.props.handleClose}
          openConfirm={this.openConfirmation}
          session={this.state.session.length}
          test={this.state.record}
          className={classes.dialogTitle}
        >
          Recording Audio: {this.props.index + 1} / {this.props.audio.length}
        </DialogTitle>
        <DialogContent dividers className={classes.content}>
          <Grid container direction="column">
            <Grid container className={classes.section1} sm={12}>
              {/* UPLOAD SECTION START*/}
              <Grid
                container
                direction="row"
                md={5}
                sm={5}
                lg={5}
                className={classes.section1_col1}
              >
                <div className={classes.cardTitle}>
                  <Typography className={classes.title}>
                    Dialog : {this.props.audioName}
                  </Typography>
                </div>

                <div className={classes.uploadFile}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={9}>
                      <input
                        accept="audio/*"
                        style={{ display: "none" }}
                        type="file"
                        name="file"
                        id="upload"
                        onChange={this.props.handleAudio}
                        ref={fileInput => (this.fileInput = fileInput)}
                      />
                      <div
                        component="span"
                        className={classes.fileUploaded}
                        onClick={() => this.uploadAudio()}
                      >
                        {this.props.fileName
                          ? this.props.fileName
                          : "Select audio file to upload"}
                        <div className={classes.chooseFile}>Choose File</div>
                      </div>
                    </Grid>

                    <Grid item md={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.uploadAudioBtn}
                        disabled={
                          this.props.file === null || this.props.file === ""
                            ? true
                            : false
                        }
                        onClick={() => {
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
                        }}
                      >
                        Upload Audio
                      </Button>
                    </Grid>
                  </Grid>
                </div>

                <div className={classes.uploadDetails}>
                  <div className={classes.uploadList}>
                    <Typography className={classes.uploadText}>
                      {this.props.dialog}
                    </Typography>
                    <Typography
                      onClick={() => {
                        this.props.removeAudio();
                        this.fileInput.value = "";
                      }}
                      className={classes.deleteBtn}
                    >
                      <DeleteIcon className={classes.deleteIcon} />
                      Delete
                    </Typography>
                  </div>
                </div>
              </Grid>
              {/* UPLOAD SECTION END*/}

              {/* SESSION SECTION START */}
              <Grid
                container
                xs={12}
                sm={5}
                md={5}
                lg={5}
                className={classes.section1_col2}
              >
                <div className={classes.cardTitle}>
                  <Typography className={classes.title}>
                    Sessions Recordings
                  </Typography>
                  <Typography
                    id="upload-session"
                    className={
                      this.state.session.length === 0
                        ? classes.uploadSessionsBtnDisabled
                        : classes.uploadSessionsBtn
                    }
                    onClick={() => this.props.uploadSession(this.state.session)}
                  >
                    <UploadIcon className={classes.uploadIcon} />
                    Upload session
                  </Typography>
                </div>

                {this.state.session.length === 0 ? (
                  <div className={classes.emptySessionsContainer}>
                    <Typography className={classes.emptySessions}>
                      No recordings for this session
                    </Typography>
                  </div>
                ) : (
                  <div id="sessionList" className={classes.sessionsContainer}>
                    {this.state.session.length
                      ? this.state.session.map((audio, index) => (
                          <Grid container className={classes.sessionsList}>
                            <Grid item xs={4} sm={4} md={4}>
                              <Typography
                                style={{ paddingTop: "10px" }}
                                className={classes.sessionText}
                              >
                                {audio.audioName}
                              </Typography>
                            </Grid>
                            <Grid item xs={5} sm={5} md={5}>
                              <audio
                                controls
                                preload="false"
                                className={classes.audio}
                              >
                                <source src={audio.url} />
                              </audio>
                            </Grid>
                            <Grid item xs={3} sm={3} md={3}>
                              <Typography
                                onClick={() => this.removeFromSession(index)}
                                className={classes.deleteBtn}
                                style={{
                                  paddingTop: "10px",
                                  marginRight: "5%"
                                }}
                              >
                                <DeleteIcon className={classes.deleteIcon} />
                                Delete
                              </Typography>
                            </Grid>
                          </Grid>
                        ))
                      : null}
                  </div>
                )}
              </Grid>
              {/* SESSION SECTION END */}
            </Grid>

            {/* SECTION 2 START */}
            <Grid container direction="column" className={classes.section2}>
              {/* PREVIEW SESSIONS START */}
              <Grid container direction="row" className={classes.soundWaveCon}>
                <ReactMic
                  record={this.state.record}
                  className={classes.soundWave}
                  onStop={this.onStop}
                  strokeColor="#000000"
                />
              </Grid>

              <Grid
                container
                direction="row"
                className={
                  this.state.recordedAudio === null
                    ? classes.previewSession
                    : `${classes.previewSession} ${classes.previewSessionActive}`
                }
              >
                {this.state.hasMic ? (
                  <React.Fragment>
                    <Grid container md={9}>
                      {this.state.recordedAudio === null ? (
                        <Typography className={classes.noPreview}>
                          Take Preview: No Take Recorded Yet
                        </Typography>
                      ) : (
                        <React.Fragment>
                          <Typography className={classes.previewText}>
                            Press "Space" to play or pause audio
                          </Typography>
                          <audio
                            id="recorded-audio"
                            className={classes.recordedAudio}
                            controls
                            src={this.state.recordedAudio.blobURL}
                          ></audio>
                        </React.Fragment>
                      )}
                    </Grid>
                    <Grid item md={3}>
                      <Button
                        id="addSession"
                        variant="contained"
                        color="primary"
                        className={classes.addToSessionBtn}
                        disabled={
                          this.state.recordedAudio === null ? true : false
                        }
                        onClick={this.addToSession}
                      >
                        ADD TO SESSION
                      </Button>
                    </Grid>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Grid container md={12}>
                      <Typography className={classes.noMicrophone}>
                        Unable to access microphone, please check system
                        settings and make sure you click <b>"Allow"</b> to
                        access your microphone.
                      </Typography>
                    </Grid>
                  </React.Fragment>
                )}
              </Grid>
              {/* PREVIEW SESSIONS END */}

              <div className={classes.uploadInfo}>
                <Typography className={classes.uploadInfoText}>
                  Upload Options (Does not apply to preview audio)
                </Typography>
              </div>

              {/* UPLOAD OPTIONS START */}

              <div className={classes.uploadOptions}>
                <Grid
                  container
                  direction="row"
                  className={classes.uploadOptionsBtn}
                >
                  <Grid item xs={3} sm={3} md={2} lg={2}>
                    <FormControlLabel
                      className={classes.optionsLabel}
                      control={
                        <Checkbox
                          checked={this.state.fadein}
                          className={classes.checkbox}
                          classes={{ colorPrimary: classes.checkboxActive }}
                          onChange={() =>
                            this.setState({ fadein: !this.state.fadein })
                          }
                          value="checkedB"
                          color="primary"
                        />
                      }
                      label="Fade in"
                    />
                  </Grid>

                  <Grid item xs={3} sm={3} md={2} lg={2}>
                    <FormControlLabel
                      className={classes.optionsLabel}
                      control={
                        <Checkbox
                          checked={this.state.fadeout}
                          className={classes.checkbox}
                          classes={{ colorPrimary: classes.checkboxActive }}
                          onChange={() =>
                            this.setState({ fadeout: !this.state.fadeout })
                          }
                          value="checkedB"
                          color="primary"
                        />
                      }
                      label="Fade Out"
                    />
                  </Grid>

                  <Grid item xs={2} sm={3} md={2} lg={2}>
                    <FormControlLabel
                      className={classes.optionsLabel}
                      control={
                        <Checkbox
                          checked={this.state.convert}
                          className={classes.checkbox}
                          classes={{ colorPrimary: classes.checkboxActive }}
                          onChange={() =>
                            this.setState({ convert: !this.state.convert })
                          }
                          value="checkedB"
                          color="primary"
                        />
                      }
                      label="Convert"
                    />
                  </Grid>

                  <Grid item xs={2} sm={3} md={2} lg={2}>
                    <FormControlLabel
                      className={classes.optionsLabel}
                      control={
                        <Checkbox
                          checked={this.state.modifications}
                          className={classes.checkbox}
                          classes={{ colorPrimary: classes.checkboxActive }}
                          onChange={() =>
                            this.setState({
                              modification: !this.state.modification
                            })
                          }
                          value="checkedB"
                          color="primary"
                        />
                      }
                      label="No modifications"
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  direction="row"
                  className={classes.optionsInfoCon}
                >
                  <Grid item xs={3} sm={3} md={2} lg={2}>
                    <Typography className={classes.optionsInfoText}>
                      Enable fading in the audio when played
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sm={3} md={2} lg={2}>
                    <Typography className={classes.optionsInfoText}>
                      Enable fading out the audio when played
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sm={3} md={2} lg={2}>
                    <Typography className={classes.optionsInfoText}>
                      Enable converting the audio file to a different format
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sm={3} md={2} lg={2}>
                    <Typography className={classes.optionsInfoText}>
                      Disable modificatons to the audio file upon uploading
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              {/* UPLOAD OPTIONS END */}

              {/* RECORD BUTTONS */}
              <Grid container className={classes.recordButtons}>
                <Grid item md={3} style={{ display: "table" }}>
                  <Typography className={classes.recordInstruction}>
                    To record new audio, just click the Record button.
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <div style={{ display: "flex" }}>
                    <Tooltip
                      title="Press ⬅ to go Previous"
                      aria-label="play-stop"
                    >
                      <IconButton
                        disabled={this.props.backButtonState || this.props.file}
                        ref={prevBtn => (this.prevBtn = prevBtn)}
                        className={classes.btnBoxPrev}
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
                        <PreviousIcon className={classes.icon} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip
                      title="Press 'S' to stop recording"
                      aria-label="play-stop"
                    >
                      <IconButton
                        id="stopBtn"
                        className={classes.btnBox}
                        onClick={() => this.stopRecording()}
                        disabled={this.state.record ? false : true}
                      >
                        <StopIcon
                          className={
                            this.state.record
                              ? `${classes.icon}`
                              : `${classes.iconDisabled}`
                          }
                        />
                      </IconButton>
                    </Tooltip>

                    <Tooltip
                      title="Press 'Space' to play or pause audio"
                      aria-label="play-stop"
                    >
                      <IconButton
                        className={classes.btnBox}
                        onClick={() => this.setState({ play: true })}
                        disabled={
                          this.state.recordedAudio === null ? true : false
                        }
                      >
                        {!this.state.play ? (
                          <PlayIcon
                            className={
                              this.state.recordedAudio === null
                                ? `${classes.iconDisabled} ${classes.iconPlay}`
                                : `${classes.icon} ${classes.iconPlay}`
                            }
                          />
                        ) : (
                          <PauseIcon
                            className={`${classes.icon} ${classes.iconPause} `}
                          />
                        )}
                      </IconButton>
                    </Tooltip>

                    <Tooltip
                      title="Press 'R' to record your voice"
                      aria-label="play-stop"
                    >
                      <IconButton
                        id="recBtn"
                        className={classes.btnBox}
                        onClick={() => this.startRecording()}
                        disabled={this.state.hasMic ? false : true}
                      >
                        <RecordIcon
                          onClick={() => this.startRecording()}
                          className={
                            this.state.hasMic
                              ? `${classes.icon} ${classes.iconRecord}`
                              : `${classes.icon} ${classes.iconRecordDisabled}`
                          }
                        />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Press ➡ to go Next" aria-label="play-stop">
                      <IconButton
                        disabled={
                          this.props.index === this.props.audio.length - 1 ||
                          this.props.file
                        }
                        ref={nextBtn => (this.nextBtn = nextBtn)}
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
                        className={classes.btnBoxNext}
                      >
                        <NextIcon className={classes.icon} />
                      </IconButton>
                    </Tooltip>
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className={classes.counterContainer}>
                    <Typography className={classes.counterText}>
                      <span class="minutes">00</span>.
                      <span class="seconds">00</span>.
                      <span class="centiseconds">00</span>
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {/* SECTION 2 END */}
          </Grid>
        </DialogContent>

        {/* CONFIRMATION DIALOG */}
        <Dialog
          open={this.state.confirmationDialog}
          onClose={() => this.setState({ confirmationDialog: false })}
          classes={{ paper: classes.dialogPaper }}
        >
          <ConfirmationDialog
            handleClose={() => this.setState({ confirmationDialog: false })}
            closeParent={this.props.handleClose}
          />
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AddNewVoice_Desktop);
