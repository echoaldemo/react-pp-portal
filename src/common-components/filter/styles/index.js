import { Button } from "@material-ui/core";
import styled from "styled-components";

export const ApplyBtn = styled(Button)`
  text-transform: none !important;
`;

export const useStyles = {
  root: {
    display: "flex"
  },
  inputField: {
    fontSize: "1rem",
    "&:focussed": {
      color: "red"
    },
    "&:before": {
      borderBottom: "1px solid rgba(0,0,0,0.1)"
    },
    "&:after": {
      borderBottom: "2px solid #1394f6"
    }
  }
};
