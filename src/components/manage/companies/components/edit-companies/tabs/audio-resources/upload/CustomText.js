import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const styles = () =>
  makeStyles({
    text: {
      width: "36px",
      height: "16px",
      fontSize: "14px",
      fontWeight: 500,
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
      textAlign: "center",
      color: "#444851"
    }
  });

const CustomText = props => {
  const classes = styles();
  return (
    <Typography
      className={classes.text}
      style={{
        color: `var(--${props.color})`,
        fontSize: `${props.size}`,
        fontWeight: `${props.weight}`
      }}
    >
      {props.children}
    </Typography>
  );
};

export { CustomText };
