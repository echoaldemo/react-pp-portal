import React from "react";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./Styles/ActionButton.styles";

const useStyles = makeStyles(styles);

export default function ActionButton(props) {
  const classes = useStyles();
  return (
    <button
      data-cy-add-new-campaign-btn
      className={classes.btn}
      onClick={() => props.handleClick()}
    >
      <Icon style={{ color: "#fff" }}>add</Icon>
      <span className={classes.addCamp}>{props.text}</span>
    </button>
  );
}
