import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";

const useStyles: any = (theme: any) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: "white"
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  header: {
    backgroundColor: "#5f7d98",
    color: "white"
  },
  button: {
    margin: "20px 20px 20px 20px",
    paddingLeft: "10px",
    paddingRight: "10px",
    width: "auto"
  }
});

interface IProps {
  handleCloseDialog: any;
  open: any;
  handleClickOpenDialog: any;
}

class EditDialog extends React.Component<IProps, {}> {
  render() {
    const { classes }: any = this.props;
    return (
      <div>
        <Dialog
          onClose={this.props.handleCloseDialog}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
        >
          <DialogTitle id="customized-dialog-title" className={classes.header}>
            Edit Settings
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>What do you want to do?</Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row"
              }}
            >
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Rerecord
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(useStyles)(EditDialog);
