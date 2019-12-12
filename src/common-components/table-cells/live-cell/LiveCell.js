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
      "&.Live": {
        backgroundColor: "#6698c7"
      },
      "&.Off": {
        backgroundColor: "#eeeeee",
        color: "#bbbbbb"
      }
    }
  }
};

function LiveCell(props) {
  const classes = `${props.className} ${props.classes.root}`;
  const style = props.children === true ? "Live" : "Off";
  return (
    <TableCell className={classes}>
      <span className={style}>{style}</span>
    </TableCell>
  );
}

export default withStyles(styles)(LiveCell);
