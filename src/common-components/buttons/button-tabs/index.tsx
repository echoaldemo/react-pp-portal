import React from "react";
import { Tabs, Tab, MuiThemeProvider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { theme, buttonTabStyle as useStyles } from "../styles";
import { any } from "prop-types";
/**
 * ==============================================================================
 * <ButtonTabs />
 * ------------------------------------------------------------------------------
 * @param {Function}   handleChange   Triggers Change event
 * @param {Array}      tabData        Contains Data of Tabs (label,value,path,style)
 * @return {ReactElement}
 * ==============================================================================
 */

interface TabContent {
  label: string;
  value: number;
  path: string;
  style?: React.CSSProperties;
}
interface Props {
  handleChange: (e: React.ChangeEvent<{}>) => void;
  tabData: Array<TabContent>;
}

const defaultProps = {
  handleChange: () => console.log("Handle Change Event"),
  tabData: [
    {
      label: "DID POOLS",
      value: 1,
      path: "/",
      style: undefined
    },
    { label: "SEARCH DIDS", value: 0, path: "/", style: undefined }
  ]
};

const ButtonTabs: React.FC<Props> = ({ handleChange, tabData }) => {
  const classes: any = useStyles(theme);
  return (
    <MuiThemeProvider theme={theme}>
      <Tabs
        value={0}
        onChange={handleChange}
        className={classes.Tabs}
        classes={{
          indicator: classes.indicator
        }}
      >
        {tabData.map(({ path, label, value, style }: TabContent, i: number) => (
          <Tab
            component={Link}
            key={i}
            to={path}
            label={label}
            className={value === 0 ? classes.activeTab : classes.notActive}
            style={style}
            value={0}
          />
        ))}
      </Tabs>
    </MuiThemeProvider>
  );
};

ButtonTabs.defaultProps = defaultProps as Partial<Props>;

export default ButtonTabs;
