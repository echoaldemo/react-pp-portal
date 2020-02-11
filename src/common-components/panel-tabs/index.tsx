import React from "react";
import { Box, Tab, Typography } from "@material-ui/core";
import { Cont, TabsStyled } from "./styles";

interface PanelTabsProps {
  labels: Array<string>;
  tab: number;
  setTab: Function;
}

const PanelTabs: React.FC<PanelTabsProps> = ({ labels, tab, setTab }) => {
  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Cont>
      <TabsStyled value={tab} onChange={handleChange}>
        {labels.map((label, i) => (
          <Tab label={label} key={i} />
        ))}
      </TabsStyled>
    </Cont>
  );
};

interface PanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

const Panel: React.FC<PanelProps> = ({ children, value, index, ...other }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box style={{ padding: 0 }} p={3}>
        {children}
      </Box>
    </Typography>
  );
};

PanelTabs.defaultProps = {
  labels: [],
  tab: 0
} as Partial<PanelTabsProps>;

Panel.defaultProps = {
  value: 0,
  index: 0
} as Partial<PanelProps>;

export { PanelTabs, Panel };
