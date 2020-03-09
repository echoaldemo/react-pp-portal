/*eslint-disable */
import React, { useState, useEffect } from "react";
import { Paper, Divider, Menu, MenuItem, Typography } from "@material-ui/core";
import SEO from "utils/seo";
import {
  HeaderLink,
  HeaderButton,
  Pagination,
  SearchBar
} from "common-components";
import DNCTable from "./components/DNCTable";
import NewDncList from "./components/NewDncList";
import { get } from "utils/api";

interface IProps {}

const DNC: React.FC<IProps> = ({}) => {
  const [dnc, setDnc] = useState<any>([]);
  const [paginateList, setPaginateList] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [openNewDncList, setOpenNewDncList] = useState<any>(false);

  useEffect(() => {
    get("/dnc/list/").then((res: any) => {
      setDnc(res.data.results);
      setPaginateList(res.data.results);
      setTableData(res.data.results);
    });
  }, []);

  const paginate = (from: number, to: number) => {
    setTableData(paginateList.slice(from, to));
  };

  return (
    <div>
      <SEO title="Manage DNC Lists" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 30
        }}
      >
        <HeaderLink
          menu={[
            {
              title: "Users",
              path: "/manage/users"
            },
            {
              title: "Campaigns",
              path: "/manage/campaigns"
            },
            {
              title: "Companies",
              path: "/manage/companies"
            },
            {
              title: "Locations",
              path: "/manage/locations"
            },
            {
              title: "Realms",
              path: "/manage/realms"
            },
            {
              title: "DID Pools",
              path: "/manage/did-pool"
            },
            {
              title: "Dids",
              path: "/manage/dids"
            }
          ]}
          title="DNC"
        />
        <HeaderButton
          openFunction={() => setOpenNewDncList(true)}
          buttonText="DNC List"
        />
      </div>
      <Paper style={{ height: "auto" }}>
        <SearchBar
          title="DNC lists"
          userData={tableData}
          headers={["name"]}
          setActiveDataMethod={() => {}}
          settings={
            <>
              <MenuItem onClick={() => {}}>
                <Typography>Edit</Typography>
              </MenuItem>
              <MenuItem onClick={() => {}}>
                <Typography>Upload</Typography>
              </MenuItem>
            </>
          }
        />
        <Divider />
        <DNCTable state={tableData} />
        <Divider />
        {Boolean(paginateList.length) && (
          <Pagination
            paginateFn={paginate}
            totalItems={paginateList.length}
            itemsPerPage={10}
          />
        )}
      </Paper>
      <NewDncList
        open={openNewDncList}
        handleClose={() => setOpenNewDncList(false)}
      />
    </div>
  );
};

export default DNC;
