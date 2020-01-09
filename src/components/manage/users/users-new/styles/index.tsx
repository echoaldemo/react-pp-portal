import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import styled from "styled-components";
import { createMuiTheme, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";

const DatePicker = styled(KeyboardDatePicker)`
  .MuiInput-root.MuiInput-underline {
    &::after {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
    &::before {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
    &:hover:not(.Mui-disabled):before {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
  }
  .MuiInputLabel-root.Mui-focused {
    color: #1194f6 !important;
  }
  .MuiPickersToolbar-toolbar {
    background-color: #1194f6 !important;
  }
  .MuiButton-textPrimary-874 {
    color: red !important;
  }
  .MuiInput-input {
    color: #444851 !important;
    font-size: 16px !important;
  }
`;

const overrides = {
  overrides: {
    MuiButton: {
      label: {
        color: "#1194F6",
        fontWeight: 600,
        fontFamily: "Roboto"
      }
    },
    MuiInputLabel: {
      root: {
        "&$focused": {
          color: "#1194f6"
        }
      }
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#5f7d98"
      }
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      }
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: "#5f7d98",
        "&:hover": {
          backgroundColor: "#5f7d98"
        }
      },
      dayDisabled: {
        color: lightBlue["100"]
      }
    }
  }
};

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

const materialTheme = createMuiTheme({
  ...overrides
});

const useStyles = makeStyles((theme) => ({
  container: {
    width: 420
  },
  content: {
    boxSizing: "border-box",
    margin: "0 auto",
    maxWidth: "100%"
  },
  title: {
    backgroundColor: "rgb(95,125,152)",
    color: "#ffffff",
    maxWidth: "100%"
  },
  p: {
    margin: "0 0 16px 0",
    fontSize: 18,
    fontWeight: 600,
    color: "#444851"
  },
  focused: {
    color: "#1194f6 !important"
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
  note: {
    fontSize: 14,
    color: "#bbbbbb",
    marginTop: 10
  },

  err: {
    color: "#f44336 !important"
  },
  noUnderline: {
    "&:before": {
      borderBottom: "none"
    },
    "&::after": {
      borderBottom: "none"
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "none"
    }
  }
}));

const CText = styled(Typography)`
  width: 36;
  height: 16px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: #444851;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;

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

const DTag = styled(Typography)`
  font-size: 14px !important;
  font-weight: bolder !important;
  color: #777777 !important;
`;

const TitleTag = styled(Typography)`
  font-size: 18px !important;
  font-weight: 500 !important;
  color: #444851 !important;
  margin-top: 19px !important;
`;

const TTag = ({ children }: { children: any }) => {
  return (
    <>
      <Grid item xs={12}>
        <TitleTag>{children}</TitleTag>
      </Grid>
    </>
  );
};

const StepContent = styled.div`
  min-width: auto;
  max-width: 372px;
  min-height: 320px;
  max-height: 320px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export {
  DatePicker,
  useStyles,
  materialTheme,
  theme,
  CustomText,
  DTag,
  TTag as TitleTag,
  StepContent
};
