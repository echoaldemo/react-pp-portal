/*eslint-disable */
import React, { useState, useEffect } from "react";
import { Paper, Divider } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import SEO from "utils/seo";
import {
  HeaderLink,
  HeaderButton,
  Pagination,
  SearchBar
} from "common-components";
import DNCTable from "./components/DNCTable";
// import NewDidPool from "./components/NewDidPool";
import { get } from "utils/api";

interface IProps {}

const DNC: React.FC<IProps> = ({}) => {
  const [dnc, setDnc] = useState<any>([]);
  const [paginateList, setPaginateList] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);

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
      <SEO title="Manage Companies" />
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
        <HeaderButton openFunction={() => {}} buttonText="DNC List" />
      </div>
      <SearchBar
        title="Company"
        userData={tableData}
        headers={["name"]}
        link={true}
        pathnameData={{
          firstLink: `/manage/companies/edit/`,
          fetchData: ["slug", "uuid"],
          lastLink: ``
        }}
      />
      <Divider />
      <Paper style={{ height: "auto" }}>
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
    </div>
  );
};

export default DNC;
