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
interface CustomTextProps {
  color: string;
  size: string;
  weight?: number;
  children: React.ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({
  color,
  size,
  weight,
  children
}) => {
  const classes: any = styles();
  const styled = {
    color: `${color}`,
    fontSize: `${size}`,
    fontWeight: `${weight}`
  } as React.CSSProperties;
  return (
    <Typography className={classes.text} style={styled}>
      {children}
    </Typography>
  );
};

CustomText.defaultProps = {
  color: "black",
  size: "12px",
  weight: 100
} as Partial<CustomTextProps>;

export { CustomText };
