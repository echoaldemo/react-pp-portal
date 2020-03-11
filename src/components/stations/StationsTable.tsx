import React, { useState } from "react";
import {
  AsyncTable,
  ActiveCell,
  UnderlineCell,
  EditButton
} from "common-components";
import { withStyles } from "@material-ui/core/styles";
import { TableCell, TableRow, Tooltip } from "@material-ui/core";
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

const StationsTable = ({ state, history, headers, openEdit }: any) => {
  const [copy, setCopy] = useState(false);

  return (
    <AsyncTable
      headers={headers}
      tableData={state.stations}
      render={(pools: any, { row, cell, uuid, icon }: any) =>
        pools.map((pool: any) => (
          <TableRow className={row} key={pool.uuid}>
            <TableCell className={uuid}>
              {pool.uuid}
              <CopyToClipboard
                text={pool.uuid}
                onCopy={() => setCopy(true)}
                onPointerLeave={() => setCopy(false)}
              >
                {copy ? (
                  <LightTooltip title="UUID Copied!" placement="top">
                    <Icon className={icon} rotate={360} />
                  </LightTooltip>
                ) : (
                  <LightTooltip title="Copy UUID" placement="top">
                    <Icon className={icon} rotate={360} />
                  </LightTooltip>
                )}
              </CopyToClipboard>
            </TableCell>
            <UnderlineCell className={cell} onClick={() => openEdit(pool.uuid)}>
              {pool.username}
            </UnderlineCell>
            <ActiveCell className={cell}>{pool.active}</ActiveCell>
            <TableCell className={cell} align="right">
              <EditButton text="Edit" onClickFunc={() => openEdit(pool.uuid)} />
            </TableCell>
          </TableRow>
        ))
      }
    />
  );
};

export default StationsTable;
