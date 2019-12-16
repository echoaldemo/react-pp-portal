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
      "&.Paused": {
        backgroundColor: "#eeeeee",
        color: "#777777"
      },
      "&.Start": {
        backgroundColor: "#eeeeee",
        color: "#777777"
      }
    }
  }
};

function PausedCell(props) {
  const classes = `${props.className} ${props.classes.root}`;
  const style = props.children === false ? "Paused" : "Start";
  return (
    <TableCell className={classes}>
      <span className={style}>{style}</span>
    </TableCell>
  );
}

export default withStyles(styles)(PausedCell);
