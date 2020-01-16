import React from "react";
import ReactAudioPlayer from "react-audio-player";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Audio from "./audio";
import styles from "./css-styles";
const DialogTitle = withStyles(styles)(props => {
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
class CallsSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.events.id,
      liveAudio: this.props.events.liveAudio,
      transferDigit: this.props.events.transferDigit,
      phoneNumber: this.props.events.phoneNumber,
      transferAudio: this.props.events.transferAudio,
      callBackDigit: this.props.events.callBackDigit,
      callBackAudio: this.props.events.callBackAudio,
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
      audio: false,
      audioType: "",
      errorCallBackDigit: false,
      errorTransferDigit: false,
      errorPhoneNumber: false
    };
  }
  handleClose = () => {
    this.setState({
      audio: false
    });
  };
  handleAudioSave = (url, name, type) => {
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
  handleChange = event => {
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
  handleNumberChange = event => {
    if (event.target.value >= 0) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  };
  save = () => {
    if (
      this.state.errorCallBackDigit === false ||
      this.state.errorPhoneNumber === false ||
      this.state.errorTransferDigit === false
    ) {
      let data = {
        id: this.state.id,
        liveAudio: this.state.liveAudio,
        transferDigit: this.state.transferDigit,
        phoneNumber: this.state.phoneNumber,
        transferAudio: this.state.transferAudio,
        callBackDigit: this.state.callBackDigit,
        callBackAudio: this.state.callBackAudio
      };
      this.props.submit(this.props.dataid, data, "calls");
      this.props.snackbar();
    }
  };
  delete = () => {
    let data = {
      id: this.state.id
    };
    this.props.submit(this.props.dataid, data, "delete");
  };
  render() {
    const { classes, open, handleClose, name, audio, loaded } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="form-dialog-title"
        scroll="body"
      >
        <DialogTitle onClose={handleClose}> {name} </DialogTitle>
        <DialogContent
          className={classes.Content}
          style={{ overflowX: "auto", paddingBottom: 0 }}
        >
          <Typography className={classes.title}>Live Audio</Typography>
          <DialogContentText className={classes.text}>
            Select the message that is played when the phone is answered.
            Remember to mention the Transfer and Do Not Call options and digits
            in this message
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
                  id="delete1"
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
                fullWidth
                id="chooseAudio"
                variant="contained"
                // color="primary"
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
          <Typography className={classes.title}>Transfer</Typography>
          <DialogContentText className={classes.text}>
            Enter a phone number to transfer the call to when the Transfer digit
            is pressed
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                select
                label="Transfer digit"
                name="transferDigit"
                required
                className={classes.select}
                value={this.state.transferDigit}
                onChange={this.handleNumberChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {this.state.digit.map((data, i) => (
                  <MenuItem key={data.name} id={`transferDigit${i}`} value={data.value}>
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
                className={classes.select}
                value={this.state.phoneNumber}
                onChange={this.handleNumberChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              ></TextField>
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
                  id="delete2"
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
                <b>Option:</b> Select an audio to play when the transfer digit
                is pressed.
                <Link
                name="chooseFileEdit"
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
          <Typography className={classes.title}>Call back</Typography>
          <DialogContentText className={classes.text}>
            Select the message that is played when the Callback digit it
            pressed. This message informs the costumer that they will receive a
            text message to schedule a callback.
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                select
                label="Callback digit"
                name="callBackDigit"
                required
                className={classes.select}
                value={this.state.callBackDigit}
                onChange={this.handleChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {this.state.digit.map((data, i) => (
                  <MenuItem key={data.name} id={`callBack${i}`} value={data.value}>
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
                  id="delete3"
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
                id="chooseAudio"
                variant="contained"
                // color="primary"
                className={classes.addAudio}
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
        </DialogContent>
        <DialogActions className={classes.footer}>
          <Grid container spacing={2} justify='center'>
            {/* <Grid item xs={12} sm={6} lg={6} md={6}>
              <Button
                onClick={() => this.props.openDelete("calls")}
                color="secondary"
                variant="contained"
                component="span"
                className={classes.deleteBtn}
              >
                Delete
              </Button>
            </Grid> */}
            <Grid item xs={12} sm={6} lg={6} md={6}  >
              <div className={classes.rightButtons}>
                <Button
                  onClick={handleClose}
                  color="default"
                  variant="contained"
                  component="span"
                  className={classes.cancelBtn}
                >
                  Cancel
                </Button>
                <Button
                name="saveEditAudio"
                  onClick={this.save}
                  variant="contained"
                  component="span"
                  className={classes.saveBtn}
                >
                  Save
                </Button>
              </div>
            </Grid>
          </Grid>
        </DialogActions>
        {this.state.audio ? 
        <Audio 
          open={this.state.audio}
          handleClose={this.handleClose}
          audio={audio}
          loaded={loaded}
          audioType={this.state.audioType}
          handleAudioSave={this.handleAudioSave}
        />
        : null}
      </Dialog>
    );
  }
}
export default withStyles(styles)(CallsSetting);
