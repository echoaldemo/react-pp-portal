import React, { useState } from "react";
import styled from "styled-components";
import { Close } from "@material-ui/icons";
import { TextField, InputAdornment } from "@material-ui/core";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  width: 420px;
  min-height: 420px;
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 420px;
  height: 60px;
  background-color: #5f7d98;
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  padding: 0 20px;
  box-sizing: border-box;
`;
const CenterText = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-left: 20px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;
const CloseIcon = styled(Close)`
  cursor: pointer;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 34px 27px 34px;
`;

const BtnCont = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 27px;
`;

const CloseBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  cursor: pointer;
  cursor: pointer;
  border: none;
  outline: none;
`;
const CloseText = styled.span`
  width: 54px;
  height: 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #444851;
  text-transform: uppercase;
`;
const NewUserBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #b6d36b;
  cursor: pointer;
  cursor: pointer;
  border: none;
  outline: none;
`;
const NewUserText = styled.strong`
  font-size: 14px;
  color: #ffffff;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectField = styled(TextField)`
  .MuiInputLabel-root {
    font-weight: bold;
    font-size: 17px !important;
    color: #999999 !important;
  }
  .MuiFormLabel-root.Mui-focused {
    color: #1194f6 !important;
    font-size: 17px !important;
  }
  .Mui-error {
    color: #f44336 !important;
  }
  .MuiInput-underline {
    &::before {
      border-bottom: solid 1px rgba(238, 238, 238, 0.99);
    }
    &::after {
      border-bottom: 2px solid #1194f6;
    }
  }
`;

const DialingParameter = ({ header, closeFn }) => {
  const [dialInterval, setDialInterval] = useState("");
  const [ratio, setRatio] = useState("");
  const [threshold, setThreshold] = useState("");
  const [max, setMax] = useState("");
  const [min, setMin] = useState("");
  return (
    <Center>
      <Box>
        <Header>
          <CenterText>{header}</CenterText>
          <CloseIcon onClick={closeFn} />
        </Header>
        <Content>
          {[
            {
              title: "Dialer interval",
              value: "3",
              helper: "Number of seconds between calling the dialer algorithm.",
              adornment: true,
              setFn: setDialInterval
            },
            {
              title: "Call ratio",
              value: "7.0",
              helper:
                "The autodialer will call a new prospect whenever the ratio of outgoing calls to ready rep replogins falls below this value.",
              setFn: setRatio
            },
            {
              title: "Damper Threshold",
              value: "60.00",
              helper: "How to damper the dialer. Waiting is a % of stations.",
              setFn: setThreshold
            },
            {
              title: "Max requested calls per agent",
              value: "60.00",
              helper:
                "Max number of calls / logged-in stations on a single dial request. 0 is no limit.",
              setFn: setMax
            },
            {
              title: "Min requested calls per agent",
              value: "0.40",
              helper: null,
              setFn: setMin
            }
          ].map(item => (
            <SelectField
              onChange={e => item.setFn(e.target.value)}
              label={item.title}
              margin="normal"
              defaultValue={item.value}
              helperText={item.helper}
              InputProps={
                item.adornment
                  ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <KeyboardArrowDown
                            style={{ fontSize: 27, cursor: "pointer" }}
                          />
                        </InputAdornment>
                      )
                    }
                  : null
              }
            />
          ))}

          <BtnCont>
            <CloseBtn onClick={closeFn}>
              <CloseText>cancel</CloseText>
            </CloseBtn>
            <NewUserBtn onClick={closeFn}>
              <NewUserText>save</NewUserText>
            </NewUserBtn>
          </BtnCont>
        </Content>
      </Box>
    </Center>
  );
};

export default DialingParameter;
