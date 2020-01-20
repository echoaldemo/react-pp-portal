import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Textfield from "../../common-components/Textfield";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import InputTextField from "../../common-components/CssTextField";
import Delete from "@material-ui/icons/DeleteOutline";
const styles = (theme: any) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: "#5F7D98",
    color: "#ffffff"
  },
  content: {
    padding: "25px",
    "@media(max-width:768px)": {
      padding: "20px 15px"
    }
  },
  closeButton: {
    // position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#ffffff"
  },
  title: {
    fontSize: 20
    // textAlign: "center"
  },
  preSched: {
    fontWeight: 500,
    color: "#444851",
    marginBottom: "5px"
  },
  grid: {
    marginTop: "-10px",
    marginBottom: "10px"
  },
  messageText: {
    fontWeight: 500,
    color: "#444851",
    marginTop: theme.spacing(2),
    marginBottom: "5px"
  },
  rightButtons: {
    display: "flex",
    justifyContent: "end"
  },
  deleteBtn: {
    width: "100%",
    backgroundColor: "#ff504d",
    "&:hover": {
      background: "#5f7d98"
    },
    "@media(min-width:768px)": {
      width: "75%"
    }
  },
  cancelBtn: {
    width: "50%",
    marginRight: "10px",
    backgroundColor: "#eeeeee",
    color: "#444851",
    "&:hover": {
      background: "#5f7d98",
      color: "white"
    }
  },
  saveBtn: {
    width: "50%",
    backgroundColor: "#b6d36b",
    "&:hover": {
      background: "#5f7d98"
    }
  },
  addBtn: {
    width: "100%",
    backgroundColor: "#b6d36b",
    color: "white",
    "&:hover": {
      background: "#5f7d98"
    }
  },
  cancelAdd: {
    width: "100%",
    marginRight: "10px",
    backgroundColor: "#eeeeee",
    color: "#444851",
    "&:hover": {
      background: "#5f7d98",
      color: "white"
    }
  }
});

interface Props {
  open?: any;
  toggleDialog?: any;
  minutes?: any;
  addDialog?: any;
  handleTime: any;
  minutesOptions: any;
  handleTextChange: any;
  message: any;
  addSchedule: any;
  refresh: any;
  deleteMessage: any;
  editSchedule: any;
}
class AddEventDialog extends React.Component<Props, {}> {
  render() {
    const {
      classes,
      toggleDialog,
      open,
      addDialog,
      minutes,
      message
    }: any = this.props;
    let disableAdd = minutes.length === 0 || message.length === 0;
    return (
      <React.Fragment>
        <Dialog onClose={toggleDialog} open={open} maxWidth="md">
          <DialogTitle onClose={toggleDialog}>SMS Settings</DialogTitle>
          <DialogContent className={classes.content}>
            <Typography className={classes.preSched}>Pre Scheduling</Typography>
            <Typography
              variant="body2"
              style={{ color: "#444851", marginBottom: "15px" }}
            >
              Select the number of minutes to send a reminder text before the
              call
            </Typography>
            <Grid container className={classes.grid}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Textfield
                  label="Number of minutes"
                  name="minutes"
                  input={minutes}
                  onchange={this.props.handleTime}
                  values={this.props.minutesOptions}
                  require={false}
                  field="minutes"
                />
              </Grid>
            </Grid>
            <Divider light />
            <Typography className={classes.messageText}>Message</Typography>
            <Typography variant="body2" style={{ color: "#444851" }}>
              {`Enter the message to deliver to the lead. You may use macros in
              your message such as {first_name}`}
            </Typography>
            <Grid
              container
              className={classes.grid}
              style={{ marginTop: "5px" }}
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <InputTextField
                  id="smsNumberMinutes"
                  label="Message"
                  name="message"
                  type="text"
                  value={message}
                  handleTextChange={this.props.handleTextChange}
                  errorText={this.props.message.length <= 10}
                  required={false}
                  variant="outlined"
                  helperText={`This SMS will be sent as 1 message(s). Remaining characters: ${160 -
                    this.props.message.length}`}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={3}
              style={{ marginTop: "30px", marginBottom: "-10px" }}
            >
              {addDialog ? (
                <React.Fragment>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Button
                      variant="contained"
                      className={classes.cancelAdd}
                      onClick={toggleDialog}
                    >
                      Cancel
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Button
                      variant="contained"
                      className={classes.addBtn}
                      onClick={() => {
                        this.props.addSchedule();
                        this.props.refresh();
                      }}
                      disabled={disableAdd}
                      id="add-btn"
                    >
                      Add Event
                    </Button>
                  </Grid>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.deleteBtn}
                      onClick={() => {
                        this.props.deleteMessage("open");
                      }}
                      id="delete-btn"
                    >
                      <Delete />
                      Delete Message
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <div className={classes.rightButtons}>
                      <Button
                        color="primary"
                        variant="contained"
                        className={classes.cancelBtn}
                        onClick={toggleDialog}
                      >
                        {/* <Cancel /> */}
                        Cancel
                      </Button>

                      <Button
                        color="primary"
                        variant="contained"
                        className={classes.saveBtn}
                        onClick={() => {
                          this.props.editSchedule();
                          this.props.refresh();
                        }}
                        id="save-btn"
                      >
                        {/* <Save /> */}
                        Save
                      </Button>
                    </div>
                  </Grid>
                </React.Fragment>
              )}
            </Grid>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(AddEventDialog);
const DialogTitle = withStyles(styles)((props: any) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        {children}
      </Typography>
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
