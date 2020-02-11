import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import { styleDetails, activeCell as styles } from "../styles";
interface ActiveCellProps {
  children: any;
  className?: string;
  classes: any;
  native?: any;
  style?: object;
}
const Component: React.FC<ActiveCellProps> = ({
  classes,
  className,
  children,
  native,
  style
}) => {
  const styled =
    children === true
      ? "active"
      : children === false
      ? "inactive"
      : children.toLowerCase().includes("no")
      ? "No"
      : "Yes";
  return (
    <>
      {native ? (
        <span>
          <span className="active" style={styleDetails.span}>
            {styled}
          </span>
        </span>
      ) : (
        <TableCell
          className={`${className} ${classes.root}`}
          style={{ ...style }}
        >
          <span
            className={
              styled === "No"
                ? "inactive"
                : styled === "Yes"
                ? "active"
                : styled
            }
          >
            {styled}
          </span>
        </TableCell>
      )}
    </>
  );
};
Component.defaultProps = {
  children: "",
  className: "",
  classes: {},
  native: false,
  style: {}
} as Partial<ActiveCellProps>;

const ActiveCell = withStyles(styles)(Component);
export { ActiveCell };
