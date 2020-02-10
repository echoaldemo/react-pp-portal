import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/Info";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";

const styles = {
  dialogTitle: {
    padding: "10px 15px"
  },
  dialogActions: {
    justifyContent: "center",
    padding: "25px"
  },
  cancelBtn: {
    width: "165px",
    height: "40px",
    borderRadius: "3px",
    backgroundColor: "#eeeeee",
    color: "#444851",
    fontWeight: "bold"
  },
  agreeBtn: {
    marginLeft: "6%",
    color: "#ffffff",
    width: "165px",
    height: "40px",
    borderRadius: "3px",
    backgroundColor: "#7c8a97",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#707c88"
    }
  },
  closeIcon: {
    float: "right"
  },
  content: {
    textAlign: "center",
    fontSize: "18px"
  },
  infoIcon: {
    color: "#ff504d",
    fontSize: "30px"
  }
};

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.dialogTitle}
      {...other}
    >
      <Typography variant="h6">{children}</Typography>
      <IconButton
        aria-label="close"
        onClick={onClose}
        className={classes.closeIcon}
      >
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
});

class ConfirmationDialog extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <DialogTitle
          id="customized-dialog-title"
          onClose={this.props.handleClose}
        />
        <DialogContent>
          <DialogContentText className={classes.content}>
            <Typography>
              <InfoIcon className={classes.infoIcon} />
            </Typography>
            Are you sure you want to close? The session will not be saved.
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            onClick={this.props.handleClose}
            className={classes.cancelBtn}
          >
            CANCEL
          </Button>
          <Button
            onClick={() => {
              this.props.closeParent();
              this.props.handleClose();
            }}
            className={classes.agreeBtn}
            autoFocus
          >
            CONTINUE
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ConfirmationDialog);
