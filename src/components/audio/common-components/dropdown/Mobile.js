import React, { Component } from "react";
import {
  MenuItem,
  Button,
  Typography,
  Fade,
  Paper,
  Popper,
  Grid,
  withStyles
} from "@material-ui/core";

import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";

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
    color: "#6d6d6d"
  },
  linkFontSize: {
    "@media (max-width: 425px)": {
      fontSize: 14
    }
  },
  resFont: {
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
      anchorRef: null
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
    const id = this.state.open ? "simple-popper" : null;
    const { classes, links } = this.props;
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
                {this.toTitleCase(links[0].name)}
              </Typography>
              <KeyboardArrowDown className={classes.keyIcon} />
            </Button>
            <Popper
              id={id}
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper className={classes.popper}>
                    {links.map(links => {
                      return (
                        <a
                          key={links.name}
                          href={links.link}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <MenuItem
                            value={links.name}
                            className={classes.resFont}
                          >
                            {this.toTitleCase(`${links.name}`)}
                          </MenuItem>
                        </a>
                      );
                    })}
                  </Paper>
                </Fade>
              )}
            </Popper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Dropdown);
