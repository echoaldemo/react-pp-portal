import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import {
  AsyncTable,
  TruthCell,
  ActiveCell,
  EditButton
} from "../../../../../common-components";
import EditDIDModal from "../EditDIDModal/EditDIDModal";

interface Obj {
  [index: string]: any;
}

const DIDTable = ({ headers, didData }: any) => {
  return (
    <div>
      <AsyncTable
        headers={headers}
        tableData={didData}
        render={(pools: Obj, { row, userCell }: Obj) =>
          pools.map((pool: Obj) => (
            <TableRow className={row} key={pool.uuid}>
              <TableCell
                style={{ textDecoration: "underline" }}
                className={userCell}
              >
                {pool.number || "Field not set"}
              </TableCell>
              <TableCell className={userCell}>
                <p>{pool.timezone || "Field not set"}</p>
              </TableCell>
              <TruthCell className={userCell}>{pool.owned}</TruthCell>
              <TableCell className={userCell}>
                <p>{pool.pool ? pool.pool.name : "Field not set"}</p>
              </TableCell>
              <TableCell className={userCell}>
                <p>{pool.cname_string ? pool.cname_string : "Field not set"}</p>
              </TableCell>
              <TruthCell className={userCell}>{pool.cname_valid}</TruthCell>
              <ActiveCell className={userCell}>{pool.active}</ActiveCell>
              <TableCell className={userCell} align="right">
                <EditButton text="Edit" onClickFunc={() => {}} />
              </TableCell>
            </TableRow>
          ))
        }
      />
      <EditDIDModal />
    </div>
  );
};

export default DIDTable;
