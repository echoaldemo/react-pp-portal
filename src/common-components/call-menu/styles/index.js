import { makeStyles } from "@material-ui/styles";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";

export const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "transparent"
  },
  avatar: {
    width: 45,
    height: 45
  },
  paper: {
    boxShadow:
      "0px 11px 15px -7px rgba(0,0,0,0.05), 0px 24px 38px 3px rgba(0,0,0,0.03), 0px 9px 46px 8px rgba(0,0,0,0.03)"
  },
  active: {
    backgroundColor: "#7c8a97",
    padding: 7,
    "&:hover": {
      backgroundColor: "#7c8a97"
    }
  },
  inactive: {
    backgroundColor: "none",
    border: "1px solid #eeeeee",
    padding: 6,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  activeIcon: {
    color: "#ffffff"
  },
  inactiveIcon: {
    color: "#eeeeee"
  },
  phoneintalk: {
    width: 45,
    height: 45,
    marginTop: "5px",
    color: "#1194f6"
  },
  calltimer: {
    width: "102px",
    height: "45px",
    border: "1px solid #eeeeee",
    fontSize: "18px"
  }
}));

export const CallMenuPaper = styled(Paper)`
  max-width: 605px;
  width: 605px;
  padding: 20px;
  position: fixed;
  bottom: 80px;
  max-height: 85px;
`;
