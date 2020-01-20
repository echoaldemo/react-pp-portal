import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
const useStyles: any = (theme: any) => ({
  close: {
    padding: theme.spacing(0.5)
  },
  root: {
    background: "#5f7d98"
  }
});
class SnackBar extends React.Component {
  render() {
    const { classes, open, onClose, message }: any = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          autoHideDuration={2000}
          onClose={onClose}
          ContentProps={{
            "aria-describedby": "message-id",
            classes: {
              root: classes.root
            }
          }}
          message={<span id="message-id">{message}</span>}
          data-testid="snackbar"
        />
      </div>
    );
  }
}
export default withStyles(useStyles)(SnackBar);
