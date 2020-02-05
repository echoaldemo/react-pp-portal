import React from "react";
import { TextField, Typography, makeStyles } from "@material-ui/core";
import styled from "styled-components";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
// import { Tooltip, withStyles } from "@material-ui/core";

// const LightTooltip = withStyles(theme => ({
//   tooltip: {
//     backgroundColor: theme.palette.common.white,
//     color: 'rgba(0, 0, 0, 0.87)',
//     boxShadow: theme.shadows[1],
//     fontSize: 11
//   }
// }))(Tooltip)

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

const styles = theme =>
  makeStyles({
    errorText: {
      margin: 0,
      padding: 0,
      marginTop: "-1rem",
      color: "red"
    },
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

// const Copy = props => {
//   return  <Icon
//           path={mdiContentCopy}
//           title="Copy"
//           size={1}
//           rotate={360}
//
//         />;
// };

const CustomInput = props => {
  const classes = styles();
  return (
    <MuiThemeProvider theme={theme}>
      <TextField
        style={{ width: `${props.width}` }}
        label={props.label}
        type={props.type ? props.type : "text"}
        onInput={props.onInput}
        onBlur={props.onBlur}
        error={props.error}
        value={props.value}
        helperText={
          props.error && (
            <span className={classes.errorText}>{props.errorText}</span>
          )
        }
      />
    </MuiThemeProvider>
  );
};

const CustomButton = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  border: 0;
  outline: none;
  color: #444851;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

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

export { CustomInput, CustomButton, CustomText };
