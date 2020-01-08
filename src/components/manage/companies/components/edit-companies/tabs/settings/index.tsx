import React, { Component } from "react";
import EditForm from "./Form";
import { TableLoader } from "common-components";
//import { get, patch } from '../../../../utils/api'
import SEO from "utils/seo";

const companyData = {
  active: false,
  aws_bucket_name: "zarchives-adsfasdfsadf",
  datetime_created: "2019-10-28T02:46:00.958731Z",
  datetime_modified: "2020-01-02T04:35:20.505890Z",
  email: "",
  name: "aaaaayu",
  slug: "adsfasdfsadf",
  uuid: "133f0be0-f92d-11e9-bd51-0242ac110014",
  website: ""
};

interface IProps {
  history?: any;
  params: any;
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
      company: null
    };
  }
  componentDidMount() {
    this.getCompanyData();
  }
  getCompanyData = () => {
    this.setState({ loading: true });
    /* 
    get(`/identity/company/${this.props.params.company_uuid}/`, {
      order_by: '-datetime_modified'
    }).then(result => {
      this.setState({ company: result.data, loading: false })
    }) */
    setTimeout(() => {
      this.setState({
        company: companyData,
        loading: false
      });
    }, 1000);
  };
  handleFormSubmit = (e: any, companyDetails: any) => {
    e.preventDefault();
    this.setState({ loading: true });
    /* patch(`/identity/company/${this.state.company.uuid}/`, companyDetails)
      .then(res => {
        this.setState({
          company: res.data,
          loading: false
        })

        this.getCompanyData()
      })
      .catch(console.log()) */
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
