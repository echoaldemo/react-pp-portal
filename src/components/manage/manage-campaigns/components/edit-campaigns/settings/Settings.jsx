import React, { useState, useContext } from "react";
import "./Settings.css";
import EditHeader from "../EditHeader";
import { Paper, Typography, Tabs, Tab, Box } from "@material-ui/core";
import { General, AudioResources, List, QA, ChangeLog } from "./content";
import { IdentityContext } from "contexts/IdentityProvider";

const TabPanel = props => {
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
      <Box>{children}</Box>
    </Typography>
  );
};

const SettingsContent = () => {
  const [tabValue, setValue] = useState(0);
  const tabArr = ["General", "Audio Resources", "List", "QA", "Change Log"];
  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`
    };
  }
  const tabPanels = [General, AudioResources, List, QA, ChangeLog];
  return (
    <div>
      <Typography className="section-title">Campaign Settings</Typography>
      <Tabs
        value={tabValue}
        fullwidth="true"
        onChange={handleChange}
        className="tabs-container"
      >
        {tabArr.map((item, i) => {
          return (
            <Tab label={item} key={i} {...a11yProps(i)} className="tab-text" />
          );
        })}
      </Tabs>
      {tabPanels.map((item, i) => {
        return (
          <TabPanel key={i} value={tabValue} index={i}>
            {item}
          </TabPanel>
        );
      })}
    </div>
  );
};

const SettingsSection = ({ match, history }) => {
  const { state, dispatch } = useContext(IdentityContext);
  return (
    <div>
      <EditHeader campaignDetails={state.campaignDetails} history={history} />
      <Paper square={true} className="mh-normal">
        <SettingsContent state={state} dispatch={dispatch} />
      </Paper>
    </div>
  );
};
export default SettingsSection;
