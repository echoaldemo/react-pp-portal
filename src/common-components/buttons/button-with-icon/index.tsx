import React from "react";
import { Add } from "@material-ui/icons";
import styled from "styled-components";

/**
 * ==============================================================================
 * <ButtonWithIcon />
 * ------------------------------------------------------------------------------
 * @param {Children}  children       Children inside the button component
 * @param {Function}  handleClick    Triggers OnClick Event
 * @param {Icon}      icon           Icon for the button
 * @return {ReactElement}
 * ==============================================================================
 */

interface Props {
  children: React.ReactNode;
  handleClick: (e: React.SyntheticEvent<HTMLDivElement>) => void;
  icon?: any;
}

const defaultProps = {
  children: "TEST",
  icon: <Add />,
  handleClick: () => console.log("Click Event")
};

const ButtonWithIcon: React.FC<Props> = ({
  icon,
  handleClick,
  children,
  ...rest
}) => {
  return (
    <Span onClick={handleClick} {...rest}>
      <Icon>{icon}</Icon>
      {children}
    </Span>
  );
};

ButtonWithIcon.defaultProps = defaultProps as Partial<Props>;

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

export default ButtonWithIcon;
