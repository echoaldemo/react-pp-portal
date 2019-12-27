import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const styles: any = {
  root: {
    "& span": {
      display: "inline-flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 12,
      width: "60px",
      height: "20px",
      textTransform: "capitalize",
      borderRadius: "3px",
      color: "white",
      "&.True": {
        backgroundColor: "#a6c556"
      },
      "&.False": {
        backgroundColor: "#ff504d"
      }
    }
  }
};

interface TruthCellProps {
  children: any;
  className?: string;
  classes: any;
}

const TruthCell: React.SFC<TruthCellProps> = ({
  children,
  className,
  classes
}) => {
  const customClasses = `${className} ${classes.root}`;
  const style = children === true ? "True" : "False";
  return (
    <TableCell className={customClasses}>
      <span className={style}>{style}</span>
    </TableCell>
  );
};

export default withStyles(styles)(TruthCell);
