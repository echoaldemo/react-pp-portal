import React from "react";
import ReactAudioPlayer from "react-audio-player";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Loader from "../../../common-components/Loader";

const styles: any = (theme: any) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: "#5F7D98",
    color: "#ffffff"
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#ffffff"
  },
  title: {
    fontSize: "20px",
    textAlign: "center"
  },
  content: {
    padding: "25px",
    "@media(max-width:768px)": {
      padding: "20px 15px"
    }
  },
  footer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: theme.spacing(2.5)
  },
  done: {
    width: "100%",
    backgroundColor: "#b6d36b",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#a6c161"
    }
  },
  audio: {
    display: "flex",
    alignItems: "center"
  }
});
interface Props {
  handleClose: any;
  open: any;
  loaded: any;
  audio: any;
  audioType: any;
  handleAudioSave: any;
}
class Audio extends React.Component<Props, {}> {
  render() {
    const {
      classes,
      handleClose,
      open,
      loaded,
      audio,
      audioType,
      handleAudioSave
    }: any = this.props;
    return (
      <React.Fragment>
        <Dialog
          onClose={handleClose}
          open={open}
          fullWidth={true}
          maxWidth="md"
        >
          <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6" className={classes.title}>
              Choose Audio
            </Typography>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent className={classes.content}>
            {!loaded ? (
              <Loader />
            ) : (
              audio.map((audio: any, i: number) => (
                <Grid container spacing={3} key={audio.url}>
                  <Grid item xs={4} className={classes.audio}>
                    {audio.name}
                  </Grid>
                  <Grid item xs={6} className={classes.audio}>
                    <ReactAudioPlayer src={audio.url} controls />
                  </Grid>
                  <Grid item xs={2} className={classes.audio}>
                    <Button
                      id={`audio${i}`}
                      variant="contained"
                      component="span"
                      className={classes.done}
                      onClick={() => {
                        handleAudioSave(audio.url, audio.name, audioType);
                        handleClose();
                      }}
                    >
                      SAVE
                    </Button>
                  </Grid>
                </Grid>
              ))
            )}
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Audio);
