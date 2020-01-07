import React, { useState } from "react";
import AsyncTable from "../../../../../../../common-components/async-table/AsyncTable";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {
  ActiveCell,
  LiveCellOff
} from "../../../../../../../common-components/table-cells/TableCells";
import Modal from "../../../../../../../common-components/Modal"
import EditList from "../components/modals/EditList"
import ListSummary from "../components/modals/ListSummary"
import { Settings, KeyboardArrowDown } from "@material-ui/icons";
import PopUpMenu from "./PopupMenu";

const mockData = [
  {
    id: "1454",
    name: "list 1",
    active: true,
    priority: 1,
    storage: "S3",
    dynamic: false,
    click_to_call: false,
    delayed: false,
    created: "Oct. 18, 2019"
  },
  {
    id: "145432",
    name: "list 2",
    active: true,
    priority: 1,
    storage: "S3",
    dynamic: false,
    click_to_call: false,
    delayed: false,
    created: "Oct. 18, 2019"
  },
  {
    id: "43431",
    name: "list 3",
    active: true,
    priority: 1,
    storage: "S3",
    dynamic: false,
    click_to_call: false,
    delayed: false,
    created: "Oct. 18, 2019"
  }
];

export default function ListTable(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [clickedGear, setClickedGear] = useState(null);
  const [openEditList, setOpenEditList] = useState(false)
  const [openListSummary, setOpenListSummary] = useState(false)

  return (
    <div>
      <AsyncTable
        headers={[
          "ID",
          "Name",
          "Created",
          "Status",
          "Priority",
          "Dynamic",
          "Click to Call",
          "Delayed process",
          "Storage engine",
          " "
        ]}
        tableData={mockData}
        render={(lists, { row, cell, uuid, icon }) => {
          return lists.map((list, i) => (
            <TableRow className={row} key={i}>
              <TableCell className={cell} style={{ maxWidth: 250 }}>
                <p>{list.id}</p>
              </TableCell>
              <TableCell className={cell} style={{ maxWidth: 250 }}>
                {list.name}
              </TableCell>
              <TableCell className={cell} style={{ maxWidth: 250 }}>
                {list.created}
              </TableCell>
              <ActiveCell
                className={cell}
                style={{ color: "#777777", maxWidth: 150 }}
              >
                {list.active}
              </ActiveCell>
              <TableCell className={cell} style={{ maxWidth: 250 }}>
                {list.priority}
              </TableCell>
              <LiveCellOff
                className={cell}
                style={{ color: "#777777", maxWidth: 150 }}
              >
                {list.dynamic}
              </LiveCellOff>
              <LiveCellOff
                className={cell}
                style={{ color: "#777777", maxWidth: 150 }}
              >
                {list.click_to_call}
              </LiveCellOff>
              <LiveCellOff
                className={cell}
                style={{ color: "#777777", maxWidth: 150 }}
              >
                {list.delayed}
              </LiveCellOff>
              <TableCell
                className={cell}
                style={{ color: "#777777", maxWidth: 150 }}
              >
                {list.storage}
              </TableCell>
              <TableCell
                className={cell}
                style={{
                  maxWidth: 150
                }}
                align="right"
              >
                <Settings
                  onClick={e => {
                    setAnchorEl(e.currentTarget);
                    setOpenMenu(true);
                    setClickedGear(i);
                  }}
                  style={{
                    color: i === clickedGear ? "#1194f6" : "#444851",
                    fontSize: "18px",
                    cursor: "pointer"
                  }}
                />
              </TableCell>
            </TableRow>
          ));
        }}
      />
      <PopUpMenu
        open={openMenu}
        anchorEl={anchorEl}
        onClose={e => {
          setOpenMenu(false);
          setAnchorEl(null);
          setClickedGear(null);
        }}
        openSummary={() => {
          setOpenListSummary(true)
        }}
        openEditList={() => {
          setOpenEditList(true)
        }}
      />
      <Modal
        open={openEditList}
        title="Dynamic posting help"
        onClose={() => setOpenEditList(false)}
        width={740}
      >
        <EditList />
      </Modal>
      <Modal
        open={openListSummary}
        title="Summary"
        onClose={() => setOpenListSummary(false)}
        width={900}
      >
        <ListSummary />
      </Modal>
    </div>
  );
}
