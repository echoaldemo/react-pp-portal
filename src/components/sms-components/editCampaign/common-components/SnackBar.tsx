import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
const useStyles = (theme: any) => ({
  close: {
    padding: theme.spacing(0.5)
  },
  root: {
    background: "#5f7d98",
    borderRadius: 0
  }
});
class SnackBar extends React.Component<
  { open: boolean; onClose: any; message: string },
  {}
> {
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
          autoHideDuration={10000000}
          onClose={onClose}
          ContentProps={{
            "aria-describedby": "message-id",
            classes: {
              root: classes.root
            }
          }}
          message={<span id="message-id">{message}</span>}
          data-testid="snackbar"
          id="snackbar"
        />
      </div>
    );
  }
}
export default withStyles(useStyles)(SnackBar);
