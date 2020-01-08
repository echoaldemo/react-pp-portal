import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  image: {
    width: 54,
    height: 54,
    borderRadius: "50%"
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    boxShadow: "0px 0px 2px 1px #bbbbbb",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  impersonateBtn: {
    color: "#fff",
    outline: "none",
    border: "none",
    fontSize: 16,
    fontWeight: 500,
    width: 128.8,
    height: 40,
    borderRadius: 3,
    backgroundColor: "#7c8a97"
  }
});

export { useStyles };
