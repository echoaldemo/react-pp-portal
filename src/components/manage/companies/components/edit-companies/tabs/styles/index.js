import { Tabs, Switch, makeStyles } from "@material-ui/core";
import styled from "styled-components";

export const CustomTabs = styled(Tabs)`
  background-color: "#FFF" !important;
`;

export const CustomSwitch = styled(Switch)`
  .MuiSwitch-thumb {
    color: #1194f6 !important;
  }
  .MuiSwitch-track {
    color: #f1f1f1 !important;
    background-color: #999 !important;
  }
`;

export const tabs = makeStyles(() => ({
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

export const settings = makeStyles(() => ({
  container: {
    marginTop: 0
  },
  formContainer: {
    width: 508,
    margin: 15
  },
  inputContainer: {
    paddingBottom: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    textAlign: "left",
    color: "#444851"
  },
  inputLabel: {
    color: "#bbbbbb",
    fontSize: 16,
    fontWeight: 600
  },
  button: {
    minHeight: "36px",
    minWidth: "48%",
    fontWeight: 600,
    cursor: "pointer",
    borderRadius: "2px",
    border: 0,
    outline: "none"
  },
  input: {
    fontSize: 18,
    color: "#444851"
  },
  textField: {
    "&:before": {
      borderBottom: "1px solid rgba(0,0,0,0.12)"
    },
    "&:after": {
      borderBottom: "2px solid #1394f6"
    },
    "&&&&:hover:not($disabled):before": {
      borderBottom: "1px solid #1194f6"
    }
  },
  shrink: {
    transform: "translate(0,1.5px) scale(1)"
  },
  focused: {
    color: "#1194f6 !important"
  },
  delBtn: {
    textTransform: "capitalize",
    fontSize: 16,
    fontWeight: 600,
    width: 130,
    height: 40,
    backgroundColor: "rgba(255,55,51,0.87)",
    color: "rgba(255,255,255,0.87)",
    "&:hover": {
      backgroundColor: "rgb(255,55,51)"
    }
  },
  collapseWrapper: {
    width: "100%"
  }
}));
