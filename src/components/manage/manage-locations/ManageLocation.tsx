import React, { useState, useEffect } from "react";
import axios from "axios";
//material-ui imports
import LocationTable from "./LocationTable";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
//common-components imports
import {
  HeaderLink,
  TableLoader,
  SearchBar,
  Pagination,
  FilterToolBar
} from "common-components";
import { get } from "utils/api";
import { LocationData } from "./mockData";
function ManageLocation(props: any) {
  const [state, setState] = useState({
    loading: true,
    popper: false,
    open: false,
    load: false,
    success: false,
    nameMsg: "",
    anchorRef: null,
    formOrder: 0,
    userData: [],
    filterlist: [],
    realmsData: [],
    companyData: [],
    paginateList: [],
    innerLoading: false
  });

  useEffect(() => {
    handleUpdate();
    // eslint-disable-next-line
  }, []);

  // https://{{url_base}}/identity/location/list/
  const handleUpdate = () => {
    setState(state => {
      return { ...state, loading: true };
    });
    setTimeout(() => {
      return setState({
        ...state,
        userData: LocationData,
        filterlist: LocationData,
        paginateList: LocationData,
        loading: false
      });
    }, 1000);

    // get("/identity/location/list", {
    //   order_by: "-datetime_modified"
    // }).then((res: any) =>
    //   setState({
    //     ...state,
    //     userData: res.data,
    //     filterlist: res.data,
    //     paginateList: res.data,
    //     loading: false
    //   })
    // );
    // get(
    //   `http://5e0ea3d79576aa0014665fbe.mockapi.io/identity/location/list`
    // ).then(res => {
    //   setState({ ...state, rolesData: res.data });
    // });
    // get(
    //   "http://5e0ea3d79576aa0014665fbe.mockapi.io/identity/location/list"
    // ).then(res => setState({ ...state, realmsData: res.data }));

    // get(
    //   `http://5e0ea3d79576aa0014665fbe.mockapi.io/identity/location/list`
    // ).then(res => {
    //   setState({ ...state, companyData: res.data });
    // });
  };

  // handleFilter = url => {
  //   this.setState({ innerLoading: true })
  //   const token = localStorage.getItem('ngStorage-ppToken')
  //   axios
  //     .get(url, {
  //       headers: { Authorization: `Token ${token}` }
  //     })
  //     .then(res => {
  //       this.setState({ userData: res.data })
  //       this.setState({ innerLoading: false })
  //     })
  // }

  const FilterApplyButton = (params: any) => {
    setState({ ...state, loading: true });
    // var parameter = {
    //   ...(params.sortby !== " " && { order_by: params.sortby }),
    //   ...(params.active !== " " && { active: params.active }),
    //   ...(params.company !== " " && { company: params.company }),
    //   ...(params.realm !== " " && { realms: params.realm }),
    //   ...(params.campaign !== " " && { campaigns: params.campaign }),
    //   ...(params.roles !== " " && { groups: params.roles }),
    //   ...(params.hasCompany !== " " && { no_company: !params.hasCompany })
    // };

    // get(
    //   "http://5e0ea3d79576aa0014665fbe.mockapi.io/identity/location/list",
    //   parameter
    // ).then((res: any) => {
    //   setState({
    //     ...state,
    //     userData: res.data,
    //     filterlist: res.data,
    //     paginateList: res.data,
    //     loading: false
    //   });
    // });
    setTimeout(() => {
      return setState({
        ...state,
        userData: LocationData,
        filterlist: LocationData,
        paginateList: LocationData,
        loading: false
      });
    }, 1000);
  };

  const paginate = (from: any, to: any) => {
    setState({
      ...state,
      userData: state.paginateList.slice(from, to)
    });
  };

  return (
    <>
      <div style={{ paddingBottom: 30 }}>
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
          title="Locations"
        />
      </div>
      <Paper style={{ height: 800 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "space-between",
            height: "100%"
          }}
        >
          <div style={{ width: "100%" }}>
            <SearchBar
              title="Location"
              userData={state.filterlist}
              headers={["name", "slug", "uuid"]}
              active={true}
              loading={state.loading}
              link={true}
              pathnameData={{
                firstLink: `/manage/locations/edit/`,
                fetchData: ["uuid"],
                lastLink: ``
              }}
            />
            <Divider />

            <FilterToolBar
              FilterApplyButton={FilterApplyButton}
              sortBy={true}
              activeStatus={true}
              realm={false}
              // realmData={state.realmsData}
              company={false}
              // companyData={state.companyData}
            />

            {state.loading ? (
              <TableLoader />
            ) : (
              <LocationTable
                userData={state.userData}
                handleUpdated={handleUpdate}
                innerLoading={state.innerLoading}
                filterlist={state.filterlist}
                headers={["Name", "Slug", "UUID", "Status", ""]}
              />
            )}

            <div style={{ width: "100%" }}>
              <Divider />
              {Boolean(state.paginateList.length) && (
                <Pagination
                  paginateFn={paginate}
                  totalItems={state.paginateList.length}
                  itemsPerPage={6}
                />
              )}
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
}
export default ManageLocation;
