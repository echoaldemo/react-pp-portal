import { TableCell, TableRow } from "@material-ui/core";
import { FileCopyOutlined as Icon } from "@material-ui/icons";
import { mdiContentCopy } from "@mdi/js";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AsyncTable } from "common-components";
import { EditButton } from "common-components";
import { ActiveCell, UnderlineCell } from "common-components";
import { headers, LightTooltip } from "./contsVar";

interface Props {
  realms: any;
  history: any;
}

const RealmTable: React.FC<Props> = ({ realms, history }) => {
  const [copy, setCopy] = useState(false);

  return (
    <>
      <AsyncTable
        headers={headers}
        tableData={realms}
        render={(realms: any, { row, cell, uuid, icon }: any) =>
          realms.map((realm: any) => (
            <TableRow key={realm.uuid} className={row}>
              <UnderlineCell
                className={cell}
                onClick={() =>
                  history.push(`/manage/realms/edit/${realm.uuid}`)
                }
              >
                {realm.name}
              </UnderlineCell>
              <TableCell className={uuid}>
                <p>{realm.uuid}</p>
                <CopyToClipboard
                  text={realm.uuid}
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
              <ActiveCell className={cell}>{realm.active}</ActiveCell>
              <TableCell className={cell} align="right">
                <EditButton
                  text="Edit"
                  onClickFunc={() =>
                    history.push(`/manage/realms/edit/${realm.uuid}`)
                  }
                  style={{
                    color: "#444851"
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

export default RealmTable;
