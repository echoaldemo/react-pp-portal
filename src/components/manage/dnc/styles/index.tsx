import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: 5
  },
  formContainer: { paddingBottom: 20 },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 15
  },
  labelRoot: {
    color: "#777777"
  },
  checkBoxRoot: {
    fontSize: "25px",
    marginTop: "-3px",
    color: "#bbbbbb"
  },
  uploadFileBtn: {
    display: "flex",
    justifyContent: "space-between",
    textTransform: "none",
    color: "#777777",
    fontSize: "16px",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  chooseFile: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#1194f6",
    minWidth: "130px",
    fontSize: "16px"
  },
  uploadIcon: {
    margin: 1
  },
  labelCSVFile: {
    fontFamily: "Roboto",
    fontSize: "13px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#999999"
  },
  tabContainer: {
    paddingBottom: "30px",
    display: "flex",
    justifyContent: "center"
  },
  tabs: {
    color: "#919ca7",
    backgroundColor: "#eeeeee",
    borderRadius: "5px",
    width: "90%",
    height: "40px",
    minHeight: "40px"
  },
  indicator: {
    backgroundColor: "transparent !important"
  },
  activeTab: {
    backgroundColor: "#1194f6",
    color: "#fff"
  },
  notActive: {
    fontSize: 13
  },
  wrapper: {
    marginTop: "-7px"
  },
  divider: {
    height: "2px",
    margin: "0",
    backgroundColor: "rgba(238, 238, 238, 0.99)"
  },
  helperText: {
    fontFamily: "Roboto",
    fontSize: "11px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#999999",
    marginTop: "5px"
  },
  iconUpload: {
    fontSize: "19px",
    position: "absolute",
    marginTop: "1px",
    marginLeft: "25px"
  }
});

export { useStyles };
