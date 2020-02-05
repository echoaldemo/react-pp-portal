import React, { useEffect, useState, useContext } from "react";
import { Card, Divider } from "@material-ui/core";
import {
  Pagination,
  HeaderLink,
  HeaderButton,
  SearchBar,
  FilterToolBar
} from "common-components";
import { NewUser } from "../users-new";
import { Edit } from "../users-edit";
import { UserTable } from "../components";
import { useStyles } from "./styles";
import { StateProvider, store } from "contexts/ManageComponent";

//API UTIL
import { get } from "utils/api";

const UserLandingSection = () => {
  const { state, dispatch } = useContext(store);
  const { users } = state;
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [is_new_user, setIsNewUser] = useState(false);
  const [is_user_edit, setIsUserEdit] = useState(false);
  const [activeUserData, setActiveUserData] = useState([]);

  const classes = useStyles();

  // *** FETCHING DATA USING API UTIL
  useEffect(() => {
    setLoading(true);
    // get("/identity/user/manage/list/", {
    //   limit: 10,
    //   order_by: "-datetime_modified"
    // }).then((res: any) => {
    //   dispatch({ type: "manage-user", payload: { users: res.data.results } });
    //   setLoading(false);
    // });

    Promise.all([
      get("/identity/user/manage/list/", {
        limit: 9999,
        order_by: "-datetime_modified"
      }),
      get("/identity/company/list/"),
      get("/identity/campaign/list/"),
      get("/identity/group/list/"),
      get("/identity/team/list/")
    ]).then(function(values) {
      setLoading(false);
      const userList = values[0].data.results;
      const companyList = values[1].data.results;
      const campaignList = values[2].data.results;
      const roleList = values[3].data.results;
      const teamList = values[4].data.results;

      dispatch({
        type: "manage-list",
        payload: { userList, companyList, campaignList, roleList, teamList }
      });
    });
  }, []);

  // useEffect(() => {
  //fetch("http://5e0015181fb99500141403a4.mockapi.io/mock/v1/users")
  //   let token = '00000'
  //   axios.request<any>(
  //     {
  //       method: 'get',
  //       headers: {'Authorization': `token ${token}`},
  //       url: 'https://dev-api.perfectpitchtech.com/identity/user/manage/list/?editable=true&limit=10&order_by=-datetime_modified'
  //     }
  //   ).then(({data}) => {
  //   // handle success
  //   console.log(data);
  //   setUsers(data.results);
  //   setLoading(false);
  // })
  // .catch((error) => {
  //   // handle error
  //   console.log(error);
  // })
  // }, []);

  const paginate: Function = (from: any, to: any) => {
    setUserData(users.slice(from, to));
  };

  //FOR MOCK DATA
  // const editUser = (id: any) => {
  //   let activeData = users.filter((key: any) => key.uuid === id);
  //   setActiveUserData(activeData[0]);
  //   setIsUserEdit(true);
  // };

  // *** UNCOMMENT FOR ACTUAL DATA ***
  const editUser = (id: any) => {
    get(`/identity/user/manage/${id}`).then((activeUser: any) => {
      setActiveUserData(activeUser.data);
      setIsUserEdit(true);
    });
  };

  const renderPagination: Function = () => {
    return (
      <>
        <Divider />
        <Pagination
          paginateFn={paginate}
          totalItems={users.length}
          itemsPerPage={10}
        />
      </>
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
      <>
        <SearchBar
          title="User"
          userData={users}
          headers={["username", "first_name", "last_name"]}
        />
        <Divider />
        <FilterToolBar
          sortBy={true}
          activeStatus={true}
          realm={false}
          company={true}
          campaign={true}
          hasCompany={true}
          roles={true}
          FilterApplyButton={(data: any) => console.log("Data: ", data)}
        />
      </>
    );
  };

  return (
    <>
      <NewUser
        open={is_new_user}
        setOpen={setIsNewUser}
        onClose={() => setIsNewUser(false)}
      />

      <Edit open={is_user_edit} setOpen={setIsUserEdit} data={activeUserData} />

      {renderHeader()}
      <Card square={true}>
        {renderFilter()}
        <div style={{ minHeight: 500 }}>
          <UserTable users={userData} loading={loading} setEdit={editUser} />
        </div>
        {!loading && renderPagination()}
      </Card>
    </>
  );
};
const UserLanding = () => {
  return (
    <StateProvider>
      <UserLandingSection />
    </StateProvider>
  );
};
export { UserLanding };
