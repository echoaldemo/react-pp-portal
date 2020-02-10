import React, { Component } from "react";
import {
  MenuItem,
  Button,
  Typography,
  Paper,
  Popper,
  Grid,
  withStyles,
  IconButton,
  Tooltip,
  Grow,
  ClickAwayListener
} from "@material-ui/core";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import RefreshIcon from "@material-ui/icons/Cached";
import { Redirect, withRouter } from "react-router-dom";

const useStyles = theme => ({
  dropdown: {
    fontSize: 20,
    color: "#444851",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent"
    },
    "@media (max-width: 425px)": {
      marginTop: -10
    }
  },
  dropContent: {
    textDecoration: "underline",
    "@media (max-width: 425px)": {
      fontSize: 16
    }
  },
  keyIcon: {
    "@media (max-width: 425px)": {
      fontSize: 19
    }
  },
  popper: {
    marginLeft: "-45px",
    marginTop: "-5px",
    "@media (max-width: 425px)": {
      marginLeft: "-45px"
    }
  },
  paper: {
    width: "auto",
    color: "#6d6d6d",
    minWidth: "150px",
    marginLeft: "50px !important"
  },
  linkFontSize: {
    "@media (max-width: 425px)": {
      fontSize: 14
    }
  },
  resFont: {
    width: 200,
    padding: 15,
    "@media (max-width: 425px)": {
      fontSize: 15,
      marginBottom: -9
    }
  },
  resHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "@media (max-width: 425px)": {}
  },
  resRefresh: {
    marginRight: -100,
    "@media (max-width: 815px)": {
      marginRight: -70
    },
    "@media (max-width: 425px)": {
      marginTop: "-10px",
      marginRight: 0
    },
    "@media (max-width: 599px)": {
      marginTop: "-10px",
      marginRight: 0
    }
  }
});
class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorRef: null,
      redirect: false,
      route: ""
    };
  }
  flipOpen = () => this.setState({ ...this.state, open: !this.state.open });
  handleClick = event => {
    this.state.anchorEl
      ? this.setState({ anchorEl: null })
      : this.setState({ anchorEl: event.currentTarget });
    this.flipOpen();
  };
  toTitleCase = str => {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  render() {
    const { pathname } = this.props.location;
    const id = this.state.open ? "simple-popper" : null;
    const { classes } = this.props;
    if (this.state.redirect) {
      return <Redirect to={this.state.route} />;
    } else {
      return (
        <React.Fragment>
          <Grid container className={classes.resHeader}>
            <Grid item>
              <Button
                aria-describedby={id}
                color="inherit"
                onClick={event => this.handleClick(event)}
                className={classes.dropdown}
              >
                <Typography
                  variant="h5"
                  className={classes.dropContent}
                  id="dropdown-link"
                >
                  {pathname === "/manage/audio/resources"
                    ? "Audio Resources"
                    : "Voice"}
                </Typography>
                <KeyboardArrowDown className={classes.keyIcon} />
              </Button>
              <Popper
                placement="bottom-start"
                id={id}
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                transition
                className={classes.popper}
              >
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps} timeout={450}>
                    <ClickAwayListener
                      onClickAway={() =>
                        this.setState({
                          open: false
                        })
                      }
                    >
                      <Paper className={classes.paper}>
                        {pathname === "/manage/audio/resources" ? (
                          <MenuItem
                            onClick={() =>
                              this.setState({
                                redirect: true,
                                route: "/manage/audio/pitch"
                              })
                            }
                            value={"Voice"}
                            className={classes.resFont}
                          >
                            {"Voice"}
                          </MenuItem>
                        ) : (
                          <MenuItem
                            onClick={() =>
                              this.setState({
                                redirect: true,
                                route: "/manage/audio/resources"
                              })
                            }
                            value={"Audio Resources"}
                            className={classes.resFont}
                          >
                            {"Audio Resources"}
                          </MenuItem>
                        )}
                      </Paper>
                    </ClickAwayListener>
                  </Grow>
                )}
              </Popper>
            </Grid>
            <Grid item className={classes.resRefresh}>
              {this.props.fetchedUnrecorded &&
              this.props.fetchedRerecord &&
              this.props.fetchedRecorded ? (
                <Tooltip title="Refresh Data" placement="Top">
                  <IconButton
                    className={classes.refresh}
                    onClick={() => this.props.refreshData(this.props.version)}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              ) : null}
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }
  }
}
export default withRouter(withStyles(useStyles)(Dropdown));
