import React from "react";
import { Add } from "@material-ui/icons";
import { Icon, Span } from "../styles";
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
  style?: any;
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

export default ButtonWithIcon;
