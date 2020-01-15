import { makeStyles, createMuiTheme } from "@material-ui/core";

export const materialTheme = createMuiTheme({
  overrides: {
    MuiInput: {
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
      }
    }
  }
});

export const useStyles = makeStyles(() => ({
  formContainer: {
    width: 800,
    padding: 15,
    marginTop: 15
  },
  textField: {
    paddingBottom: 40
  },
  label: {
    fontWeight: 600,
    fontSize: 20
  },
  labelNormal: {
    fontWeight: 500,
    fontSize: 20
  },
  btnFormControl: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 15
  },
  btnSaveFormControl: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15
  },
  btn: {
    marginLeft: 10,
    marginRight: 10
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
  }
}));
