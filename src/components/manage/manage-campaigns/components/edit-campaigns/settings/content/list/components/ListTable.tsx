import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {
  ActiveCell,
  LiveCell as LiveCellOff,
  Modal,
  AsyncTable
} from "common-components";
import EditList from "./modals/EditList";
import ListSummary from "./modals/ListSummary";
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

const ListTable: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [clickedGear, setClickedGear] = useState(null);
  const [openEditList, setOpenEditList] = useState(false);
  const [openListSummary, setOpenListSummary] = useState(false);

  const styleProp = {
    style: { color: "#777777", maxWidth: 150 }
  };

  const popMenuProp = {
    open: openMenu,
    anchorEl: anchorEl,
    onClose: (e: any) => {
      setOpenMenu(false);
      setAnchorEl(null);
      setClickedGear(null);
    },
    openSummary: () => setOpenListSummary(true),
    openEditList: () => setOpenEditList(true)
  } as any;

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
        render={(lists: any, { row, cell, uuid, icon }: any) => {
          return lists.map((list: any, i: number) => (
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
              <ActiveCell className={cell} {...styleProp}>
                {list.active}
              </ActiveCell>
              <TableCell className={cell} style={{ maxWidth: 250 }}>
                {list.priority}
              </TableCell>
              <LiveCellOff className={cell} {...styleProp}>
                {list.dynamic}
              </LiveCellOff>
              <LiveCellOff className={cell} {...styleProp}>
                {list.click_to_call}
              </LiveCellOff>
              <LiveCellOff className={cell} {...styleProp}>
                {list.delayed}
              </LiveCellOff>
              <TableCell className={cell} {...styleProp}>
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
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget as any);
                    setOpenMenu(true);
                    setClickedGear(i as any);
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
      <PopUpMenu {...popMenuProp} />
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
};

export default ListTable;
