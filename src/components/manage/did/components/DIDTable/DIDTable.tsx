import React, { useState } from "react";
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

const DIDTable = ({ headers, didData, fetchDIDs }: any) => {
  const [editData, setEditData] = useState<Obj | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <div>
      <AsyncTable
        headers={headers}
        tableData={didData}
        render={(dids: Obj, { row, userCell }: Obj) =>
          dids.map((did: Obj) => (
            <TableRow className={row} key={did.uuid}>
              <TableCell
                style={{ textDecoration: "underline" }}
                className={userCell}
              >
                {did.number || "Field not set"}
              </TableCell>
              <TableCell className={userCell}>
                <p>{did.timezone || "Field not set"}</p>
              </TableCell>
              <TruthCell className={userCell}>{did.owned}</TruthCell>
              <TableCell className={userCell}>
                <p>{did.pool ? did.pool.name : "Field not set"}</p>
              </TableCell>
              <TableCell className={userCell}>
                <p>{did.cname_string ? did.cname_string : "Field not set"}</p>
              </TableCell>
              <TruthCell className={userCell}>{did.cname_valid}</TruthCell>
              <ActiveCell className={userCell}>{did.active}</ActiveCell>
              <TableCell className={userCell} align="right">
                <EditButton
                  text="Edit"
                  onClickFunc={() => {
                    setEditData(did);
                    handleOpenModal();
                  }}
                />
              </TableCell>
            </TableRow>
          ))
        }
      />
      <EditDIDModal
        open={open}
        closeFn={handleCloseModal}
        editData={editData}
        fetchDIDs={fetchDIDs}
      />
    </div>
  );
};

export default DIDTable;
