import React from "react";
import { Pause } from "@material-ui/icons";
import { Typography } from "@material-ui/core";

import styled from "styled-components";

const PauseContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderButton = styled.button`
  margin-left: 29px;
  width: 140px;
  height: 40px;
  border-radius: 2px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.23);
  background-color: #7c8a98;
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const ButtonText = styled(Typography)`
  height: 16px;
  font-size: 14px !important;
  font-weight: 500 !important;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TimeText = styled(Typography)`
  font-family: Roboto;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #444851;
`;

export default props => {
  function renderTime() {
    return (
      <TimeContainer>
        <TimeText
          style={{
            marginRight: "6px"
          }}
        >
          Last Sync:
        </TimeText>

        <TimeText>{props.time}</TimeText>
      </TimeContainer>
    );
  }

  return (
    <PauseContainer>
      {renderTime()}
      <HeaderButton style={props.style} onClick={() => props.onClick()}>
        <ButtonText>
          {" "}
          <Pause
            style={{
              fontSize: "18px",
              color: "#fff",
              marginRight: "3px"
            }}
          />{" "}
          <strong
            style={{
              fontSize: "14px"
            }}
          >
            PAUSE
          </strong>
        </ButtonText>
      </HeaderButton>
    </PauseContainer>
  );
};
