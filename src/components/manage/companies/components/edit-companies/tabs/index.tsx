import React from "react";
import { Tab, Typography, Box } from "@material-ui/core";
import { tabs as useStyles, CustomTabs } from "./styles";
//Panel Components

import CompanySettings from "./settings";
import PhraseBooks from "./phrase-books";
import RapidResponseTests from "./rapid-response-tests";
import RapidResponseSegments from "./rapid-response-segments";

import AudioResources from "./audio-resources";

interface ITabPanel {
  children?: React.ReactNode;
  value: number;
  index: number;
  className: any;
}

interface Props {
  companyData: any;
  params: any;
  companySettingsData: any;
  handleUpdateHeader: Function;
}

const TabPanel = (props: ITabPanel) => {
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
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
};

const TabComponent: React.FC<Props> = ({
  companyData,
  params,
  companySettingsData,
  handleUpdateHeader
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const renderTabs = () => {
    const tabs = [
      "SETTINGS",
      "PHRASE BOOKS",
      "RAPID RESPONSE TESTS",
      "RAPID RESPONSE SEGMENTS",
      "AUDIO RESOURCES"
    ];
    return tabs.map((tab, index) => {
      return (
        <Tab
          disableFocusRipple={true}
          label={tab}
          {...a11yProps(index)}
          className={classes.tab}
        />
      );
    });
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
          {renderTabs()}
        </CustomTabs>
      </div>
      <TabPanel value={value} index={0} className={classes.panelContainer}>
        <CompanySettings
          params={params}
          handleUpdateHeader={handleUpdateHeader}
        />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.panelContainer}>
        <PhraseBooks company={companyData} />
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.panelContainer}>
        <RapidResponseTests company={companyData} />
      </TabPanel>
      <TabPanel value={value} index={3} className={classes.panelContainer}>
        <RapidResponseSegments company={companyData} />
      </TabPanel>
      <TabPanel value={value} index={4} className={classes.panelContainer}>
        <AudioResources company={companyData} />
      </TabPanel>
    </div>
  );
};
export { TabComponent };
