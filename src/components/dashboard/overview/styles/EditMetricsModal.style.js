import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1194f6"
    }
  }
});

export const useStyles = makeStyles(theme => ({
  navBar: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    margin: "10px"
  },
  Tabs: {
    color: "#919ca7",
    backgroundColor: "#eeeeee",
    borderRadius: "3px",
    width: "58.5%",
    "@media (max-width: 599px)": {
      width: "100%"
    },
    "@media (max-width: 1024px  )": {
      width: "100%"
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
  },
  SelectText: {
    fontFamily: "Roboto",
    fontSize: "16px",
    fontHeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#1194f6",
    cursor: "pointer"
  },
  checkboxCustom: {
    width: "22px",
    height: "22px",
    borderRadius: "1px"
  },
  unCheckedText: {
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#777777",
    cursor: "pointer",
    margin: "10px"
  },
  CheckedText: {
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#444851",
    cursor: "pointer",
    margin: "10px"
  },
  copyText: {
    fontFamily: "Roboto",
    fontSize: "18px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#444851"
  }
}));
