import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const useStyles = theme => ({
  name: {
    wordBreak: "break-all",
    paddingRight: "0px",
    paddingLeft: "5px"
  }
});

class TableDataCell extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <TableCell
        className={classes.name}
        component="th"
        scope="row"
        align="center"
      >
        {this.props.name}
      </TableCell>
    );
  }
}

export default withStyles(useStyles)(TableDataCell);
