import { createMuiTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  container: {
    width: 420
  },
  content: {
    boxSizing: "border-box",
    margin: "0 auto",
    width: "100%"
  },
  title: {
    backgroundColor: "#5f7d98",
    color: "#ffffff",
    maxWidth: "100%"
  },
  p: {
    margin: "0 0 16px 0",
    fontSize: 18,
    fontWeight: 600,
    color: "#444851"
  },
  focused: {
    color: "#1194f6 !important"
  },
  underline: {
    "&:before": {
      borderBottom: "2px solid rgba(0,0,0,0.12)"
    },
    "&::after": {
      borderBottom: "2px solid #1194f6"
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid rgba(0,0,0,0.12)"
    }
  },
  note: {
    fontSize: 14,
    color: "#bbbbbb",
    marginTop: 10
  },
  err: {
    color: "#f44336 !important"
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
  inputLabel: {
    color: "#bbbbbb"
  },
  saveBtn: {
    fontSize: 14,
    width: 165,
    minHeight: 40,
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    borderRadius: 3,
    backgroundColor: "#b6d36b",
    outline: "none",
    border: "none",
    color: "#ffffff",
    textTransform: "uppercase",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#a6c556"
    }
  },
  delBtn: {
    fontSize: 14,
    width: 165,
    minHeight: 40,
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    borderRadius: 3,
    backgroundColor: "#ff504d",
    outline: "none",
    border: "none",
    color: "#ffffff",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f5423f"
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  span: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    minHeight: 64
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
  svgColor: {
    color: "rgba(0,0,0,0.6)"
  },
  grayText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    margin: "20px 0",
    color: "rgba(0,0,0,0.6)"
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
  }
}));

export const materialTheme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: "solid 2px rgba(238, 238, 238, 0.99)"
        },
        "&::after": {
          borderBottom: "solid 2px rgba(238, 238, 238, 0.99)"
        },
        "&:hover:not(.Mui-disabled):before": {
          borderBottom: "solid 2px rgba(238, 238, 238, 0.99)"
        }
      }
    },
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "none"
        }
      }
    },
    MuiListItem: {
      button: {
        "&:hover": {
          backgroundColor: "#ffffff"
        }
      },
      root: {
        "&$selected": {
          color: "rgb(95,125,152)",
          backgroundColor: "#ffffff",
          "&&:hover": {
            backgroundColor: "#ffffff"
          },
          "&&:active:after": {
            backgroundColor: "#ffffff"
          }
        }
      }
    },
    MuiSwitch: {
      colorPrimary: {
        color: "#bbbbbb",
        "&$checked": {
          color: "#1194f6",
          "&.MuiSwitch-track": {
            backgroundColor: "#eeeeee"
          }
        }
      },
      track: {
        backgroundColor: "#bbbbbb !important"
      }
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: "#1194f6"
      }
    }
  }
});
