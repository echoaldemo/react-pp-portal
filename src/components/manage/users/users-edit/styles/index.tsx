import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, Typography } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#1194f6" }
  },
  overrides: {
    MuiInputLabel: {
      shrink: {
        color: "#bbb"
      }
    },
    MuiSwitch: {
      track: {
        backgroundColor: "#ddd !important"
      }
    },
    MuiInput: {
      underline: {
        "&&&&:before": {
          borderBottom: `2px solid rgba(238, 238, 238, 0.99)`
        },
        "&&&&:hover:not($disabled):before": {
          borderBottom: "2px solid #1194f6"
        },
        "&:after": {
          borderBottom: "2px solid #1194f6"
        }
      }
    },
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "#ffffff"
        }
      }
    },
    MuiListItem: {
      button: {
        "&:hover": {
          backgroundColor: "#ffffff"
        }
      },
      root: {
        "&$selected": {
          backgroundColor: "#ffffff",
          "&&:hover": {
            backgroundColor: "#ffffff"
          },
          "&&:active:after": {
            backgroundColor: "#ffffff"
          }
        }
      }
    }
  }
});

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

const useStyles = makeStyles({
  underline: {
    "&:before": {
      borderBottom: "2px solid rgba(0,0,0,0.12)"
    },
    "&::after": {
      borderBottom: "2px solid #1194f6"
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid rgba(0,0,0,0.12)"
    }
  },
  inputField: {
    fontSize: "1.2rem",
    "&&&&:hover:before": {
      borderBottom: "1px solid rgba(0,0,0,0.1)"
    },
    "&:before": {
      borderBottom: "1px solid rgba(0,0,0,0.1)"
    },
    "&:after": {
      borderBottom: "2px solid #1394f6"
    }
  },
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
    justifyContent: "center",
    marginRight: 15
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
    backgroundColor: "#7c8a97",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8
    }
  },
  activeText: {
    fontSize: 14,
    fontWeight: 600,
    color: "#444851",
    padding: 0
  },
  toggleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 7
  },
  uuidText: {
    fontSize: 14,
    color: "#777"
  },
  fadedLabel: {
    fontSize: 16,
    color: "#bbb"
  },
  changePasswordStyle: {
    color: "#fff",
    outline: "none",
    border: "none",
    width: 164.8,
    height: 40,
    borderRadius: 3,
    backgroundColor: "#7c8a97",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8
    }
  },
  changePasswordTextStyle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#fff"
  },
  dividerStyle: {
    marginTop: 19,
    width: 360,
    height: 2,
    border: "solid 1px rgba(238, 238, 238, 0.99)"
  },
  deleteUserStyle: {
    color: "#fff",
    outline: "none",
    border: "none",
    width: 130,
    height: 40,
    borderRadius: 3,
    backgroundColor: "#ff504d",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8
    }
  },
  cancelText: {
    fontSize: 14,
    fontWeight: 600,
    color: "#444851"
  }
});

export { useStyles, theme, CustomText };
