import React from "react";
import Divider from "@material-ui/core/Divider";
import { cancel, get, post } from "utils/api";
import {
  FilterToolBar,
  Pagination,
  SearchBar,
  TableLoader
} from "common-components";
//Table
import CampaignTable from "./CampaignTable";

interface IProps {}

interface IState {
  loading: boolean;
  popper: boolean;
  open: boolean;
  load: boolean;
  success: boolean;
  nameMsg: string;
  anchorRef: any;
  formOrder: number;
  userData: any;
  filterlist: any;
  realmsData: any;
  companyData: any;
  paginateList: any;
  innerLoading: boolean;
}

class ManageCampaigns extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
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
    };
  }
  componentDidMount() {
    this.handleUpdate();
  }

  handleUpdate = () => {
    this.setState({ loading: true });
    get("/identity/campaign/list/").then((res: any) => {
      this.setState({
        userData: res.data,
        filterlist: res.data,
        paginateList: res.data
      });
      this.setState({ loading: false });
    });
    get(`/identity/company/list/`).then((res: any) => {
      this.setState({ companyData: res.data });
    });

    get(`/identity/realm/list/`).then((res: any) => {
      this.setState({ realmsData: res.data });
    });
  };
  handlePopper = (event: any) => {
    this.setState({
      popper: true,
      anchorRef: event.target
    });
  };
  handlePopperClose = () => {
    this.setState({
      popper: false
    });
  };
  // change to modal
  // toggleSideNav = () => {
  //   this.setState({ sidenav: !this.state.sidenav });
  // };

  //Needed this method for the filtertoolbar component
  FilterApplyButton = (params: any) => {
    var parameter = {
      ...(params.sortby !== " " && { order_by: params.sortby }),
      ...(params.active !== " " && { active: params.active }),
      ...(params.company !== " " && { company: params.company }),
      ...(params.realm !== " " && { realms: params.realm }),
      ...(params.campaign !== " " && { campaigns: params.campaign }),
      ...(params.roles !== " " && { groups: params.roles }),
      ...(params.hasCompany !== " " && { no_company: !params.hasCompany })
    };

    get("/identity/campaign/list/", parameter).then((res: any) => {
      this.setState({
        userData: res.data,
        filterlist: res.data,
        paginateList: res.data
      });
    });
  };

  handleClose = () => {
    this.setState({ open: false, success: false });
  };
  handleOpen = () => {
    this.setState({ open: true, success: false });
  };
  handleCancel = () => {
    cancel();
    this.setState({ load: false });
  };

  handleNewCampaing = (data: any, errMsg: Object, setErrMsg: Function) => {
    const obj: any = {};
    if (!data.name || data.company.length === 0) {
      if (!data.name) obj.name = "A campaign name is required";
      if (!data.company) obj.addCompany = "A company is required";
    } else {
      this.setState({ load: true });
      post(`/identity/campaign/create/`, {
        name: data.name,
        company: data.company,
        realms: data.realms.map((realm: any) => realm.uuid)
      })
        .then((res: any) =>
          this.setState({
            userData: [res.data, ...this.state.userData],
            load: false,
            open: false,
            success: true,
            nameMsg: res.data.name
          })
        )
        .catch((err: any) => {
          if (err.response.data.name) {
            setErrMsg({ ...errMsg, name: err.response.data.name[0] });
            this.setState({ load: false });
          }
        });
    }
    setErrMsg(obj);
  };

  paginate = (from: number, to: number) => {
    this.setState({
      userData: this.state.paginateList.slice(from, to)
    });
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "space-between",
            height: "auto",
            width: "96%",
            padding: "2%",
            boxSizing: "content-box"
          }}
        >
          <div style={{ width: "100%" }}>
            <SearchBar
              title="Campaign"
              userData={this.state.filterlist}
              headers={["name", "slug", "uuid"]}
              loading={this.state.loading}
              link={true}
              pathnameData={{
                firstLink: `/manage/campaign/edit/`,
                fetchData: ["slug", "uuid"],
                lastLink: `/settings`
              }}
            />
            <Divider />

            <FilterToolBar
              FilterApplyButton={this.FilterApplyButton}
              sortBy={true}
              activeStatus={true}
              realm={true}
              company={true}
            />

            {this.state.loading ? (
              <TableLoader />
            ) : (
              <CampaignTable
                userData={this.state.userData}
                // handleUpdated={this.handleUpdate}
                innerLoading={this.state.innerLoading}
                headers={["Name", "Slug", "UUID", "Status", ""]}
              />
            )}

            <div style={{ width: "100%" }}>
              <Divider />
              {Boolean(this.state.paginateList.length) && (
                <Pagination
                  paginateFn={this.paginate}
                  totalItems={this.state.paginateList.length}
                  itemsPerPage={10}
                />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default ManageCampaigns;
