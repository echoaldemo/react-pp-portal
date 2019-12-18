# ** Filter Tool Bar **

## Sample Code

```
import FilterToolBar from "../../common-components/filter/FilterToolBar";

  const FilterApplyButton = params => {
    var parameter = {
      ...(params.sortby !== " " && { order_by: params.sortby }),
      ...(params.active !== " " && { is_active: params.active }),
      ...(params.company !== " " && { company: params.company }),
      ...(params.campaign !== " " && { campaigns: params.campaign }),
      ...(params.roles !== " " && { groups: params.roles }),
      ...(params.hasCompany !== " " && { no_company: !params.hasCompany })
    };

    get("/identity/user/manage/list/", parameter).then(res => {
      setUserData(res.data.results);
      setfilterlist(res.data.results);
      setPaginateList(res.data.results);
    });
  };


   <FilterToolBar
      title="User"
      FilterApplyButton={FilterApplyButton}
      sortByUser={true} //this is used for manage user sort
      // sortBy={true} //this is used for normal sorting
      activeStatus={true}
      // realm={true}
      hasCompany={true}
      company={true}
      campaign={true}
      roles={true}
    />

-------- | ------- | ------- |
| title             | string  | ------- |
| FilterApplyButton | method  | ------- |
| sortByUser        | boolean | false   |
| sortBy            | boolean | false   |
| activeStatus      | boolean | false   |
| realm             | boolean | false   |
| hasCompany        | boolean | false   |
| company           | boolean | false   |
| campaign          | boolean | false   |
| roles             | boolean | false   |

```