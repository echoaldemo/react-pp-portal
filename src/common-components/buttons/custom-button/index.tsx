import React from "react";
import { Save, SaveText, DisSave, DisText } from "../styles";
/**
 * ==============================================================================
 * <CustomButton />
 * ------------------------------------------------------------------------------
 * @param {boolean}  disabled        Button Disabled (true/false)
 * @param {function} handleClick         OnClick Event
 * @param {any}      children        Children of the button
 * @param {string}   type            Type of button
 * @param {object}   style           Style object
 * @param {object}   textStyle       Text style object
 * @return {ReactElement}
 * ==============================================================================
 */

interface Props {
  children: React.ReactNode;
  handleClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: any;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

const defaultProps = {
  children: null,
  handleClick: () => console.log("Custom Button Clicked!"),
  type: "button",
  style: {},
  textStyle: {}
};

const CustomButton: React.FC<Props> = ({
  disabled,
  children,
  type,
  handleClick,
  style,
  textStyle
}) => {
  const renderDisabled: Function = () => {
    return (
      <>
        <DisSave disabled type="button">
          <DisText>{children}</DisText>
        </DisSave>
      </>
    );
  };

  const renderSave: Function = () => {
    return (
      <>
        <Save
          type={type ? type : "button"}
          onClick={handleClick}
          style={{ textTransform: "none", ...style }}
        >
          <SaveText style={{ textTransform: "none", ...textStyle }}>
            {children}
          </SaveText>
        </Save>
      </>
    );
  };

  return disabled ? renderDisabled() : renderSave();
};

CustomButton.defaultProps = defaultProps as Partial<Props>;

export default CustomButton;
