import React, { Component } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AsyncTable } from "common-components";

export default class PhrasesTable extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <AsyncTable
          headers={["Name", "Phrase", "Slug"]}
          tableData={this.props.tableData}
          render={(phrasebooks, { row, cell, icon }) => {
            return phrasebooks.map((phrase, i) => (
              <TableRow key={i} className={row}>
                <TableCell className={cell}>
                  <Link to="#" style={{ color: "#777777" }}>
                    {phrase.name}
                  </Link>
                </TableCell>
                <TableCell className={cell}>{phrase.phrase}</TableCell>
                <TableCell className={cell}>{phrase.slug}</TableCell>
              </TableRow>
            ));
          }}
        />
      </div>
    );
  }
}
