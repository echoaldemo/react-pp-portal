import React from "react";
import { Tabs, Tab, Typography, Box, makeStyles } from "@material-ui/core";

//Panel Components
import styled from "styled-components";
import ChartTopComponent from "./ChartTopComponent";
import Data from "./Data";

const CustomTabs = styled(Tabs)`
  background-color: "#FFF" !important;
`;

interface Props {
  children: React.ReactNode;
  style?: any;
  index: number;
  value: number;
  className?: any;
}

function TabPanel(props: Props) {
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

function a11yProps(index: number) {
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

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
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
