import React, { useEffect, useState, useContext } from "react";
import { Card, Divider, CircularProgress } from "@material-ui/core";
import {
  Pagination,
  HeaderLink,
  HeaderButton,
  SearchBar,
  FilterToolBar,
  Modal
} from "common-components";
import { NewUser } from "../users-new";
import { Edit } from "../users-edit";
import { UserTable } from "../components";
import { useStyles } from "./styles";
import { store } from "contexts/ManageComponent";

//API UTIL
import { get } from "utils/api";

const UserLanding = () => {
  const { state, dispatch } = useContext(store);
  const { users } = state;
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);
  const [is_new_user, setIsNewUser] = useState(false);
  const [is_user_edit, setIsUserEdit] = useState(false);
  const [activeUserData, setActiveUserData] = useState([]);

  const classes = useStyles();

  // *** FETCHING DATA USING API UTIL
  useEffect(() => {
    setLoading(true);

    Promise.all([
      get("/identity/user/manage/list/", {
        limit: 9999,
        order_by: "-datetime_modified"
      }),
      get("/identity/company/list/"),
      get("/identity/campaign/list/"),
      get("/identity/group/list/"),
      get("/identity/team/list/"),
      get("/identity/realm/list/")
    ]).then(function(values) {
      setLoading(false);
      const userList = values[0].data.results;
      const companyList = values[1].data;
      const campaignList = values[2].data;
      const roleList = values[3].data;
      const teamList = values[4].data;
      const realmList = values[5].data;

      dispatch({
        type: "manage-list",
        payload: {
          userList,
          companyList,
          campaignList,
          roleList,
          teamList,
          realmList
        }
      });
    });
  }, [dispatch]);

  const paginate: Function = (from: any, to: any) => {
    setUserData(users.slice(from, to));
  };

  const editUser = (id: any) => {
    setLoadingModal(true);
    get(`/identity/user/manage/${id}`).then((activeUser: any) => {
      setLoadingModal(false);
      setActiveUserData(activeUser.data);
      setIsUserEdit(true);
    });
  };

  //Needed this method for the filtertoolbar component
  const FilterApplyButton = (params: any) => {
    setLoading(true);
    const parameter = {
      ...(params.sortby !== " " && { order_by: params.sortby }),
      ...(params.active !== " " && { is_active: params.active }),
      ...(params.company !== " " && { company: params.company }),
      ...(params.campaign !== " " && { campaigns: params.campaign }),
      ...(params.roles !== " " && { groups: params.roles }),
      ...(params.hasCompany !== " " && {
        no_company: params.hasCompany === "true" ? false : true
      })
    };

    get("/identity/user/manage/list/", parameter).then((res: any) => {
      dispatch({
        type: "manage-users",
        payload: { userList: res.data.results }
      });
      setLoading(false);
    });
  };

  const updateData = (user: any) => {
    setLoading(true);
    get("/identity/user/manage/list/", {
      limit: 9999,
      order_by: "-datetime_modified"
    }).then((res: any) => {
      dispatch({
        type: "manage-users",
        payload: { userList: res.data.results }
      });
      setLoading(false);
    });
  };

  const renderPagination: Function = () => {
    return (
      <React.Fragment>
        <Divider />
        <Pagination
          paginateFn={paginate}
          totalItems={users.length}
          itemsPerPage={10}
        />
      </React.Fragment>
    );
  };

  const renderHeader: Function = () => {
    return (
      <div className={classes.header}>
        <HeaderLink
          pathSensitive={false}
          menu={[
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
          title="Users"
        />
        <HeaderButton
          noIcon={false}
          buttonText="New User"
          openFunction={() => setIsNewUser(true)}
        />
      </div>
    );
  };

  const renderFilter: Function = () => {
    return (
      <React.Fragment>
        <SearchBar
          title="User"
          userData={users}
          headers={["username", "first_name", "last_name"]}
          modalFunc={editUser}
        />
        <Divider />
        {state.companies.length !== 0 ? (
          <FilterToolBar
            filterData={state}
            sortBy={true}
            activeStatus={true}
            realm={false}
            company={true}
            campaign={true}
            hasCompany={true}
            roles={true}
            FilterApplyButton={FilterApplyButton}
          />
        ) : (
          <div style={{ height: 90 }} />
        )}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {state.companies.length !== 0 && (
        <NewUser
          open={is_new_user}
          setOpen={setIsNewUser}
          onClose={() => setIsNewUser(false)}
          updateData={updateData}
        />
      )}

      {loadingModal ? (
        <Modal
          open={loadingModal}
          onClose={() => setLoadingModal(false)}
          title="Edit user"
        >
          <div
            style={{
              textAlign: "center",
              height: "250px",
              fontSize: "17px",
              margin: "0 auto",
              display: "table"
            }}
          >
            <div
              style={{
                textAlign: "center",
                verticalAlign: "middle",
                display: "table-cell"
              }}
            >
              <CircularProgress style={{ width: "25px", height: "25px" }} />
              <p style={{ marginTop: "2%" }}>{"Loading..."}</p>
            </div>
          </div>
        </Modal>
      ) : (
        <Edit
          open={is_user_edit}
          setOpen={setIsUserEdit}
          data={activeUserData}
          update={updateData}
        />
      )}

      {renderHeader()}
      <Card square={true}>
        {renderFilter()}
        <div style={{ minHeight: 500 }}>
          <UserTable users={userData} loading={loading} setEdit={editUser} />
        </div>
        {!loading && renderPagination()}
      </Card>
    </React.Fragment>
  );
};

export { UserLanding };
