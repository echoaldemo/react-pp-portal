import React, { useState, useEffect, useContext } from "react";
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
import { store } from "contexts/ManageComponent";
function ManageLocation(props: any) {
  const { state } = useContext(store);
  const [states, setState] = useState({
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
    innerLoading: false,
    rolesData: []
  });

  useEffect(() => {
    handleUpdate();
    // eslint-disable-next-line
  }, []);

  // https://{{url_base}}/identity/location/list/
  const handleUpdate = () => {
    setState({ ...states, loading: true });
    setTimeout(() => {
      setState({
        ...states,
        userData: state.location,
        filterlist: state.location,
        paginateList: state.location,
        loading: false,
        rolesData: state.roles,
        realmsData: state.realms,
        companyData: state.companies
      });
    }, 1000);
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
    setState({ ...states, loading: true });
    var parameter = {
      ...(params.sortby !== " " && { order_by: params.sortby }),
      ...(params.active !== " " && { active: params.active }),
      ...(params.company !== " " && { company: params.company }),
      ...(params.realm !== " " && { realms: params.realm }),
      ...(params.campaign !== " " && { campaigns: params.campaign }),
      ...(params.roles !== " " && { groups: params.roles }),
      ...(params.hasCompany !== " " && { no_company: !params.hasCompany })
    };

    get("/identity/location/list", parameter).then((res: any) => {
      setState({
        ...states,
        userData: res.data,
        filterlist: res.data,
        paginateList: res.data,
        loading: false
      });
    });
    // setTimeout(() => {
    //   return setState({
    //     ...states,
    //     userData: LocationData,
    //     filterlist: LocationData,
    //     paginateList: LocationData,
    //     loading: false
    //   });
    // }, 1000);
  };

  const paginate = (from: any, to: any) => {
    setState({
      ...states,
      userData: states.paginateList.slice(from, to)
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
            },
            {
              title: "DNC List",
              path: "/manage/dnc"
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
              userData={states.filterlist}
              headers={["name", "slug", "uuid"]}
              active={true}
              loading={states.loading}
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
              // realmData={states.realmsData}
              company={false}
              // companyData={states.companyData}
            />

            {states.loading ? (
              <TableLoader />
            ) : (
              <LocationTable
                userData={states.userData}
                handleUpdated={handleUpdate}
                innerLoading={states.innerLoading}
                filterlist={states.filterlist}
                headers={["Name", "Slug", "UUID", "Status", ""]}
              />
            )}

            <div style={{ width: "100%" }}>
              <Divider />
              {Boolean(states.paginateList.length) && (
                <Pagination
                  paginateFn={paginate}
                  totalItems={states.paginateList.length}
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
