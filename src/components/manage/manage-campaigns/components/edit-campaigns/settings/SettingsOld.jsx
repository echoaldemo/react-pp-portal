import React, { useEffect, useState } from "react";
import "./Settings.css";
import { LoadingModal } from "common-components";
import EditHeader from "../EditHeader";
import { Paper, Typography, Tabs, Tab, Box } from "@material-ui/core";
import { General, AudioResources, List, QA, ChangeLog } from "./content";
import { IdentityContext } from "contexts/IdentityProvider";
export default function SettingsSection({ match, history }) {
  const [tabValue, setValue] = useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`
    };
  }

  const renderSettingsContent = value => {
    return (
      <div>
        <Typography className="section-title">Campaign Settings</Typography>
        <Tabs
          value={tabValue}
          fullwidth="true"
          onChange={handleChange}
          className="tabs-container"
        >
          <Tab label="General" {...a11yProps(0)} className="tab-text" />
          <Tab label="Audio Resources" {...a11yProps(1)} className="tab-text" />
          <Tab label="List" {...a11yProps(2)} className="tab-text" />
          <Tab label="QA" {...a11yProps(3)} className="tab-text" />
          <Tab label="Change Log" {...a11yProps(4)} className="tab-text" />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <General {...value} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <AudioResources />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <List />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <QA />
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          <ChangeLog match={match} history={history} />
        </TabPanel>
      </div>
    );
  };

  return (
    <IdentityContext.Consumer>
      {value => {
        return (
          <div>
            <EditHeader
              campaignDetails={value.campaignDetails}
              history={history}
            />
            <Paper square={true} className="mh-normal">
              {renderSettingsContent(value)}
            </Paper>
          </div>
        );
      }}
    </IdentityContext.Consumer>
  );
}

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
      <Box>{children}</Box>
    </Typography>
  );
}
