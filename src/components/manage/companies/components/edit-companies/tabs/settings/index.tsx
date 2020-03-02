import React, { Component } from "react";
import EditForm from "./Form";
import { TableLoader } from "common-components";
import { get, patch } from "utils/api";
import SEO from "utils/seo";

interface IProps {
  history?: any;
  params: any;
  handleUpdateHeader: Function;
}

interface IState {
  loading: boolean;
  company: any;
}

class ManageCompanies extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false,
      company: []
    };
  }
  componentDidMount() {
    this.getCompanyData();
  }
  getCompanyData = () => {
    this.setState({ loading: true });
    get(
      `/identity/company/${this.props.params.uuid}/?order_by=-datetime_modified`
    ).then((result: any) => {
      this.setState({ company: result.data, loading: false });
    });
  };
  handleFormSubmit = (e: any, companyDetails: any) => {
    e.preventDefault();
    this.setState({ loading: true });
    patch(`/identity/company/${this.state.company.uuid}/`, companyDetails).then(
      (res: any) => {
        this.setState({
          company: res.data,
          loading: false
        });
        this.getCompanyData();
        this.props.handleUpdateHeader(companyDetails);
      }
    );
  };

  render() {
    return (
      <>
        <SEO
          title={
            this.state.company && `Edit Company: ${this.state.company.name}`
          }
        />
        {this.state.loading ? (
          <TableLoader />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 30,
              minWidth: 500,
              paddingBottom: 30
            }}
          >
            {this.state.company && (
              <>
                <EditForm
                  company={this.state.company}
                  handleFormSubmit={this.handleFormSubmit}
                  history={this.props.history}
                />
              </>
            )}
          </div>
        )}
      </>
    );
  }
}

export default ManageCompanies;
