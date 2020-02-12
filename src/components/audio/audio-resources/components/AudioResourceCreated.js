import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CheckCircle as Check,
  Close as CloseIcon
} from "@material-ui/icons/CheckCircle";
import {
  DialogContent,
  DialogContentText,
  Typography,
  DialogTitle,
  DialogActions,
  Dialog,
  Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  dialogWrapper: {
    backgroundColor: "#780aaf",
    minHeight: "150px"
  },
  text: {
    textAlign: "center",
    color: "#fff"
  },

  cancelBtn: {
    width: "90%",
    backgroundColor: "#eeeeee",
    color: "#000",
    padding: "10px",
    fontWeight: "700",
    "&:hover": {
      backgroundColor: "#eeeeee"
    }
  },
  confirmBtn: {
    width: "90%",
    backgroundColor: "#7b8a96",
    color: "#fff",
    fontWeight: "700",
    padding: "10px",
    "&:hover": {
      backgroundColor: "#7b8a96"
    }
  },
  checkIcon: {
    color: "#b6d36b",
    fontSize: "50px"
  },
  closeIcon: {
    color: "#444851",
    fontSize: "30px",
    float: "right",
    cursor: "pointer"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "20px",
    overflow: "hidden"
  },
  center: {
    display: "flex",
    justifyContent: "center"
  },
  divIcon: {
    display: "flex",
    justifyContent: "center",
    height: "70px"
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    "@media (max-width: 375px)": {
      flexDirection: "column"
    }
  },
  title: {
    textAlign: "center",
    width: "227px",
    fontSize: "18px",
    color: "#7c8a97",
    fontWeight: "500",
    "@media (max-width: 375px)": {
      fontSize: "15px",
      padding: "0 10px 0 10px"
    }
  }
}));
export default function AudioResourceCreated(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={true}
        aria-labelledby="alert-dialog-title"
      >
        <div className={classes.container}>
          <div>
            <CloseIcon
              className={classes.closeIcon}
              // onClick={() => props.handleAudioResourceCreated("close")}
            />
          </div>
          <DialogTitle style={{ fontSize: "10px" }} className={classes.center}>
            <div className={classes.divIcon}>
              <Check className={classes.checkIcon} />
            </div>
            <Typography variant="h6" className={classes.title}>
              <b>You have created {"321"} audio resource</b>
            </Typography>
          </DialogTitle>
          <DialogContent className={classes.center}>
            <DialogContentText>
              <Typography variant="body1">
                What do you want to do next?
              </Typography>
            </DialogContentText>
          </DialogContent>

          <DialogActions className={classes.buttons}>
            <Button
              id="close-dialog"
              color="primary"
              variant="contained"
              className={classes.cancelBtn}
              // onClick={() => props.handleAudioResourceCreated("close")}
            >
              Close
            </Button>

            <Button
              color="primary"
              variant="contained"
              className={classes.confirmBtn}
              // onClick={() => props.handleUploadResourceModal("open")}
            >
              Upload File
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
