import React, { useState, useContext } from "react";
import EditHeader from "../EditHeader";
import { TableLoader } from "common-components";
import { Paper, Typography, Tabs, Tab, Box } from "@material-ui/core";
import AddNewPitch from "./AddNewPitch";
import { IdentityContext } from "contexts/IdentityProvider";
import {
  Details,
  OptionGroups,
  Panels,
  PhraseBooks,
  RapidResponseTests,
  Segments,
  Variables,
  XML,
  Voices
} from "./components";
import "./Pitch.css";
const tabnames = [
  "DETAILS",
  "SEGMENTS",
  "VARIABLES",
  "VOICES",
  "XML",
  "PANELS",
  "OPTION GROUPS",
  "PHRASE BOOK",
  "RAPID RESPONSE TESTS"
];

<<<<<<< HEAD
export default function PitchSection({ history }) {
=======
export default function PitchSection({ history, match }) {
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
  const { state } = useContext(IdentityContext);
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

  const tabPanels = [
    Details,
    Segments,
    Variables,
    Voices,
    XML,
    Panels,
    OptionGroups,
    PhraseBooks,
    RapidResponseTests
  ];

  const renderPitchContent = () => {
    return (
      <div>
        <Typography className="section-title">Pitch Settings</Typography>
        <Tabs
          value={tabValue}
          fullwidth="true"
          onChange={handleChange}
          className="tabs-container"
        >
          {tabnames.map((name, i) => {
            return (
              <Tab
                label={name}
                key={i}
                {...a11yProps(i)}
                className="tab-text"
              />
            );
          })}
        </Tabs>

        {tabPanels.map((item, i) => {
          if (i === 4) {
            return (
              <TabPanel key={i} value={tabValue} index={i}>
                <XML />
              </TabPanel>
            );
          } else
            return (
              <TabPanel key={i} value={tabValue} index={i}>
                {item}
              </TabPanel>
            );
        })}
      </div>
    );
  };

  return (
    <div>
<<<<<<< HEAD
      <EditHeader campaignDetails={state.campaignDetails} history={history} />
=======
      <EditHeader
        campaignDetails={state.campaignDetails}
        match={match}
        history={history}
      />
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
      <Paper square={true} className="mh-normal">
        {state.pitch ? (
          <React.Fragment>
            {state.loading ? <TableLoader /> : renderPitchContent()}
          </React.Fragment>
        ) : (
          <AddNewPitch />
        )}
      </Paper>
    </div>
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
