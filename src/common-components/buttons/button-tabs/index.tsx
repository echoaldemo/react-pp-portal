import React, { ChangeEvent } from "react";
import { Tabs, Tab } from "@material-ui/core";
import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles
} from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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

const theme = createMuiTheme({
  shape: {
    borderRadius: 0
  },
  overrides: {
    MuiTabs: {
      root: {
        minHeight: "initial"
      }
    }
  }
});

const useStyles = makeStyles(theme => ({
  Tabs: {
    color: "#919ca7",
    backgroundColor: "#eeeeee",
    borderRadius: "3px",
    width: "fit-content",
    "& span": {
      maxHeight: 40,
      marginBottom: 7,
      fontWeight: 600
    },
    "& div": {
      maxHeight: 40
    },
    "& button": {
      padding: 0,
      maxHeight: 40
    }
  },
  indicator: {
    backgroundColor: "transparent"
  },
  activeTab: {
    backgroundColor: "#f4a429",
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
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
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
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
  }
}));

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
