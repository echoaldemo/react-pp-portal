import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import Loader from "react-loader-spinner";
import CircularProgress from "@material-ui/core/CircularProgress"
const useStyles = makeStyles(theme => ({
  progress: {
    marginLeft: "35%",
    marginTop: "8%",
    color: "#1194f6",
    width: 45, 
    height: 45,
    "@media(min-width:1000px)": {
      marginLeft: "50%",
      marginTop: "3%"
    },
    "@media(min-width:500px)": {
      marginLeft: "50%",
      marginTop: "3%"
    }
  }
}));
export default function Loaderr() {
  const classes = useStyles();
  return <CircularProgress className={classes.progress} /> 
  // <Loader type="Circles" color="#00BFFF" className={classes.progress} />
  ;
}
