import * as React from "react";
import TableCell from "@material-ui/core/TableCell";
import styled from "styled-components";

const Cell = styled(TableCell)`
  text-decoration: underline;
  p {
    width: fit-content;
    cursor: pointer;
    margin: 0;
  }
`;
interface Props {
  children: any;
  className?: any;
  onClick?: any;
}

const UnderlineCell: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Cell {...props}>
      <p>{children}</p>
    </Cell>
  );
};

UnderlineCell.defaultProps = {
  children: "Sample Child"
} as Partial<Props>;

export default UnderlineCell;
