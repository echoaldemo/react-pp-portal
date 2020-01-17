import React from "react";
import PropTypes from "prop-types";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  makeStyles,
  CircularProgress
} from "@material-ui/core";

//Panel Components
import styled from "styled-components";
import ChartTopComponent from "./ChartTopComponent";
import Data from "./Data.js";

const CustomTabs = styled(Tabs)`
  background-color: "#FFF" !important;
`;

function TabPanel(props) {
  const { children, style, value, index, ...other } = props;

  return (
    <Typography
      style={style}
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: { minHeight: 600 },
  tab: {
    fontWeight: 600,
    fontSize: 14,
    color: "#444851",
    padding: 16
  },
  tabsContainer: {
    borderBottom: "solid 2px #F1F1F1",
    width: "95%",
    margin: "0 auto"
  },
  panelContainer: {
    minHeight: 600,
    height: "100%",
    padding: 36
  }
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.tabsContainer}>
        <CustomTabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              height: "5px",
              backgroundColor: "rgb(248 , 149 , 35)"
            }
          }}
        >
          <Tab
            disableFocusRipple={true}
            label="BILLABLE HOURS"
            {...a11yProps(0)}
            className={classes.tab}
          />
        </CustomTabs>
      </div>
      <TabPanel value={value} index={0} className={classes.panelContainer}>
        <ChartTopComponent />
        <Data />
      </TabPanel>
    </div>
  );
}
