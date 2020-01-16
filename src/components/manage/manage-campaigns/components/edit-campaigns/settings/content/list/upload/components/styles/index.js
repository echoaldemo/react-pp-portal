import styled from "styled-components";
import { TextField } from "@material-ui/core";

const Title = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #444851;
  height: 30px;
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

const Button = styled.button`
  cursor: pointer;
  width: 88px;
  border: none;
  outline: none;
  color: #1194f6;
  font-size: 16px;
  background: white;
  padding: 0;
`;

const DisBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  outline: none;
  border: none;
  margin: 0 auto;
`;

const DisText = styled.strong`
  font-size: 14px;
  color: #bbbbbb;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewUserBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #b6d36b;
  cursor: pointer;
  border: none;
  outline: none;
  margin: 0 auto;
`;
const NewUserText = styled.strong`
  font-size: 14px;
  color: #ffffff;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CancelBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  cursor: pointer;
  border: none;
  outline: none;
  margin: 0 auto;
`;
const CancelText = styled.strong`
  font-size: 14px;
  color: #444851;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnCnt = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 395px;
  margin: 172px auto 0 auto;
`;
const InputCnt = styled.div`
  display: grid;
  margin: 45px auto 0 auto;
  width: 500px;
`;

export {
  Title,
  SelectField,
  Button,
  DisBtn,
  DisText,
  NewUserBtn,
  NewUserText,
  CancelBtn,
  CancelText,
  BtnCnt,
  InputCnt
};
