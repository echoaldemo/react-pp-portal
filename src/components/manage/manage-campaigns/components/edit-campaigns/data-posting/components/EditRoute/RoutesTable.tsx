import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import {
  AsyncTable,
  TableLoader,
  ActiveCell,
  TableNoResult,
  HeaderButton,
  UnderlineCell
} from "common-components";

interface Props {
  loading: boolean;
  data: any[];
  openModal: any;
  campaignuuid: string;
  slug: string;
}

const Table = ({ loading, data, openModal, campaignuuid, slug }: Props) => {
  return (
    <>
      {loading ? (
        <TableLoader />
      ) : data.length === 0 ? (
        <TableNoResult
          headerText="Data Posting"
          mainMessage="This campaign doesn't have a custom routes yet"
          renderButton={
            <HeaderButton
              buttonText="Create new Route"
              openFunction={() => openModal()}
            />
          }
          subMessage="Would you like to create one? Just hit the “Create new route” button."
        />
      ) : (
        <>
          <AsyncTable
            headers={["Router name", "Upload URL", "Weight", "Status"]}
            tableData={data}
            render={(routes: any, { row, cell }: any) => {
              return routes.map((item: any) => (
                <TableRow className={row} key={item.uuid}>
                  <UnderlineCell className={cell}>
                    <span>{item.name}</span>
                  </UnderlineCell>
                  <TableCell className={cell} style={{ color: "#777777" }}>
                    {item.upload_url}
                  </TableCell>
                  <TableCell className={cell} style={{ color: "#777777" }}>
                    {item.route_continue}
                  </TableCell>
                  <ActiveCell className={cell} style={{ color: "#777777" }}>
                    {item.active}
                  </ActiveCell>
                </TableRow>
              ));
            }}
          />
        </>
      )}
    </>
  );
};

export default Table;
