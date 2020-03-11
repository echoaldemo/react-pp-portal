import React, { useState } from "react";
import {
  AsyncTable,
  ActiveCell,
  UnderlineCell,
  EditButton
} from "common-components";
import { withStyles } from "@material-ui/core/styles";
import { TableCell, TableRow, Menu, MenuItem } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

interface DNCTableProps {
  state: any;
  openModalEditDncList: Function;
  openModalUpload: Function;
}

const DNCTable: React.FC<DNCTableProps> = ({
  state,
  openModalEditDncList,
  openModalUpload
}) => {
  const [popper, setPopper] = useState<any>(null);

  return (
    <React.Fragment>
      <AsyncTable
        headers={["Name", "Global", "Gets updated", ""]}
        tableData={state}
        render={(dnc: any, { row, cell, uuid, icon }: any) =>
          dnc.map((dnc: any, index: any) => (
            <TableRow className={row} key={dnc.uuid}>
              <UnderlineCell
                className={cell}
                onClick={() =>
                  (window.location.href = `/manage/did-pool/edit/${dnc.uuid}`)
                }
              >
                {dnc.name}
              </UnderlineCell>
              <ActiveCell className={cell}>
                {dnc.allow_inbound ? "yes" : "no"}
              </ActiveCell>
              <ActiveCell className={cell}>
                {dnc.allow_inbound ? "yes" : "no"}
              </ActiveCell>
              <TableCell className={cell} align="right">
                <SettingsIcon
                  id={`settings${index}`}
                  onClick={event => {
                    setPopper(event.currentTarget);
                    // edit(campaign);
                  }}
                />
              </TableCell>
            </TableRow>
          ))
        }
      />

      <Menu
        id="simple-menu"
        anchorEl={popper}
        keepMounted
        open={Boolean(popper)}
        onClose={() => {
          setPopper(null);
        }}
        style={{ marginTop: 40 }}
      >
        <MenuItem
          id="edit"
          onClick={() => {
            openModalEditDncList();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          id="upload"
          onClick={() => {
            openModalUpload();
          }}
        >
          Upload
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default DNCTable;
