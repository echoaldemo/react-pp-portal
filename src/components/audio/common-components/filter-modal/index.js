import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class FilterModal extends Component {
  render() {
    return (
      <div>
        <Dialog
          fullWidth={true}
          open={this.props.filterModal}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"No Campaigns Available"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This voice hasn't been assigned to any campaigns, so no recordings
              are available. Please contact a Perfect Pitch Administrator to
              request access.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default FilterModal;
