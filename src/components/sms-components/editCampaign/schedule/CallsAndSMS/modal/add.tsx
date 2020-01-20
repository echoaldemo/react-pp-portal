import React from "react";
import ReactAudioPlayer from "react-audio-player";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import DialogContentText from "@material-ui/core/DialogContentText";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import CloseIcon from "@material-ui/icons/Close";

import Audio from "./audio";
import "../scrollbar.css";
import { styles } from "./css-styles";
interface Props {
  open: any;
  handleClose: any;
  audio: any;
  loaded: any;
  current: any;
  dataid: any;
  submit: any;
  snackbar: any;
}

interface State {
  type: string;
  content: any;
  delay: any;
  minutesBefore: any;
  contentError: boolean;
  liveAudio: any;
  transferDigit: any;
  phoneNumber: any;
  transferAudio: any;
  callBackDigit: any;
  callBackAudio: any;
  types: any;
  digit: any;
  current: any;
  audio: any;
  audioType: any;
  errorCallBackDigit: boolean;
  errorTransferDigit: boolean;
  errorPhoneNumber: boolean;
  btnSave: boolean;
  [x: number]: any;
}
class AddEventDialog extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      type: "SMS",
      content: "",
      delay: 0,
      minutesBefore: 0,
      contentError: false,
      liveAudio: {
        url: "",
        name: ""
      },
      transferDigit: "",
      phoneNumber: "",
      transferAudio: {
        url: "",
        name: ""
      },
      callBackDigit: "",
      callBackAudio: {
        url: "",
        name: ""
      },
      types: [
        { label: "SMS", value: "SMS" },
        { label: "Calls", value: "CALL" }
      ],
      digit: [
        { name: 0, value: 0 },
        { name: 1, value: 1 },
        { name: 2, value: 2 },
        { name: 3, value: 3 },
        { name: 4, value: 4 },
        { name: 5, value: 5 },
        { name: 6, value: 6 },
        { name: 7, value: 7 },
        { name: 8, value: 8 },
        { name: 9, value: 9 }
      ],
      current: this.props.current,
      audio: false,
      audioType: "",
      errorCallBackDigit: false,
      errorTransferDigit: false,
      errorPhoneNumber: false,
      btnSave: true
    };
  }

  handleClose = () => {
    this.setState({
      audio: false
    });
  };

  handleAudioSave = (url: any, name: any, type: any) => {
    this.setState({
      [type]: {
        url: url,
        name: name
      }
    });
    if (type === "callBackAudio" && !this.state.callBackDigit) {
      this.setState({
        errorCallBackDigit: true
      });
    }
  };

  handleChange = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (event.target.name === "callBackDigit") {
      if (event.target.value || event.target.value === 0) {
        this.setState({
          errorCallBackDigit: false
        });
      } else {
        this.setState({
          errorCallBackDigit: true
        });
      }
    }
  };

  checkContent = (event: any) => {
    if (event.target.value.length === 0) {
      this.setState({
        contentError: true,
        btnSave: true
      });
    } else {
      this.setState({
        contentError: false,
        btnSave: false
      });
    }
  };

  save = () => {
    var eventid = this.state.current[this.props.dataid].events.length - 1;
    var id: any = "";
    if (this.state.content.length !== 0) {
      let data = {};
      if (eventid + 1 === 0) {
        id = 0;
      } else {
        id = this.state.current[this.props.dataid].events[eventid].id + 1;
      }
      if (this.state.type === "SMS") {
        data = {
          id: id,
          name: this.state.type,
          content: this.state.content,
          delay: this.state.delay,
          minutesBefore: this.state.minutesBefore
        };
      } else {
        data = {
          id: id,
          name: this.state.type,
          content: this.state.content,
          delay: this.state.delay,
          liveAudio: this.state.liveAudio,
          transferDigit: this.state.transferDigit,
          phoneNumber: this.state.phoneNumber,
          transferAudio: this.state.transferAudio,
          callBackDigit: this.state.callBackDigit,
          callBackAudio: this.state.callBackAudio
        };
      }
      if (
        this.state.contentError === false ||
        this.state.errorCallBackDigit === false ||
        this.state.errorPhoneNumber === false ||
        this.state.errorTransferDigit === false
      ) {
        this.props.submit(this.props.dataid, data, "add");
        this.props.snackbar();
      }
    } else {
      this.setState({
        contentError: true
      });
    }
  };

  handleNumberChange = (event: any) => {
    if (event.target.value >= 0) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  };

  render() {
    const { classes, handleClose, open, audio, loaded }: any = this.props;
    return (
      <React.Fragment>
        <Dialog
          onClose={handleClose}
          open={open}
          fullWidth={true}
          maxWidth="sm"
        >
          <DialogTitle onClose={handleClose}>Add Event</DialogTitle>
          <DialogContent
            className={classes.content}
            style={{ overflowX: "auto", paddingBottom: 0 }}
            id="style-1"
          >
            <Typography className={classes.preSched}>Event</Typography>
            <DialogContentText
              className={classes.text}
              style={{ marginBottom: "15px" }}
            >
              Select the type of event
            </DialogContentText>
            <Grid container className={classes.grid}>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Type"
                  name="type"
                  required
                  className={classes.textField}
                  value={this.state.type}
                  onChange={this.handleChange}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  margin="normal"
                >
                  {this.state.types.map((option: any, i: number) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      id={`selectTypeOfEvent${i}`}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Divider light />
            <Typography className={classes.messageText}>Message</Typography>
            <DialogContentText className={classes.text}>
              {
                "Enter the message to deliver to the lead. You may use macros in your message such as {first_name}"
              }
            </DialogContentText>
            <Grid
              container
              className={classes.grid}
              style={{ marginTop: "5px" }}
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  id="standard-name"
                  label="Message"
                  name="content"
                  required
                  className={classes.textField}
                  onChange={this.handleChange}
                  onKeyUp={this.checkContent}
                  error={this.state.contentError}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{ maxLength: 160 }}
                  helperText={`Remaining characters: ${160 -
                    this.state.content.length}`}
                />
              </Grid>
            </Grid>
            <Divider light />
            <Typography
              className={classes.preSched}
              style={{ marginTop: "16px" }}
            >
              Parameters
            </Typography>
            <DialogContentText
              className={classes.text}
              style={{ marginTop: "16px" }}
            >
              Enter the Parameters
            </DialogContentText>
            <Grid container className={classes.grid} spacing={3}>
              <Grid item xs={6}>
                <TextField
                  id="delaySMSCALL"
                  label="Delay"
                  name="delay"
                  className={classes.textField}
                  type="number"
                  value={this.state.delay}
                  onChange={this.handleNumberChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                {this.state.type === "SMS" ? (
                  <TextField
                    label="Minutes before"
                    name="minutesBefore"
                    className={classes.textField}
                    type="number"
                    value={this.state.minutesBefore}
                    onChange={this.handleNumberChange}
                    margin="normal"
                  />
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
            {this.state.type !== "SMS" ? (
              <React.Fragment>
                <Divider light />
                <Typography
                  className={classes.preSched}
                  style={{ marginTop: "16px" }}
                >
                  Live Audio
                </Typography>
                <DialogContentText className={classes.text}>
                  Select the message that is played when the phone is answered.
                  Remember to mention the Transfer and Do Not Call options and
                  digits in this message
                </DialogContentText>
                <div className={classes.audio}>
                  {this.state.liveAudio.url !== "" || !this.state.liveAudio ? (
                    <React.Fragment>
                      <DialogContentText className={classes.audioTitle}>
                        {this.state.liveAudio.name}
                      </DialogContentText>
                      <div className={classes.audioContent}>
                        <ReactAudioPlayer
                          src={this.state.liveAudio.url}
                          controls
                          className={classes.player}
                        />
                        <Button
                          color="secondary"
                          variant="contained"
                          component="span"
                          className={classes.delete}
                          onClick={() => {
                            this.setState({
                              liveAudio: {
                                url: "",
                                name: ""
                              }
                            });
                          }}
                        >
                          <DeleteIcon className={classes.icon} /> Delete
                        </Button>
                      </div>
                    </React.Fragment>
                  ) : (
                    <Button
                      id="chooseAudio"
                      fullWidth
                      variant="contained"
                      className={classes.addAudio}
                      onClick={() => {
                        this.setState({
                          audio: true,
                          audioType: "liveAudio"
                        });
                      }}
                    >
                      Choose Audio
                    </Button>
                  )}
                </div>
                <Typography className={classes.preSched}>Transfer</Typography>
                <DialogContentText className={classes.text}>
                  Enter a phone number to transfer the call to when the Transfer
                  digit is pressed
                </DialogContentText>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      select
                      label="Transfer digit"
                      name="transferDigit"
                      required
                      className={classes.textField}
                      value={this.state.transferDigit}
                      onChange={this.handleChange}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
                      error={this.state.errorTransferDigit}
                    >
                      {this.state.digit.map((data: any, i: number) => (
                        <MenuItem
                          key={data.name}
                          id={`transferDigit${i}`}
                          value={data.value}
                        >
                          {data.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      label="Phone Number"
                      name="phoneNumber"
                      required
                      className={classes.textField}
                      value={this.state.phoneNumber}
                      onChange={this.handleChange}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true
                      }}
                      error={this.state.errorPhoneNumber}
                    />
                  </Grid>
                </Grid>
                <div className={classes.audio}>
                  {this.state.transferAudio.url !== "" ||
                  !this.state.transferAudio ? (
                    <React.Fragment>
                      <DialogContentText className={classes.audioTitle}>
                        {this.state.transferAudio.name}
                      </DialogContentText>
                      <div className={classes.audioContent}>
                        <ReactAudioPlayer
                          src={this.state.transferAudio.url}
                          controls
                          className={classes.player}
                        />
                        <Button
                          color="secondary"
                          variant="contained"
                          component="span"
                          className={classes.delete}
                          onClick={() => {
                            this.setState({
                              transferAudio: {
                                url: "",
                                name: ""
                              }
                            });
                          }}
                        >
                          <DeleteIcon className={classes.icon} /> Delete
                        </Button>
                      </div>
                    </React.Fragment>
                  ) : (
                    <DialogContentText className={classes.optionText}>
                      <b>Option:</b> Select an audio to play when the transfer
                      digit is pressed.
                      <Link
                        href="#"
                        className={classes.link}
                        onClick={() => {
                          this.setState({
                            audio: true,
                            audioType: "transferAudio"
                          });
                        }}
                      >
                        Choose file
                      </Link>
                    </DialogContentText>
                  )}
                </div>
                <Typography className={classes.preSched}>Call back</Typography>
                <DialogContentText className={classes.text}>
                  Select the message that is played when the Callback digit it
                  pressed. This message informs the costumer that they will
                  receive a text message to schedule a callback.
                </DialogContentText>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      select
                      label="Callback digit"
                      name="callBackDigit"
                      required
                      className={classes.textField}
                      value={this.state.callBackDigit}
                      onChange={this.handleChange}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
                      error={this.state.errorCallBackDigit}
                    >
                      {this.state.digit.map((data: any, i: number) => (
                        <MenuItem
                          key={data.name}
                          id={`audioCallBack${i}`}
                          value={data.value}
                        >
                          {data.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <div className={classes.audio}>
                  {this.state.callBackAudio.url !== "" ||
                  !this.state.callBackAudio ? (
                    <React.Fragment>
                      <DialogContentText className={classes.audioTitle}>
                        {this.state.callBackAudio.name}
                      </DialogContentText>
                      <div className={classes.audioContent}>
                        <ReactAudioPlayer
                          src={this.state.callBackAudio.url}
                          controls
                          className={classes.player}
                        />
                        <Button
                          color="secondary"
                          variant="contained"
                          component="span"
                          className={classes.delete}
                          onClick={() => {
                            this.setState({
                              callBackAudio: {
                                url: "",
                                name: ""
                              }
                            });
                          }}
                        >
                          <DeleteIcon className={classes.icon} /> Delete
                        </Button>
                      </div>
                    </React.Fragment>
                  ) : (
                    <Button
                      fullWidth
                      variant="contained"
                      className={classes.addAudio}
                      id="chooseAudio"
                      onClick={() => {
                        this.setState({
                          audio: true,
                          audioType: "callBackAudio"
                        });
                      }}
                    >
                      Choose Audio
                    </Button>
                  )}
                </div>
              </React.Fragment>
            ) : (
              ""
            )}
          </DialogContent>
          <DialogActions className={classes.footer}>
            <Button
              onClick={handleClose}
              color="default"
              variant="contained"
              component="span"
              className={classes.cancel}
            >
              Cancel
            </Button>
            <Button
              disabled={this.state.btnSave}
              onClick={this.save}
              variant="contained"
              // component="span"
              name="saveSMSCALL"
              className={classes.done}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {this.state.audio ? (
          <Audio
            open={this.state.audio}
            handleClose={this.handleClose}
            audio={audio}
            loaded={loaded}
            audioType={this.state.audioType}
            handleAudioSave={this.handleAudioSave}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AddEventDialog);

const DialogTitle = withStyles(styles)((props: any) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.header}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
