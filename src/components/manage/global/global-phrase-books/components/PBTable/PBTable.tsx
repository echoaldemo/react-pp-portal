import React, { useState } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FileCopyOutlined as Icon } from "@material-ui/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AsyncTable, EditButton } from "common-components";
import { LightTooltip } from "../../styles/PBTable.style";

interface Props {
  headers: Array<string>;
  data: Array<Obj>;
  history: any;
}
interface Obj {
  [index: string]: any;
}

const DIDTable = ({ headers, data, history }: Props) => {
  const [copy, setCopy] = useState<boolean>(false);

  return (
    <div>
      <AsyncTable
        headers={headers}
        tableData={data}
        render={(phrases: Obj, { row, cell, uuid, icon }: Obj) =>
          phrases.map((phrase: Obj) => (
            <TableRow className={row} key={phrase.uuid}>
              <TableCell className={cell}>
                <Link
                  to={{
                    pathname: `/manage/phrase-book/global/edit/${phrase.uuid}`
                  }}
                  style={{ color: "#777777" }}
                >
                  {phrase.name}
                </Link>
              </TableCell>
              <TableCell className={cell}>{phrase.slug}</TableCell>
              <TableCell className={uuid}>
                <p>{phrase.uuid}</p>
                <CopyToClipboard
                  text={phrase.uuid}
                  onCopy={() => setCopy(true)}
                  onPointerLeave={() => setCopy(false)}
                >
                  {copy ? (
                    <LightTooltip title="UUID Copied!" placement="top">
                      <Icon className={icon} />
                    </LightTooltip>
                  ) : (
                    <LightTooltip title="Copy UUID" placement="top">
                      <Icon className={icon} />
                    </LightTooltip>
                  )}
                </CopyToClipboard>
              </TableCell>
              <TableCell className={cell} align="right">
                <Link
                  to={{
                    pathname: `/manage/phrase-book/global/edit/${phrase.uuid}`
                  }}
                  style={{ color: "#777777" }}
                >
                  <EditButton
                    text="Edit"
                    onClickFunc={() => {
                      history.push(
                        `/manage/phrase-book/global/edit/${phrase.uuid}`
                      );
                      localStorage.setItem("edit_pb_dataname", phrase.name);
                    }}
                  />
                </Link>
              </TableCell>
            </TableRow>
          ))
        }
      />
    </div>
  );
};

export default DIDTable;
