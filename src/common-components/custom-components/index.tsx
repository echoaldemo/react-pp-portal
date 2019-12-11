import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { Tooltip, withStyles } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#1194f6" }
  },
  overrides: {
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: `2px solid rgba(238, 238, 238, 0.99)`
        },
        "&:hover:not($disabled):before": {
          borderBottom: "2px solid #1194f6"
        },
        "&:after": {
          borderBottom: "2px solid #1194f6"
        }
      }
    }
  }
});

const styles = (theme: any) =>
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

interface CustomTextProps {
  color: string;
  size: string;
  weight?: number;
}

const CustomText: React.SFC<CustomTextProps> = props => {
  const classes: any = styles({});
  const styled = {
    color: `var(--${props.color})`,
    fontSize: `${props.size}`,
    fontWeight: `${props.weight}`
  } as React.CSSProperties;
  return (
    <Typography className={classes.text} style={styled}>
      {props.children}
    </Typography>
  );
};

CustomText.defaultProps = {
  color: "black",
  size: "12px",
  weight: 100
} as Partial<CustomTextProps>;

export { CustomText };
