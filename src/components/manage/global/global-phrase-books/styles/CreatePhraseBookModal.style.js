import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  btnStyle: {
    backgroundColor: "#b6d36b",
    color: "#FFF",
    fontSize: "14px",
    fontWeight: 700,
    height: "40px",
    borderRadius: "3px",
    textTransform: "none",
    paddingLeft: 15,
    paddingRight: 15,
    "&:hover": {
      backgroundColor: "#a6c556"
    }
  },
  underline: {
    "&:before": {
      borderBottom: "1px solid rgba(0,0,0,0.12)"
    },
    "&:after": {
      borderBottom: "2px solid #1394f6"
    },
    "&&&&:hover:not($disabled):before": {
      borderBottom: "1px solid #1194f6 !important"
    }
  }
}));
