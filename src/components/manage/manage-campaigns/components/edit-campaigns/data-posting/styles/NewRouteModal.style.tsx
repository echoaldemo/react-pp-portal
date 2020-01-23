import { createMuiTheme } from "@material-ui/core";

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
        "&&&&:hover:not(.Mui-disabled):before": {
          borderBottom: "2px solid rgba(0,0,0,0.12)"
        }
      }
    }
  }
});
