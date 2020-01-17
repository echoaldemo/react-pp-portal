import React from "react";

// import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { makeStyles } from "@material-ui/styles";

import styled from "styled-components";

import { DialerHeader, DialerTable } from "./components";

const LDContainer = styled.div``;

// const theme = createMuiTheme({});

const useStyles = makeStyles({});

const LiveDialer = props => {
  let classes = useStyles();
  return (
    //<MuiThemeProvider theme={theme}>
    <LDContainer>
      <DialerHeader {...props} />
      <DialerTable />
    </LDContainer>
    //</MuiThemeProvider>
  );
};

export default LiveDialer;
