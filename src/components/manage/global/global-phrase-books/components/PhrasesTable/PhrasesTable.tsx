import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AsyncTable } from "common-components";

interface Props {
  tableData: Array<Obj>;
}
interface Obj {
  [index: string]: any;
}

const PhrasesTable = ({ tableData }: Props) => {
  return (
    <div>
      <AsyncTable
        headers={["Name", "Phrase", "Slug"]}
        tableData={tableData}
        render={(tableData: Array<Obj>, { row, cell, icon }: any) => {
          return tableData.map((phrase, i) => (
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
};

export default PhrasesTable;
