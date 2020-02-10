import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = theme => ({
  navBarRight: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: 10,
    "@media (max-width: 425px)": {
      width: "100%",
      padding: 5,
      marginBottom: -11
    }
  },
  Tabs: {
    color: "#919ca7",
    backgroundColor: "#eeeeee",
    borderRadius: "5px",
    width: "100%",
    "@media (max-width: 1000px)": {
      width: "98%",
      marginTop: "5%"
    }
  },
  indicator: {
    backgroundColor: "transparent"
  },
  activeTab: {
    backgroundColor: "#f4a429",
    color: "#fff",
    "@media (max-width: 336px)": {
      fontSize: "11px !important"
    },
    "@media (max-width: 425px)": {
      fontSize: 11
    },
    "@media (max-width: 499px)": {
      fontSize: 12
    },
    "@media (max-width: 714px)": {
      fontSize: "12px !important"
    },
    "@media (max-width: 866px)": {
      fontSize: 13
    }
  },
  notActive: {
    "@media (max-width: 336px)": {
      fontSize: "11px !important"
    },
    "@media (max-width: 425px)": {
      fontSize: 11
    },
    "@media (max-width: 499px)": {
      fontSize: 12
    },
    "@media (max-width: 714px)": {
      fontSize: "12px !important"
    },
    "@media (max-width: 866px)": {
      fontSize: 13
    }
  },
  refresh: {
    marginRight: "25px",
    "@media (max-width: 425px)": {
      marginTop: "-46px"
    }
  }
});

class TabsComponent extends Component {
  constructor() {
    super();

    this.state = {
      value: 0
    };
  }

  handleChange = newValue => {
    this.setState({
      value: newValue
    });
    this.props.tabSelected(newValue);
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.navBarRight}>
        <Tabs
          value={this.state.value}
          variant="fullWidth"
          aria-label="full width tabs example"
          className={classes.Tabs}
          classes={{
            indicator: classes.indicator
          }}
          id="tabs"
        >
          <Tab
            className={
              this.state.value === 0 ? classes.activeTab : classes.notActive
            }
            label="Unrecorded"
            {...a11yProps(0)}
            onClick={() => {
              this.handleChange(0);
              //reset(true)
            }}
            id="unrecorded"
          />
          <Tab
            className={
              this.state.value === 1 ? classes.activeTab : classes.notActive
            }
            label="Re-record"
            {...a11yProps(1)}
            onClick={() => {
              this.handleChange(1);
              //reset(true)
            }}
            id="rerecord"
          />
          <Tab
            className={
              this.state.value === 2 ? classes.activeTab : classes.notActive
            }
            label="Recorded"
            {...a11yProps(2)}
            onClick={() => {
              this.handleChange(2);
              //reset(true)
            }}
            id="recorded"
          />
        </Tabs>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(TabsComponent);
