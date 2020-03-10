import React from "react";
import { Typography } from "@material-ui/core";
const CustomText = ({
  children,
  color,
  size,
  weight
}: {
  children?: any;
  color?: any;
  size?: any;
  weight?: any;
}) => {
  let defaultStyle = {
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
  } as React.CSSProperties;

  let dynamicStyle = {
    ...defaultStyle
  };

  if (color) Object.assign(defaultStyle, { color });
  if (size) Object.assign(defaultStyle, { fontSize: size });
  if (weight) Object.assign(defaultStyle, { fontWeight: weight });

  return <Typography style={dynamicStyle}>{children}</Typography>;
};

export { CustomText };
