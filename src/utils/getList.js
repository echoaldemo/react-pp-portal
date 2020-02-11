import { get } from "./api";

const getAllList = dispatch => {
  return Promise.all([
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
};

export { getAllList };
