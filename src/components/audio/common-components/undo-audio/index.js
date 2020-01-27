import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import WarningIcon from "@material-ui/icons/ErrorOutline";

const styles = theme => ({
  dialogWrapper: {
    backgroundColor: "#780aaf",
    minHeight: "150px"
  },
  text: {
    textAlign: "center",
    color: "#fff"
  },
  btnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "20px"
  },
  cancelBtn: {
    width: "100%",
    backgroundColor: "#eeeeee",
    color: "#000",
    fontWeight: "700",
    padding: "10px",
    "&:hover": {
      backgroundColor: "#eeeeee"
    }
  },
  confirmBtn: {
    width: "100%",
    backgroundColor: "#7b8a96",
    color: "#fff",
    fontWeight: "700",
    padding: "10px",
    "&:hover": {
      backgroundColor: "#7b8a96"
    }
  },
  warningIcon: {
    color: "#ff504d",
    fontSize: "50px"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "30px"
  },
  center: {
    display: "flex",
    justifyContent: "center"
  },
  divIcon: {
    display: "flex",
    justifyContent: "center",
    height: "70px"
  }
});

class RerecordAudio extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          id="undo-dialog"
          fullWidth={true}
          maxWidth="xs"
          open={this.props.undoAudioModal}
          aria-labelledby="alert-dialog-title"
        >
          <div className={classes.container}>
            <DialogTitle
              style={{ fontSize: "10px" }}
              className={classes.center}
            >
              <div className={classes.divIcon}>
                <WarningIcon className={classes.warningIcon} />
              </div>

              <Typography variant="body1">
                Are you sure you want to undo this audio?
              </Typography>
            </DialogTitle>

            <DialogActions className={classes.btnContainer}>
              <Button
                onClick={this.props.undoAudioClose}
                color="primary"
                variant="contained"
                className={classes.cancelBtn}
              >
                Cancel
              </Button>
              <Button
                id="yes-undo"
                onClick={() => {
                  this.props.undoAudio(
                    this.props.data,
                    this.props.id,
                    this.props.data.key
                  );
                  this.props.undoAudioClose();
                }}
                color="primary"
                variant="contained"
                className={classes.confirmBtn}
              >
                Yes
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(RerecordAudio);
