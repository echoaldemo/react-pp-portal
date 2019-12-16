import React from "react";
import styled from "styled-components";

/**
 * ==============================================================================
 * <SaveButton />
 * ------------------------------------------------------------------------------
 * @param {boolean}   disabled       Button disabled ? (true,false)
 * @param {Function}  handleClick    Triggers OnClick Event
 * @return {ReactElement}
 * ==============================================================================
 */

interface Props {
  disabled?: Boolean;
  children: React.ReactNode;
  handleClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const defaultProps = {
  disabled: false,
  children: "",
  handleClick: () => console.log("saving...")
};

const SaveButton: React.FC<Props> = ({
  disabled,
  children,
  handleClick,
  ...rest
}) => {
  const renderDisabled: Function = () => {
    return (
      <>
        <DisSave onClick={handleClick} {...rest}>
          <DisText>{children}</DisText>
        </DisSave>
      </>
    );
  };

  const renderSave: Function = () => {
    return (
      <>
        <Save onClick={handleClick} {...rest}>
          <SaveText>{children}</SaveText>
        </Save>
      </>
    );
  };

  return disabled ? renderDisabled() : renderSave();
};

SaveButton.defaultProps = defaultProps as Partial<Props>;

const Save = styled.button`
  min-width: 165px;
  min-height: 40px;
  border-radius: 3px;
  background-color: #b6d36b;
  border: none;
  outline: none;
  cursor: pointer;
  text-transform: uppercase;
`;
const SaveText = styled.strong`
  font-size: 14px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
`;
const DisSave = styled.button`
  min-width: 165px;
  min-height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  border: none;
  outline: none;
  text-transform: uppercase;
`;
const DisText = styled.strong`
  font-size: 14px;
  color: #bbbbbb;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
`;

export default SaveButton;
