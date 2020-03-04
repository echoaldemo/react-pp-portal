import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { AsyncTable, UnderlineCell } from "common-components";

import SwapIcon from "@material-ui/icons/SwapHoriz";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import { FileCopyOutlined as Icon } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

import { withRouter } from "react-router-dom";
import {
  Typography,
  Menu,
  MenuItem,
  CircularProgress,
  TableCell,
  TableRow,
  Tooltip
} from "@material-ui/core";

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

function SegmentTable({
  userData,
  headers,
  innerLoading,
  handleClickOpen,
  closeF,
  openDelete
}: any) {
  //
  const [copy, setCopy] = useState(false);
  const [delForm, setDelForm] = useState(false); // eslint-disable-line
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeData, setActiveData] = React.useState(null);

  const handleClick = (event: any, data: any) => {
    setAnchorEl(event.currentTarget);
    setActiveData(data);
  };

  const openDelete1 = () => {
    openDelete(activeData);
    setAnchorEl(null);
  };

  const handClose = () => {
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
    handleClickOpen(activeData);
  };
  return (
    <React.Fragment>
      {innerLoading === true ? (
        <div style={{ height: "100%" }}>
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <CircularProgress />
          </div>
        </div>
      ) : null}
      {
        <>
          <AsyncTable
            headers={headers}
            tableData={userData}
            render={(variables: any, { row, cell, icon }: any) => {
              return variables.map((variable: any, index: number) => (
                <TableRow className={row} key={index} id="demo-body">
                  <UnderlineCell className={cell}>
                    {variable.name}
                  </UnderlineCell>
                  <TableCell
                    className={cell}
                    style={{ color: "#777777" }}
                  ></TableCell>

                  <TableCell
                    className={cell}
                    style={{
                      color: "#777777",
                      height: "100%"
                    }}
                  >
                    {variable.values}
                  </TableCell>
                  <TableCell
                    className={cell}
                    style={{
                      color: "#777777",
                      width: "fit-content",
                      height: "100%",
                      whiteSpace: "nowrap",
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 15
                    }}
                  >
                    <p
                      style={{
                        overflow: "hidden",
                        width: "130px",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        margin: 0,
                        marginRight: "10px",
                        padding: 0
                      }}
                    >
                      {variable.key}
                    </p>

                    <CopyToClipboard
                      text={variable.key}
                      onCopy={() => setCopy(true)}
                      onPointerLeave={() => setCopy(false)}
                    >
                      {copy ? (
                        <LightTooltip
                          title="Variable Usage Copied!"
                          placement="top"
                        >
                          <Icon className={icon} rotate={360} />
                        </LightTooltip>
                      ) : (
                        <LightTooltip
                          title="Copy Variable Usage"
                          placement="top"
                        >
                          <Icon
                            // path={mdiContentCopy}
                            className={icon}
                            rotate={360}
                          />
                        </LightTooltip>
                      )}
                    </CopyToClipboard>
                  </TableCell>
                  <TableCell
                    className={cell}
                    style={{ color: "#777777" }}
                  ></TableCell>
                  <TableCell className={cell}></TableCell>
                  <TableCell className={cell}>
                    <SettingsIcon
                      onClick={e => handleClick(e, variable)}
                      style={{
                        color: "#777777",
                        display: "flex",
                        margin: 5,
                        alignItems: "center",
                        cursor: "pointer",
                        marginLeft: "auto"
                      }}
                    />
                  </TableCell>
                </TableRow>
              ));
            }}
          />
          <Menu
            onClose={handClose}
            style={{ marginTop: 40 }}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
          >
            <MenuItem
              onClick={handleClose}
              style={{
                color: "#777777",
                width: 250,
                paddingTop: 0,
                paddingBottom: 0
              }}
            >
              <SwapIcon />
              <Typography style={{ marginLeft: 40 }}>Change Values</Typography>
            </MenuItem>
            <MenuItem
              onClick={openDelete1}
              style={{
                color: "#777777",
                width: 250,
                paddingTop: 0,
                paddingBottom: 0
              }}
            >
              <DeleteIcon />
              <Typography style={{ marginLeft: 40 }}>Delete</Typography>
            </MenuItem>
          </Menu>
        </>
      }
    </React.Fragment>
  );
}
export default withRouter(SegmentTable);
