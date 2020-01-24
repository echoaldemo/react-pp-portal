import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

const useStyles = theme => ({
  container: {
    color: "slategray",
    width: "100%",
    height: "30vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  circular: {
    color: "#a6c556",
    textAlign: "center"
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

class Loader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: true
    };
  }

  closeLoader = () => {
    this.setState(prevState => ({
      loader: !prevState.loader
    }));
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.exitIcon}
            color="inherit"
            aria-label="menu"
            onClick={() => this.closeLoader()}
          >
            <Close />
          </IconButton>
        </Toolbar>
        <div className={classes.container}>
          <CircularProgress
            size={80}
            thickness={5}
            className={classes.circular}
          />
          <br />
          <Typography
            variant="subtitle1"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            Please wait. We are saving your audio...
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Loader);
