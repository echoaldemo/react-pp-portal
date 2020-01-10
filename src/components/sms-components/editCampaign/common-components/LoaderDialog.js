import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import CircularProgress from "@material-ui/core/CircularProgress"

//npm install react-loader-spinner --save need this dependencies//
const useStyles = theme => ({
  progress: {
    margin: theme.spacing(2)
  },
  dialogTitle: {
    background: "#5f7d98",
    fontSize: "25px",
    color: "#fff"
  },
  dialogText: {
    fontSize: 20,
    color: "#fff",
    margin: 0,
    textAlign: "center"
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 25,
    marginTop: 25
  },
 
  p: {
    marginTop: 20,
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: 18,
    fontWeight: 500,
    color: '#7c8a97'
  },
  loader: {
    width: 45,
    height: 45,
    color: '#1194f6',
  }
});

class LoaderDialog extends React.Component {
  render() {
    const { classes, open } = this.props;
    return (
      <Dialog
        open={open}
        disableEscapeKeyDown={false}
        disableBackdropClick={false}
        className={classes.dialog}
        fullWidth={true}
        maxWidth="xs"
        data-testid={"loader-dialog"}
        id="dialog"
      >
        <DialogContent className={classes.content}>
          <CircularProgress className={classes.loader} />
          <p className={classes.p}>Processing</p>
        </DialogContent>
      </Dialog>
    );
  }
}
export default withStyles(useStyles)(LoaderDialog);
