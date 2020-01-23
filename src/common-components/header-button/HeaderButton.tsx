import React from "react";
import { Button, AddIcon } from "./styles";

interface Props {
  style?: React.CSSProperties;
  openFunction: () => void;
  noIcon: boolean;
  buttonText: string;
}

const HeaderButton: React.FC<Props> = ({
  style,
  openFunction,
  noIcon,
  buttonText
}) => {
  return (
    <>
      <Button style={style} onClick={openFunction}>
        {noIcon ? null : <AddIcon />}
        {buttonText}
      </Button>
    </>
  );
};

HeaderButton.defaultProps = {
  openFunction: () => {},
  buttonIcon: "",
  buttonText: ""
} as Partial<Props>;

export { HeaderButton };
