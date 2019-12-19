import React from "react";
import { NoResult, StyledSpan } from "../styles";

interface Props {
  text: string;
}
const CardNoResult: React.FC<Props> = ({ text }) => {
  return (
    <NoResult>
      <StyledSpan> {text} </StyledSpan>
    </NoResult>
  );
};

export { CardNoResult };
