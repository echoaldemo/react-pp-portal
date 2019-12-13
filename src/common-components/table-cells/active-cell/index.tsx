import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const styleDetails: any = {
  span: {
    fontSize: 12,
    width: "60px",
    height: "20px",
    textTransform: "capitalize",
    borderRadius: "3px",
    color: "white",
    "&.active": {
      backgroundColor: "#6698c7"
    },
    "&.inactive": {
      backgroundColor: "#ff504d"
    }
  }
};
const styles: any = {
  root: {
    "& span": {
      display: "inline-flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      ...styleDetails.span
    }
  }
};

interface ActiveCellProps {
  children: any;
  className?: string;
  classes: any;
  native?: any;
  style?: object;
}

const ActiveCell: React.SFC<ActiveCellProps> = props => {
  const classes = `${props.className} ${props.classes.root}`;
  const style =
    props.children === true
      ? "active"
      : props.children === false
      ? "inactive"
      : props.children.toLowerCase().includes("no")
      ? "No"
      : "Yes";
  return (
    <>
      {props.native ? (
        <span>
          <span className="active" style={styleDetails.span}>
            {style}
          </span>
        </span>
      ) : (
        <TableCell className={classes} style={{ ...props.style }}>
          <span
            className={
              style === "No" ? "inactive" : style === "Yes" ? "active" : style
            }
          >
            {style}
          </span>
        </TableCell>
      )}
    </>
  );
};

export default withStyles(styles)(ActiveCell);
