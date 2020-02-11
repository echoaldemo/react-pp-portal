import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import styled from "styled-components";

const TimeContainer = styled.div`
  width: inherit;
  margin: 0 70px 0 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 22px;
`;

const TimeText = styled(Typography)`
  font-size: 14px !important;
  color: #7c8a97;
`;

const theme = createMuiTheme({});

const TimeLine = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <TimeContainer>
        {[
          "6:00 AM",
          "9:00 AM",
          "12:00 PM",
          "3:00 PM",
          "6:00 PM",
          "9:00 PM"
        ].map((time, i) => {
          return <TimeText key={i}>{time}</TimeText>;
        })}
      </TimeContainer>
    </MuiThemeProvider>
  );
};

export default TimeLine;
