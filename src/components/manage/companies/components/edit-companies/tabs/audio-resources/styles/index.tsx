import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  headerText: {
    fontSize: 16,
    color: "#777",
    marginLeft: 20
  },
  headerContainer: {
    width: "auto",
    height: 70,
    borderRadius: 3,
    backgroundColor: "#fafafa",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerStyle: {
    margin: "20px 27px 37px 25px"
  },
  headerButtonStyle: {
    outline: "none",
    border: "none",
    width: 202,
    height: 40,
    borderRadius: 3,
    backgroundColor: "#b6d36b",
    textAlign: "center",
    marginRight: 15,
    cursor: "pointer"
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#ffffff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  lineStyle: { color: "#444851 !important" },
  cancelText: {
    fontSize: 14,
    fontWeight: 600,
    color: "#444851"
  },
  popItem: {
    height: 50,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&&:hover": {
      opacity: 0.8
    }
  }
});

const uploadTheme = createMuiTheme({
  shape: {
    borderRadius: 0
  },
  palette: {
    primary: { main: "#1194f6" }
  },
  overrides: {
    MuiCheckbox: {
      root: {
        color: "#dddddd"
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
      track: {
        backgroundColor: "#f1f1f1 !important"
      }
    }
  }
});

const uploadStyles = makeStyles({
  text: {
    width: 43,
    height: 16,
    fontSize: 16,
    fontWeight: 500
  },
  textWhite: {
    color: "#ffffff"
  },
  textDark: {
    color: "#444851"
  },
  textFade: {
    color: "#777777"
  },
  active: {
    borderBottom: "none !important",
    padding: "0 !important"
  },
  hidden: {
    display: "none !important"
  },
  saveAudioBtn: {
    outline: "none",
    border: "none",
    width: 165,
    height: 40,
    borderRadius: 3,
    backgroundColor: "#b6d36b",
    cursor: "pointer"
  },
  labelStyle: {
    margin: "24px 0 7px 0",
    display: "flex",
    flexDirection: "row",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "space-between"
  },
  saveText: {
    fontSize: 14,
    fontWeight: 500,
    textAlign: "center",
    color: "#ffffff"
  },
  saveBtn: {
    marginTop: 18,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  uploadTag: {
    fontSize: 16,
    color: "#777777"
  },
  tagText: {
    fontSize: 13,
    color: "#777777"
  },
  textPrimary: {
    color: "#1194f6"
  },
  textDarken: {
    color: "#444851"
  },
  errorText: {
    fontSize: 14,
    color: "red"
  },
  error: {
    backgroundColor: red[600]
  },
  success: {
    backgroundColor: green[600]
  }
});

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

export { useStyles, uploadStyles, uploadTheme, LightTooltip };
