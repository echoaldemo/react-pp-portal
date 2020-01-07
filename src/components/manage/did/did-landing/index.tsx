import React, { useState, useEffect } from "react";
import { Paper, Divider } from "@material-ui/core";
import {
  HeaderLink,
  NavTabs,
  TableLoader,
  SearchBar,
  FilterToolBar,
  Pagination
} from "common-components";
import DIDTable from "../components/DIDTable/DIDTable";

const ManageDID = ({ history }: any) => {
  const [loading, setLoading] = useState(true);
  const [didData, setDidData] = useState([]);
  const [paginateList, setPaginateList] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchDIDs();
  }, []);

  const fetchDIDs = () => {
    fetch(`http://5e0015181fb99500141403a4.mockapi.io/mock/v1/dids`)
      .then((response: any) => response.json())
      .then((response: any) => {
        let newResponse = response.map((did: any) => {
          let uuid = did.uuid;
          delete did.uuid;
          did.uuid = uuid;
          did.number = `+${did.number.toString()}`;
          return did;
        });
        setDidData(newResponse);
        setPaginateList(newResponse);
        setLoading(false);
      });
  };

  const filterFn = (params: any) => {
    setLoading(true);
    if (params.active !== " ") {
      fetch(`http://5e0015181fb99500141403a4.mockapi.io/mock/v1/dids`)
        .then((response: any) => response.json())
        .then((response: any) => {
          const filtered = response.filter(
            (did: any) => did.active.toString() === params.active
          );
          setDidData(filtered);
          setPaginateList(filtered);
          setLoading(false);
        });
    } else {
      fetchDIDs();
    }
  };

  const paginate = (from: number, to: number) => {
    setDidData(paginateList.slice(from, to));
  };

  return (
    <>
      <div className="header-container">
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
            }
          ]}
          title="Dids"
          pathSensitive={true}
        />
        <NavTabs
          tabnames={[
            {
              name: "DID POOLS",
              active: false,
              onClickFn: () => history.push("/manage/did-pool")
            },
            {
              name: "SEARCH DIDS",
              active: true,
              onClickFn: () => console.log("")
            }
          ]}
        />
      </div>
      <Paper>
        <SearchBar
          title="dids"
          userData={didData}
          headers={["number", "timezone"]}
          loading={loading}
        />
        <Divider />
        <FilterToolBar
          FilterApplyButton={filterFn}
          company={true}
          campaign={true}
          status={true}
          sortBy={false}
          realm={false}
          activeStatus={false}
        />
        {loading ? (
          <TableLoader />
        ) : (
          <>
            <div style={{ minHeight: 500 }}>
              <DIDTable
                didData={didData}
                headers={[
                  "Number",
                  "Time Zone",
                  "Owned",
                  "Pool",
                  "CName",
                  "CName Valid",
                  "Status",
                  ""
                ]}
                fetchDIDs={fetchDIDs}
              />
              <Divider />
            </div>
            <Pagination
              totalItems={paginateList.length}
              itemsPerPage={10}
              paginateFn={paginate}
            />
          </>
        )}
      </Paper>
    </>
  );
};

export default ManageDID;
