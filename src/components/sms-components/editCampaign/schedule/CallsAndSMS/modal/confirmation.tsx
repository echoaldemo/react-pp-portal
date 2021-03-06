import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Delete from "@material-ui/icons/DeleteOutline";
import warningImg from "../../../../images/warn.png";

const styles: any = (theme: any) => ({
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
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#ffffff"
  },
  title: {
    fontSize: "20px",
    textAlign: "center"
  },
  addBtn: {
    width: "100%",
    backgroundColor: "#ff504d",
    color: "white",
    "&:hover": {
      background: "#b01b2e"
    }
  },
  cancelAdd: {
    width: "100%",
    marginRight: "10px",
    backgroundColor: "#eeeeee",
    color: "#444851",
    "&:hover": {
      background: "lightGrey"
    }
  },
  warning: {
    width: "60px",
    marginLeft: "30%",
    marginTop: "-5px",
    "@media(max-width:600px)": {
      marginLeft: "40%"
    }
  },
  gridButtons: {
    marginTop: "20px",
    marginBottom: "-10px"
  },
  gridMessage: {
    marginTop: "35px",
    marginBottom: "35px"
  },
  confirm: {
    marginLeft: "-5%",
    "@media(max-width:600px)": {
      marginLeft: "6%"
    }
  },
  typography: {
    color: "#444851"
  }
});
interface Props {
  open: any;
  confirmDelete: any;
  submit: any;
  type: any;
  handleClose: any;
  cancelDelete: any;
  deleteCallSnackbar: any;
  deleteSMSSnackbar: any;
  delete: any;
  Cancel?: any;
}
class AddEventDialog extends React.Component<Props, {}> {
  render() {
    const { classes, handleClose, open, type }: any = this.props;
    return (
      <React.Fragment>
        <Dialog
          onClose={handleClose}
          open={open}
          fullWidth={true}
          maxWidth="sm"
        >
          <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6" className={classes.title}>
              Confirm Delete
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
            <Grid container spacing={1} className={classes.gridMessage}>
              <Grid item xs={12} sm={3} md={3} lg={3}>
                <img
                  src={warningImg}
                  className={classes.warning}
                  alt="warningImage"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={9}
                md={9}
                lg={9}
                className={classes.confirm}
              >
                <Typography variant="h6" className={classes.typography}>
                  Do you really you want to delete this event?
                </Typography>
                <Typography variant="body1" className={classes.typography}>
                  This action cannot be undone.
                </Typography>
              </Grid>
            </Grid>
            <Divider light />
            <Grid container spacing={3} className={classes.gridButtons}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Button
                  variant="contained"
                  className={classes.cancelAdd}
                  onClick={() => {
                    this.props.handleClose();
                    this.props.cancelDelete(type);
                  }}
                ></Button>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Button
                  variant="contained"
                  className={classes.addBtn}
                  onClick={() => {
                    this.props.delete();
                    if (type === "sms") {
                      this.props.deleteSMSSnackbar();
                    } else {
                      this.props.deleteCallSnackbar();
                    }
                  }}
                >
                  <Delete />
                  Delete
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AddEventDialog);
