import React, { useState } from "react";
import { TableRow, TableCell, Menu } from "@material-ui/core";
import { Settings, KeyboardArrowDown } from "@material-ui/icons";
import { AsyncTable } from "common-components";
import { MenuItem } from "../styles";
import SendPost from "./SendPost";
import EditProspect from "./EditProspect";
import History from "./History";
import { Span } from "../styles";

interface IProps {
  qa: any;
  sortFirstName: any;
}

interface IState {
  post: boolean;
  postUUID: string;
  edit: boolean;
  history: boolean;
}

const QATable: React.FC<IProps> = ({ qa, sortFirstName }) => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [state, setState] = useState<IState>({
    post: false,
    postUUID: "1",
    edit: false,
    history: false
  });
  const [current, setCurrent] = useState<any>({});

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            setState({ ...state, edit: true });
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            setState({ ...state, post: true });
          }}
        >
          Send post
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            setState({ ...state, history: true });
          }}
        >
          History
        </MenuItem>
      </Menu>
      <SendPost state={state} setState={setState} />
      <EditProspect state={state} setState={setState} current={current} />
      <History state={state} setState={setState} />
      <AsyncTable
        headers={[
          <Span onClick={sortFirstName}>
            First name
            <KeyboardArrowDown />
          </Span>,
          <Span>
            Last name
            <KeyboardArrowDown />
          </Span>,
          "Disposition",
          "Quality",
          "NCS",
          "Location",
          <Span>
            Prospect list
            <KeyboardArrowDown />
          </Span>,
          "Submits",
          ""
        ]}
        tableData={qa}
        render={(qaDatas: any, { row, cell }: any) =>
          qaDatas.map((qaData: any, i: number) => (
            <TableRow key={i} className={row}>
              <TableCell className={cell}>{qaData.first_name}</TableCell>
              <TableCell className={cell}>{qaData.last_name}</TableCell>
              <TableCell className={cell}>{qaData.disposition}</TableCell>
              <TableCell className={cell}>
                {qaData.quality ? qaData.quality : "-"}
              </TableCell>
              <TableCell className={cell}>
                {qaData.ncs ? qaData.ncs : "-"}
              </TableCell>
              <TableCell className={cell}>{qaData.location}</TableCell>
              <TableCell className={cell}>
                <p>{qaData.prospect}</p>
              </TableCell>
              <TableCell className={cell}>
                {qaData.submits ? qaData.submits : "-"}
              </TableCell>
              <TableCell className={cell} align="right">
                <Settings
                  style={{ cursor: "pointer" }}
                  onClick={e => {
                    setAnchorEl(e.currentTarget);
                    setCurrent(qaData);
                  }}
                />
              </TableCell>
            </TableRow>
          ))
        }
      />
    </>
  );
};
export default QATable;
