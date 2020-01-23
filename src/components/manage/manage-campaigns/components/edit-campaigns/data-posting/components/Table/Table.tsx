import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TableRow, TableCell } from "@material-ui/core";
import {
  AsyncTable,
  TableLoader,
  ActiveCell,
  TableNoResult,
  HeaderButton,
  UnderlineCell,
  EditButton
} from "common-components";
import NewRouteModal from "../NewRouteModal/NewRouteModal";

interface Props {
  loading: boolean;
  data: any[];
  handleCreate: any;
  campaignuuid: string;
  slug: string;
}
const classes = {
  headerText: {
    fontSize: 20
  },
  statusText: {
    fontSize: 20
  }
};

const Table = ({ loading, data, handleCreate, campaignuuid, slug }: Props) => {
  const [addNewRoute, setAddNewRoute] = useState<any>({
    openModal: false
  });

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
              openFunction={() =>
                setAddNewRoute({ ...addNewRoute, openModal: true })
              }
            />
          }
          subMessage="Would you like to create one? Just hit the “Create new route” button."
        />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 12
            }}
          >
            <span style={classes.headerText}>Data posting settings</span>

            <HeaderButton
              buttonText="New Route"
              openFunction={() =>
                setAddNewRoute({ ...addNewRoute, openModal: true })
              }
            />
          </div>
          <AsyncTable
            headers={["Router name", "Upload URL", "Status", ""]}
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
                  <ActiveCell className={cell} style={{ color: "#777777" }}>
                    {item.active}
                  </ActiveCell>
                  <TableCell className={cell} style={{ textAlign: "right" }}>
                    <Link
                      to={{
                        pathname: `/manage/edit/router/${item.campaign}/${item.uuid}`,
                        state: {
                          router: item,
                          campaign_uuid: campaignuuid,
                          slug: slug
                        }
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <EditButton text="Edit" onClickFunc={() => {}} />
                    </Link>
                  </TableCell>
                </TableRow>
              ));
            }}
          />
        </>
      )}
      <NewRouteModal
        open={addNewRoute.openModal}
        onClose={() => setAddNewRoute({ ...addNewRoute, openModal: false })}
        openFn={() => setAddNewRoute({ ...addNewRoute, openModal: true })}
        handleCreate={handleCreate}
      />
    </>
  );
};

export default Table;
