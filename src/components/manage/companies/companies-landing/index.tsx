import { Divider, Paper } from "@material-ui/core";
import React, { Component } from "react";
import {
  FilterToolBar,
  HeaderButton,
  HeaderLink,
  Modal,
  Pagination,
  SearchBar,
  TableLoader
} from "common-components";
import { CompanyTable } from "../components/table";
import AddCompanyForm from "../components/add-company-form";
import SEO from "utils/seo";
import { get } from "utils/api";

interface IProps {}

interface IState {
  openDrawer: boolean;
  loading: boolean;
  userData: any;
  filterlist: any;
  paginateList: any;
  innerLoading: boolean;
}

class Companies extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      openDrawer: false,
      loading: false,
      userData: [],
      filterlist: [],
      paginateList: [],
      innerLoading: false
    };
  }
  handleUpdate = () => {
    this.setState({ loading: true });
    get("/identity/company/list/?order_by=-datetime_modified").then(
      (res: any) => {
        this.setState({
          userData: res.data,
          filterlist: res.data,
          paginateList: res.data,
          loading: false
        });
      }
    );
  };
  componentDidMount() {
    this.handleUpdate();
  }
  //Needed this method for the filtertoolbar component
  FilterApplyButton = (params: any) => {
    this.setState({ loading: true });
    var parameter = {
      ...(params.sortby !== " " && { order_by: params.sortby }),
      ...(params.active !== " " && { active: params.active }),
      ...(params.company !== " " && { company: params.company }),
      ...(params.campaign !== " " && { campaigns: params.campaign }),
      ...(params.roles !== " " && { groups: params.roles }),
      ...(params.hasCompany !== " " && { no_company: !params.hasCompany })
    };

    get("/identity/company/list/", parameter).then((res: any) => {
      this.setState({
        userData: res.data,
        filterlist: res.data,
        paginateList: res.data,
        loading: false
      });
    });
  };

  //Functions for creating new companies
  openDrawerHandler = () => {
    this.setState({ openDrawer: true });
  };

  handleClose = () => {
    this.setState({ openDrawer: false });
  };

  paginate = (from: number, to: number) => {
    this.setState({
      userData: this.state.paginateList.slice(from, to)
    });
  };

  render() {
    return (
      <>
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
              },
              {
                title: "DNC List",
                path: "/manage/dnc"
              }
            ]}
            title="Companies"
          />
          <HeaderButton
            openFunction={this.openDrawerHandler}
            buttonText="New Company"
          />
        </div>

        <Paper style={{ height: "auto" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "space-between",
              height: "auto"
            }}
          >
            <div style={{ width: "100%" }}>
              <SearchBar
                title="Company"
                userData={this.state.userData}
                headers={["name", "slug", "uuid"]}
                active={true}
                link={true}
                pathnameData={{
                  firstLink: `/manage/companies/edit/`,
                  fetchData: ["slug", "uuid"],
                  lastLink: ``
                }}
              />
              <Divider />
              {
                <FilterToolBar
                  FilterApplyButton={this.FilterApplyButton}
                  sortBy={true}
                  activeStatus={true}
                />
              }

              {this.state.loading ? (
                <TableLoader />
              ) : (
                <>
                  <CompanyTable
                    userData={this.state.userData}
                    innerLoading={this.state.innerLoading}
                    headers={[
                      "Name",
                      "Slug",
                      "Email",
                      "Website",
                      "UUID",
                      "Active",
                      " "
                    ]}
                  />
                  <div style={{ width: "100%" }}>
                    <Divider />
                    {Boolean(this.state.paginateList.length) && (
                      <Pagination
                        paginateFn={this.paginate}
                        totalItems={this.state.paginateList.length}
                        itemsPerPage={6}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </Paper>

        <Modal
          open={this.state.openDrawer}
          title={<b>Create new company</b>}
          onClose={() => this.setState({ openDrawer: false })}
        >
          <AddCompanyForm
            handleUpdate={this.handleUpdate}
            closeModal={() => this.setState({ openDrawer: false })}
            openModal={this.openDrawerHandler}
          />
        </Modal>
      </>
    );
  }
}

export { Companies };
