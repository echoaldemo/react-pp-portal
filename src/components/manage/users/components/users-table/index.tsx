import React, { useState } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FileCopyOutlined as Icon } from "@material-ui/icons";
import {
  AsyncTable,
  ActiveCell,
  EditButton,
  TableLoader,
  UnderlineCell
} from "common-components";
import { mdiContentCopy } from "@mdi/js";
import { LightTooltip } from "../styles";
import { USER_HEADERS } from "./constants";
type Props = {
  users: any;
  loading?: boolean;
  setEdit: any;
};

const UserTable: React.FC<Props> = ({ users, setEdit, loading }) => {
  const [copy, setCopy] = useState(false);
  const filterKeys: Function = (data: any) => {
    let {
      username,
      first_name,
      last_name,
      email,
      uuid,
      hire_date,
      date_joined,
      is_active
    } = data;
    let filtered_data = {
      username,
      first_name,
      last_name,
      email,
      uuid,
      hire_date,
      date_joined,
      active: is_active
    };
    return filtered_data;
  };

  const getClassName: Function = (i: number, { uuid, userCell }: any) => {
    switch (i) {
      case 4:
        return uuid;
      default:
        return userCell;
    }
  };

  const renderIcon: Function = (cellVal: any, iconProps: any) => {
    return (
      <CopyToClipboard
        text={cellVal}
        onCopy={() => setCopy(true)}
        onPointerLeave={() => setCopy(false)}
      >
        {copy ? (
          <LightTooltip title="UUID Copied!" placement="top">
            <Icon {...iconProps} />
          </LightTooltip>
        ) : (
          <LightTooltip title="Copy UUID" placement="top">
            <Icon {...iconProps} />
          </LightTooltip>
        )}
      </CopyToClipboard>
    );
  };

  const renderCells: Function = (userData: any, styleProps: any) =>
    Object.values(userData).map((cellVal: any, i: number) => {
      let cellStyle = getClassName(i, styleProps);
      let { icon } = styleProps;
      const iconProps = {
        className: icon,
        path: mdiContentCopy,
        size: 1,
        rotate: 360
      };
      return i > 0 ? (
        <TableCell key={i} className={cellStyle}>
          {i !== 7 ? (
            <p>{cellVal}</p>
          ) : (
            <ActiveCell className={cellStyle}>{true}</ActiveCell>
          )}

          {i === 4 && renderIcon(cellVal, iconProps)}
        </TableCell>
      ) : (
        <UnderlineCell
          onClick={() => setEdit(userData.uuid)}
          key={i}
          className={cellStyle}
        >
          <span style={{ color: "rgb(68, 72, 81)" }}>{cellVal}</span>
        </UnderlineCell>
      );
    });

  const renderRows: Function = (userData: any, styleProps: any) => {
    let usersInfo = filterKeys(userData);
    return (
      <TableRow key={userData.uuid} className={styleProps.row}>
        {renderCells(usersInfo, styleProps)}
        <TableCell className={styleProps.userCell}>
          <EditButton
            text="Edit"
            onClickFunc={() => setEdit(userData.uuid)} //getUserData(example)}
            style={{
              color: "#444851"
            }}
            iconStyle={{}}
            textStyle={{}}
          />
        </TableCell>
      </TableRow>
    );
  };

  const renderUserTable: Function = () => {
    return (
      <AsyncTable
        headers={USER_HEADERS}
        tableData={users}
        render={(userData: any, styleProps: any) =>
          userData.map((user: any) => renderRows(user, styleProps))
        }
      />
    );
  };
  return (
    <>
      <div>{loading ? <TableLoader /> : renderUserTable()}</div>
    </>
  );
};

export default UserTable;
