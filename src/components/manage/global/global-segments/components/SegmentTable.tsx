import { AsyncTable, ActiveCell, UnderlineCell } from "common-components";
import { FileCopyOutlined as Icon } from "@material-ui/icons";
import CodeIcon from "@material-ui/icons/Code";
import DeleteIcon from "@material-ui/icons/Delete";
import ViewIcon from "@material-ui/icons/Visibility";

import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import {
  Typography,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  TableRow,
  TableCell,
  CircularProgress
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link } from "react-router-dom";
// import DeleteSegment from "./DeleteSegment";

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
  // const [delForm, setDelForm] = useState(false);
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

  // const closeDelete = () => {
  //   setDelForm(false);
  //   closeF();
  // };

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
            render={(segments: any, { row, cell, uuid, icon }: any) => {
              return segments.map((segment: any) => (
                <TableRow className={row} key={segment.uuid} id="demo-body">
                  <UnderlineCell className={cell}>{segment.name}</UnderlineCell>
                  <TableCell className={cell} style={{ color: "#777777" }}>
                    {segment.slug}
                  </TableCell>

                  <TableCell
                    className={cell}
                    style={{
                      color: "#777777",
                      height: "100%"
                    }}
                  >
                    {segment.type}
                  </TableCell>
                  <TableCell className={uuid}>
                    <p>{segment.uuid}</p>

                    <CopyToClipboard
                      text={segment.uuid}
                      onCopy={() => setCopy(true)}
                      onPointerLeave={() => setCopy(false)}
                    >
                      {copy ? (
                        <LightTooltip title="UUID Copied!" placement="top">
                          <CodeIcon className={icon} rotate={360} />
                        </LightTooltip>
                      ) : (
                        <LightTooltip title="Copy UUID" placement="top">
                          <Icon className={icon} rotate={360} />
                        </LightTooltip>
                      )}
                    </CopyToClipboard>
                  </TableCell>
                  <ActiveCell className={cell} style={{ color: "#777777" }}>
                    {segment.active}
                  </ActiveCell>
                  <TableCell className={cell}>
                    <Link
                      key={segment.uuid}
                      style={{
                        textDecoration: "none",
                        color: "#000"
                      }}
                      to={{
                        pathname: `/manage/edit-segment-variables/company/global/segment/${segment.uuid}`,
                        state: {
                          company: segment
                        }
                      }}
                    >
                      <Button
                        style={{
                          textTransform: "none",
                          color: "#444851",
                          display: "flex",
                          margin: 5,
                          alignItems: "center",
                          cursor: "pointer"
                        }}
                      >
                        <ViewIcon
                          style={{
                            fontSize: 14
                          }}
                        />
                        &nbsp;
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            textDecoration: "underline",
                            color: "#444851"
                          }}
                        >
                          View
                        </span>
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell className={cell}>
                    <SettingsIcon
                      onClick={e => handleClick(e, segment)}
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
                paddingTop: 10,
                paddingBottom: 0
              }}
            >
              <CodeIcon />{" "}
              <Typography style={{ marginLeft: 40 }}>XML</Typography>
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
              <DeleteIcon />{" "}
              <Typography style={{ marginLeft: 40 }}>Delete</Typography>
            </MenuItem>
          </Menu>
        </>
      }
    </React.Fragment>
  );
}
export default withRouter(SegmentTable);
