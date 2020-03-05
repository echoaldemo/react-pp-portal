import React, { useState } from "react";
import {
  AsyncTable,
  ActiveCell,
  UnderlineCell,
  EditButton
} from "common-components";
import { withStyles } from "@material-ui/core/styles";
import {
  TableCell,
  TableRow,
  Tooltip,
  Menu,
  MenuItem
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { FileCopyOutlined as Icon } from "@material-ui/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

interface DNCTableProps {
  state: any;
}

const DNCTable: React.FC<DNCTableProps> = ({ state }) => {
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
          id="modify-menu"
          // onClick={() => {
          //   setPopper(null);
          //   openModal();
          // }}
        >
          Modify
        </MenuItem>
        <MenuItem
          id="delete-menu"
          // onClick={() => {
          //   handleClose();
          //   setPopper(null);
          //   deleteConfirmation();
          // }}
        >
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default DNCTable;
