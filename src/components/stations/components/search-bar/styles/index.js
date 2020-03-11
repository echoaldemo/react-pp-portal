import { makeStyles, createMuiTheme } from "@material-ui/core";
export const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        borderBottom: "none"
      }
    }
  }
});

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  inputField: {
    fontSize: "1rem",
    "&&&&:hover:before": {
      borderBottom: "1px solid #1194f6"
    },
    "&:before": {
      borderBottom: "1px solid rgba(0,0,0,0.1)"
    },
    "&:after": {
      borderBottom: "2px solid #1394f6"
    }
  }
}));
