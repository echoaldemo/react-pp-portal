import React from "react";
import styled from "styled-components";

const Save = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #b6d36b;
  border: none;
  outline: none;
  cursor: pointer;
`;
const SaveText = styled.strong`
  font-size: 14px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;
const DisSave = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  border: none;
  outline: none;
`;
const DisText = styled.strong`
  font-size: 14px;
  color: #bbbbbb;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomButton = props => {
  return props.disabled ? (
    <DisSave disabled type="button">
      <DisText>{props.children}</DisText>
    </DisSave>
  ) : (
    <Save
      type={props.type ? props.type : "button"}
      onClick={props.onClick}
      style={{ textTransform: "none", ...props.style }}
    >
      <SaveText style={{ textTransform: "none", ...props.textStyle }}>
        {props.children}
      </SaveText>
    </Save>
  );
};

export default CustomButton;
