import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  container: {
    margin: "20px 0"
  },
  formContainer: {
    maxWidth: "95%",
    margin: "36px auto"
  },
  inputContainer: {
    paddingBottom: 0
  },
  span: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    minHeight: 64
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
  savebutton: {
    minHeight: "36px",
    width: "165px",
    fontWeight: 600,
    backgroundColor: "#b6d36b",
    cursor: "pointer",
    borderRadius: "2px",
    border: 0,
    outline: "none",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#a6c556"
    },
    marginRight: 15,
    "&:disabled": {
      color: "rgba(0,0,0,0.38)",
      backgroundColor: "rgba(0,0,0,0.12)"
    }
  },
  cancelbutton: {
    minHeight: "36px",
    width: "165px",
    fontWeight: 600,
    backgroundColor: "#eeeeee",
    cursor: "pointer",
    borderRadius: "2px",
    border: 0,
    outline: "none",
    color: "#444851",
    "&:hover": {
      backgroundColor: "#bbbbbb"
    },
    marginLeft: 15
  },
  input: {
    fontSize: 18,
    color: "#444851"
  },
  textField: {
    "&:before": {
      borderBottom: "2px solid rgba(0,0,0,0.12)"
    },
    "&::after": {
      borderBottom: "2px solid rgba(0,0,0,0.12)"
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid rgba(0,0,0,0.12)"
    }
  },
  shrink: {
    transform: "translate(0,1.5px) scale(1)",
    "&.Mui-error": {
      color: "#f44336 !important"
    }
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

export const dialogStyles = makeStyles(() => ({
  title: {
    backgroundColor: "rgb(95,125,152)",
    color: "rgba(255,255,255,0.87)"
  },
  span: {
    fontSize: 20,
    fontWeight: "bold",
    width: "95%",
    textAlign: "center"
  },
  grayText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    margin: "20px 0",
    color: "rgba(0,0,0,0.6)"
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    margin: "20px 0"
  },
  p: {
    fontSize: 16,
    margin: "20px auto 0 auto",
    color: "rgba(0,0,0,0.6)",
    maxWidth: "90%"
  },
  inputcon: {
    maxWidth: "90%",
    margin: "0 auto"
  },
  input: {
    padding: 2,
    margin: "18px auto"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  buttonValid: {
    minWidth: 88,
    minHeight: 36,
    borderRadius: 2,
    width: 165,
    color: "rgba(255,255,255,0.87)",
    fontSize: 14,
    fontWeight: 500,
    backgroundColor: "rgba(255,80,77,0.87)",
    "&:hover": {
      backgroundColor: "rgb(255,80,77)"
    }
  },
  buttonClose: {
    minWidth: 88,
    minHeight: 36,
    borderRadius: 2,
    width: 165,
    color: "rgba(255,255,255,0.87)",
    fontSize: 14,
    fontWeight: 500,
    backgroundColor: "rgb(182,211,107)",
    "&:hover": {
      backgroundColor: "rgba(182,211,107,0.7)"
    }
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px 0",
    minWidth: 350,
    fontSize: 18,
    color: "rgba(0,0,0,0.6)",
    fontWeight: "bold"
  },
  cross: {
    cursor: "pointer"
  },
  btnValidDisabled: {
    color: "rgba(255,255,255,0.87) !important"
  },
  svgColor: {
    color: "rgba(0,0,0,0.6)"
  }
}));
