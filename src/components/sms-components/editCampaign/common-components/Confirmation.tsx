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
import warningImg from "./warn.jpg";
import { Confirmation as styles } from "../styles/style";

class AddEventDialog extends React.Component<
  { open: any; deleteMessage: any; confirmDelete: any; refresh?: any },
  {}
> {
  render() {
    const {
      classes,
      confirmDelete,
      open,
      deleteMessage,
      refresh
    }: any = this.props;
    return (
      <React.Fragment>
        <Dialog
          onClose={() => confirmDelete("cancel")}
          open={open}
          fullWidth={true}
          maxWidth="sm"
          id="delete-dialog"
        >
          <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6" className={classes.title}>
              Confirm Delete
            </Typography>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={() => confirmDelete("cancel")}
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
                  onClick={() => confirmDelete("cancel")}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Button
                  variant="contained"
                  className={classes.addBtn}
                  onClick={() => {
                    deleteMessage();
                    refresh();
                  }}
                  id="confirm-delete"
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
