import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const styles = {
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

function TruthCell(props) {
  const classes = `${props.className} ${props.classes.root}`;
  const style = props.children === true ? "True" : "False";
  return (
    <TableCell className={classes}>
      <span className={style}>{style}</span>
    </TableCell>
  );
}

export default withStyles(styles)(TruthCell);
