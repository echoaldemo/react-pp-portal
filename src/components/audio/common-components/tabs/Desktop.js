import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Redirect } from "react-router-dom";

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
    width: "81%",
    "@media (max-width: 599px)": {
      width: "100%"
    },
    "@media (max-width: 1024px  )": {
      width: "100%"
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
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue,
      redirect: false,
      route: ""
    };
  }

  handleChange = newValue => {
    this.setState({
      value: newValue
    });
    this.props.tabSelected(newValue);
    if (newValue === 0) {
      //window.location.href = `/manage/audio/pitch`;
      this.setState({ redirect: true, route: "/manage/audio/pitch" });
    } else if (newValue === 1) {
      // window.location.href = `/manage/audio/phrase`;
      this.setState({ redirect: true, route: "/manage/audio/phrase" });
    } else if (newValue === 2) {
      // window.location.href = `/manage/audio/prospect`;
      this.setState({ redirect: true, route: "/manage/audio/prospect" });
    }
  };

  render() {
    const { classes } = this.props;
    if (this.state.redirect) {
      return <Redirect to={this.state.route} />;
    } else {
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
              label="Pitch Audio"
              {...a11yProps(0)}
              onClick={() => {
                this.handleChange(0);
                //reset(true)
              }}
              id="pitch-audio"
            />
            <Tab
              className={
                this.state.value === 1 ? classes.activeTab : classes.notActive
              }
              label="Phrase Audio"
              {...a11yProps(1)}
              onClick={() => {
                this.handleChange(1);
                //reset(true)
              }}
              id="phrase-audio"
            />
            <Tab
              className={
                this.state.value === 2 ? classes.activeTab : classes.notActive
              }
              label="Prospect Audio"
              {...a11yProps(2)}
              onClick={() => {
                this.handleChange(2);
                //reset(true)
              }}
              id="prospect-audio"
            />
          </Tabs>
        </Grid>
      );
    }
  }
}

export default withStyles(useStyles)(TabsComponent);
