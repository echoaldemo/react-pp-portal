import * as React from "react";
import { withStyles, TableCell } from "@material-ui/core";
import { liveCell as styles } from "../styles";

interface Props {
  children?: React.ReactNode;
  className?: string;
  classes?: any;
  style?: any;
}

const Component: React.FC<Props> = ({ className, children, classes }) => {
  const style = children ? "Live" : "Off";
  return (
    <TableCell className={`${className} ${classes.root}`}>
      <span className={style}>{style}</span>
    </TableCell>
  );
};

const LiveCell = withStyles(styles)(Component);

export { LiveCell };
