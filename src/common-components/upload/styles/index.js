import styled from "styled-components";
import { createMuiTheme, makeStyles, Typography } from "@material-ui/core/";

export const LabelText = styled(Typography)`
  font-size: 14px !important;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #999999;
`;

export const HelperText = styled(Typography)`
  font-size: 12px !important;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #999999;
  margin-top: 8px !important;
`;

export const theme = createMuiTheme({
  shape: {
    borderRadius: 0
  },
  palette: {
    primary: { main: "#1194f6" }
  },
  overrides: {
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

export const useStyles = makeStyles({
  hidden: {
    display: "none !important"
  }
});
