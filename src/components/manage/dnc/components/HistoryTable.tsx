import React, { useState } from "react";
import { AsyncTable, UnderlineCell } from "common-components";
import { TableCell, TableRow, Menu, MenuItem } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  iconUpload: {
    fontSize: "19px",
    position: "absolute",
    marginTop: "1px",
    marginLeft: "25px"
  },
  disabledIconUpload: {
    position: "absolute",
    fontSize: "19px",
    marginTop: "1px",
    marginLeft: "25px",
    color: "#bbbbbb"
  }
});
interface HistoryTableProps {
  state: any;
  openModalEditDncList: Function;
  openModalUpload: Function;
}

const HistoryTable: React.FC<HistoryTableProps> = ({
  state,
  openModalEditDncList,
  openModalUpload
}) => {
  const classes = useStyles();
  const [popper, setPopper] = useState<any>(null);
  return (
    <React.Fragment>
      <AsyncTable
        headers={["Date", "Attempted", "Valid", "Invalid"]}
        tableData={state}
        render={(dnc: any, { row, cell, uuid, icon }: any) =>
          dnc.map((dnc: any, index: any) => (
            <TableRow className={row} key={dnc.uuid}>
              <UnderlineCell className={cell}>
                {"Nov 21, 2013"} {/*mock data*/}
              </UnderlineCell>
              <UnderlineCell className={cell}>
                {"1"} <GetAppIcon className={classes.iconUpload} />
                {/*mock data*/}
              </UnderlineCell>
              <UnderlineCell className={cell}>
                {"1"} <GetAppIcon className={classes.iconUpload} />
                {/*mock data*/}
              </UnderlineCell>
              <UnderlineCell className={cell}>
                {"0"} <GetAppIcon className={classes.disabledIconUpload} />
                {/*mock data*/}
              </UnderlineCell>
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

export default HistoryTable;
