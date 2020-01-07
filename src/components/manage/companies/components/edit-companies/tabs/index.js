import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, makeStyles } from "@material-ui/core";

//Panel Components

/* import CompanySettings from '../../manage/manage-companies/edit-settings'
import PhraseBooks from '../../manage/manage-companies/phrase-books/PhraseBooks'
import RRTest from '../../manage/manage-companies/rapid-response-test'
import RRSegments from '../../manage/manage-companies/RapidResponse/Index'
import AudioResources from '../../manage/manage-companies/audio-resources/AudioResources' */

import styled from "styled-components";

const CustomTabs = styled(Tabs)`
  background-color: "#FFF" !important;
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
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
    color: "#444851"
  },
  tabsContainer: {
    borderBottom: "solid 2px #F1F1F1",
    width: "95%",
    margin: "0 auto"
  },
  panelContainer: {
    minHeight: 600
  }
}));

function TabComponent(props) {
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
            label="SETTINGS"
            {...a11yProps(0)}
            className={classes.tab}
          />
          <Tab
            disableFocusRipple={true}
            label="PHRASE BOOKS"
            {...a11yProps(1)}
            className={classes.tab}
          />
          <Tab
            disableFocusRipple={true}
            label="RAPID RESPONSE TESTS"
            {...a11yProps(2)}
            className={classes.tab}
          />
          <Tab
            disableFocusRipple={true}
            label="RAPID RESPONSE SEGMENTS"
            {...a11yProps(3)}
            className={classes.tab}
          />
          <Tab
            disableFocusRipple={true}
            label="AUDIO RESOURCES"
            {...a11yProps(4)}
            className={classes.tab}
          />
        </CustomTabs>
      </div>

      <TabPanel value={value} index={0} className={classes.panelContainer}>
        {/* <CompanySettings params={props.params} /> */}
        <div>Content</div>
      </TabPanel>
      {/* <TabPanel value={value} index={1} className={classes.panelContainer}>
        {props.companyData !== null && (
          <PhraseBooks company={props.companyData} />
        )}
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.panelContainer}>
        {props.companyData !== null && <RRTest company={props.companyData} />}
      </TabPanel>
      <TabPanel value={value} index={3} className={classes.panelContainer}>
        {props.companyData !== null && <RRSegments company={props.params} />}
      </TabPanel>
      <TabPanel value={value} index={4} className={classes.panelContainer}>
        {props.companyData !== null && (
          <AudioResources company={props.companyData} />
        )}
      </TabPanel> */}
    </div>
  );
}
export { TabComponent };
