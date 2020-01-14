import { AsyncTable } from "common-components";
import TableRow from "@material-ui/core/TableRow";

import TableCell from "@material-ui/core/TableCell";

import CircularProgress from "@material-ui/core/CircularProgress";

import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import { mdiContentCopy } from "@mdi/js";
import SettingsIcon from "@material-ui/icons/Settings";
import { FileCopyOutlined as Icon } from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

function AudioResourceTable({
  userData,
  headers,
  innerLoading,
  filterlist,
  upload,
  edit,
  openModal,
  handleCLose,
  deleteConfirmation,
  editUUID
}) {
  //
  const [copy, setCopy] = useState(false);
  const [popper, setPopper] = useState(null);

  return (
    <React.Fragment>
      {innerLoading === true ? (
        <div style={{ height: "100%" }}>
          <div style={{ textAlign: "center", padding: "200px 0" }}>
            <CircularProgress />
          </div>
        </div>
      ) : null}
      {userData.length !== 0 ? (
        <AsyncTable
          headers={headers}
          tableData={userData}
          render={(campaigns, { row, cell, uuid, icon }) => {
            return campaigns.map((campaign, index) => (
              <TableRow className={row} key={campaign.uuid} id="demo-body">
                <TableCell
                  className={cell}
                  style={{
                    width: "20%"
                  }}
                >
                  <u>{campaign.name}</u>
                </TableCell>
                <TableCell
                  className={cell}
                  style={{ color: "#777777", width: "20%" }}
                >
                  {campaign.slug}
                </TableCell>

                <TableCell className={uuid} text={campaign.uuid}>
                  <p>{campaign.uuid}</p>
                  <CopyToClipboard
                    text={campaign.uuid}
                    onCopy={() => setCopy(true)}
                    onPointerLeave={() => setCopy(false)}
                  >
                    {copy ? (
                      <LightTooltip title="UUID Copied!" placement="top">
                        <Icon
                          path={mdiContentCopy}
                          className={icon}
                          size={1}
                          rotate={360}
                        />
                      </LightTooltip>
                    ) : (
                      <LightTooltip title="Copy UUID" placement="top">
                        <Icon
                          path={mdiContentCopy}
                          className={icon}
                          size={1}
                          rotate={360}
                        />
                      </LightTooltip>
                    )}
                  </CopyToClipboard>
                </TableCell>
                <TableCell className={cell} align="center">
                  {campaign.file !== null ? (
                    <audio controls>
                      <source
                        src={`${campaign.file.processed_url}`}
                        type="audio/wav"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <Button
                      id={`upload-btn${index}`}
                      onClick={() => upload(campaign)}
                      style={{ height: "54px", padding: "0" }}
                    >
                      UPLOAD FILE
                    </Button>
                  )}
                </TableCell>
                <TableCell className={cell} align="right">
                  <SettingsIcon
                    id={`settings${index}`}
                    style={{
                      cursor: "pointer",
                      color:
                        popper !== null && editUUID === campaign.uuid
                          ? "#1194f6"
                          : "#444851"
                    }}
                    onClick={event => {
                      setPopper(event.currentTarget);
                      edit(campaign);
                    }}
                  />
                </TableCell>
              </TableRow>
            ));
          }}
        />
      ) : (
        <div style={{ height: "100%" }}>
          <div style={{ textAlign: "center", padding: "200px 0" }}>
            <h1
              style={{
                color: "#7c8a97"
              }}
            >
              No results...
            </h1>
            <h4
              style={{
                color: "#7c8a97"
              }}
            >
              Try filtering other fields
            </h4>
          </div>
        </div>
      )}

      <Menu
        id="simple-menu"
        anchorEl={popper}
        keepMounted
        open={Boolean(popper)}
        onClose={() => {
          setPopper(null);
          handleCLose();
        }}
        style={{ marginTop: 40 }}
      >
        <MenuItem
          id="modify-menu"
          onClick={() => {
            setPopper(null);
            openModal();
          }}
        >
          Modify
        </MenuItem>
        <MenuItem
          id="delete-menu"
          onClick={() => {
            handleCLose();
            setPopper(null);
            deleteConfirmation();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
export default withRouter(AudioResourceTable);
