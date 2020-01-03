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
import HeaderContainer from "../components/HeaderContainer/HeaderContainer";
import DIDTable from "../components/DIDTable/DIDTable";

const ManageDID = () => {
  const [loading, setLoading] = useState(true);
  const [didData, setDidData] = useState([]);
  const [paginateList, setPaginateList] = useState([]);
  const [campaigns, setCamapaigns] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchDIDs();
  }, []);

  const fetchDIDs = () => {
    setLoading(true);
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
    fetchCompanies();
    fetchCampaigns();
  };
  const fetchCompanies = () => {
    fetch(`http://5e0015181fb99500141403a4.mockapi.io/mock/v1/companies`)
      .then((response: any) => response.json())
      .then((response: any) => {
        console.log("companies", response);
        setCompanies(response);
      });
  };
  const fetchCampaigns = () => {
    setLoading(true);
    fetch(`http://5e0015181fb99500141403a4.mockapi.io/mock/v1/campaigns`)
      .then((response: any) => response.json())
      .then((response: any) => {
        console.log("campaigns", response);
        setCamapaigns(response);
      });
  };

  const paginate = (from: number, to: number) => {
    setDidData(paginateList.slice(from, to));
  };

  return (
    <>
      <HeaderContainer style={{ paddingBottom: 30 }}>
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
              onClickFn: () => console.log("")
            },
            {
              name: "SEARCH DIDS",
              active: true,
              onClickFn: () => console.log("")
            }
          ]}
        />
      </HeaderContainer>
      <Paper>
        <SearchBar
          title="dids"
          userData={didData}
          headers={["number", "timezone"]}
          loading={loading}
        />
        <Divider />
        <FilterToolBar
          FilterApplyButton={() => console.log("")}
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
