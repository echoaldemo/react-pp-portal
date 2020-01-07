import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiContentCopy } from "@mdi/js";

import { AsyncTable, EditButton } from "common-components";

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

interface Props {
  userData: any;
  headers: any;
  innerLoading: any;
  filterlist: any;
}

const LocationTable: React.FC<Props> = ({
  userData,
  headers,
  innerLoading,
  filterlist
}) => {
  //
  const [copy, setCopy] = useState(false);

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
          render={(campaigns: any, { row, cell, icon }: any) => {
            return campaigns.map((campaign: any) => (
              <TableRow className={row} key={campaign.uuid} id="demo-body">
                <TableCell
                  className={cell}
                  style={{
                    width: "20%"
                  }}
                >
                  <Link
                    to={`/manage/team/edit/${campaign.uuid}/`}
                    style={{ color: "#777777" }}
                    onClick={() => {
                      localStorage.setItem(`companyslug`, campaign.slug);
                      localStorage.setItem(`campaignuuid`, campaign.uuid);
                    }}
                  >
                    {campaign.name}
                  </Link>
                </TableCell>
                <TableCell
                  className={cell}
                  style={{ color: "#777777", width: "20%" }}
                >
                  {campaign.slug}
                </TableCell>

                <TableCell
                  className={cell}
                  style={{
                    color: "#777777",
                    // width: 500,
                    height: "100%",
                    whiteSpace: "nowrap",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                    // justifyContent: "center"
                  }}
                >
                  <p
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      margin: 0,
                      marginRight: "10px",
                      padding: 0
                    }}
                  >
                    {campaign.uuid}
                  </p>
                  <CopyToClipboard
                    text={campaign.uuid}
                    onCopy={() => setCopy(true)}
                    onPointerLeave={() => setCopy(false)}
                  >
                    {copy ? (
                      <LightTooltip title="UUID Copied!" placement="top">
                        <Icon
                          path={mdiContentCopy}
                          title="Copy"
                          size={1}
                          rotate={360}
                        />
                      </LightTooltip>
                    ) : (
                      <LightTooltip title="Copy UUID" placement="top">
                        <Icon
                          path={mdiContentCopy}
                          title="Copy"
                          size={1}
                          rotate={360}
                        />
                      </LightTooltip>
                    )}
                  </CopyToClipboard>
                </TableCell>

                <TableCell className={cell}>
                  <Link to={`/manage/team/edit/${campaign.uuid}/`}>
                    <EditButton
                      text="Edit"
                      onClickFunc={() => {
                        localStorage.setItem(`companyslug`, campaign.slug);
                        localStorage.setItem(`campaignuuid`, campaign.uuid);
                      }}
                      style={{
                        color: "#444851",
                        margin: 5
                      }}
                    />
                  </Link>
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
              Loading results...
            </h1>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default LocationTable;
