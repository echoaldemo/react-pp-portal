import React, { useState } from "react";

import { AsyncTable, ActiveCell, EditButton } from "common-components";
import {
  TableRow,
  TableCell,
  CircularProgress,
  Tooltip,
  withStyles
} from "@material-ui/core";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { FileCopyOutlined as Icon } from "@material-ui/icons";
import { mdiContentCopy } from "@mdi/js";

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

interface Props extends RouteComponentProps<any> {
  userData: any;
  innerLoading: boolean;
  headers: string[];
}

const TableComponent: React.FC<Props> = ({
  userData,
  headers,
  innerLoading
}) => {
  const [copy, setCopy] = useState(false);
  const renderIcon = (icon: any) => {
    const iconProps = {
      className: icon,
      path: mdiContentCopy,
      size: 1,
      rotate: 360
    };
    return <Icon {...iconProps} />;
  };
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
          render={(companies: any, { row, cell, uuid, icon }: any) => {
            return companies.map((company: any) => (
              <TableRow className={row} key={company.uuid} id="demo-body">
                <TableCell className={cell} style={{ maxWidth: 250 }}>
                  <Link
                    to={{
                      pathname: `/manage/companies/edit/${company.slug}/${company.uuid}`,
                      state: {
                        company: company
                      }
                    }}
                    style={{ color: "#777777" }}
                    onClick={() => {
                      localStorage.setItem(`companyslug`, company.slug);
                      localStorage.setItem(`companyuuid`, company.uuid);
                      localStorage.setItem(
                        `companyData`,
                        JSON.stringify(company)
                      );
                    }}
                  >
                    {company.name}
                  </Link>
                </TableCell>
                <TableCell
                  className={cell}
                  style={{ color: "#777777", maxWidth: 250 }}
                >
                  {company.slug}
                </TableCell>
                <TableCell
                  className={cell}
                  style={{
                    color: "#777777",
                    height: "100%",
                    maxWidth: 200
                  }}
                >
                  {company.email !== null
                    ? company.email.length !== 0
                      ? company.email
                      : "Field Not Set"
                    : "Field Not Set"}
                </TableCell>
                <TableCell
                  className={cell}
                  style={{
                    color: "#777777",
                    height: "100%",
                    maxWidth: 200,
                    wordBreak: "break-word"
                  }}
                >
                  {company.website !== null
                    ? company.website.length !== 0
                      ? company.website
                      : "Field Not Set"
                    : "Field Not Set"}
                </TableCell>
                <TableCell className={uuid}>
                  <p>{company.uuid}</p>
                  <CopyToClipboard
                    text={company.uuid}
                    onCopy={() => setCopy(true)}
                    onPointerLeave={() => setCopy(false)}
                  >
                    {copy ? (
                      <LightTooltip title="UUID Copied!" placement="top">
                        {renderIcon(icon)}
                      </LightTooltip>
                    ) : (
                      <LightTooltip title="Copy UUID" placement="top">
                        {renderIcon(icon)}
                      </LightTooltip>
                    )}
                  </CopyToClipboard>
                </TableCell>

                <ActiveCell
                  className={cell}
                  style={{ color: "#777777", maxWidth: 150 }}
                >
                  {company.active}
                </ActiveCell>
                <TableCell
                  className={cell}
                  style={{
                    maxWidth: 150
                  }}
                  align="right"
                >
                  <Link
                    to={{
                      pathname: `/manage/companies/edit/${company.slug}/${company.uuid}`,
                      state: {
                        company: company
                      }
                    }}
                  >
                    <EditButton
                      text="Edit"
                      onClickFunc={() => {
                        localStorage.setItem(`companyslug`, company.slug);
                        localStorage.setItem(`companyuuid`, company.uuid);
                        localStorage.setItem(
                          `companyData`,
                          JSON.stringify(company)
                        );
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
    </React.Fragment>
  );
};

const CompanyTable = withRouter(TableComponent);

export { CompanyTable };
