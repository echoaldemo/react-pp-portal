import React from "react";
import styled from "styled-components";

const Span = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #444851;
  text-decoration: underline;
  cursor: pointer;
`;
const Icon = styled.span`
  font-size: 19px;
  margin-right: 4px;
  display: flex;
  align-items: center;
`;
const ButtonWithIcon = props => {
  const { icon, ...rest } = props;
  return (
    <Span {...rest}>
      <Icon>{icon}</Icon>
      {props.children}
    </Span>
  );
};

export default ButtonWithIcon;
