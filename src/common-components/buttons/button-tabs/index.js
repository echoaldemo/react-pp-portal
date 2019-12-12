import React from "react";
import { Grid, Tabs, Tab } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

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

const useStyles = makeStyles(() => ({
  Tabs: {
    color: "#919ca7",
    backgroundColor: "#eeeeee",
    borderRadius: "3px",
    width: "fit-content",
    "& span": {
      maxHeight: 40,
      marginBottom: 7,
      fontWeight: "600"
    },
    "& div": {
      maxHeight: 40
    },
    "& button": {
      padding: 0,
      maxHeight: 40
    }

    // "@media (max-width: 599px)": {
    //   width: "100%"
    // },
    // "@media (max-width: 1024px  )": {
    //   width: "100%"
    // }
  },
  indicator: {
    backgroundColor: "transparent"
  },
  activeTab: {
    backgroundColor: "#f4a429",
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "500",
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
    fontWeight: "500",
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

export default props => {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <Tabs
        value={0}
        onChange={props.handleChange}
        className={classes.Tabs}
        classes={{
          indicator: classes.indicator
        }}
      >
        {props.tabData.map((tab, i) => (
          <Tab
            key={i}
            component={Link}
            to={tab.path}
            label={tab.label}
            className={tab.value === 0 ? classes.activeTab : classes.notActive}
            style={tab.style ? tab.style : null}
            value={0}
          />
        ))}
      </Tabs>
    </MuiThemeProvider>
  );
};
