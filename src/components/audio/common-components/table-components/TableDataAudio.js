import React from "react";
import TableCell from "@material-ui/core/TableCell";

class TableDataCell extends React.Component {
  render() {
    return (
      <TableCell align="center">
        <audio
          controls
          className="player"
          preload="false"
          style={{ height: "47px" }}
        >
          <source src={this.props.audioFile} />
        </audio>
      </TableCell>
    );
  }
}

export default TableDataCell;
