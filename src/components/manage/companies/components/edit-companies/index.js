import React, { Component } from "react";
import { NavTabs } from "common-components";
import { TabComponent } from "./tabs";
import { Paper } from "@material-ui/core";

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

class EditCompanies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: {},
      loadingState: false
    };
  }

  componentDidMount() {
    this.getCompanyData();
  }
  getCompanyData = () => {
    /* this.setState({ loadingState: true });
    get(`/identity/company/${this.props.match.params.company_uuid}/`).then(
      result => {
        this.setState({ company: result.data, loadingState: false });
      }
    ); */
    this.setState({
      company: companyData
    });
  };
  render() {
    console.log(this.state, this.props);
    return (
      <div>
        <NavTabs
          data={this.state.company}
          tabnames={[]}
          history={this.props.history}
          back={{
            name: "Back to companies",
            url: "/manage/companies/"
          }}
          loadingState={this.state.loadingState}
        />
        <Paper square={true} style={{ paddingTop: 15 }}>
          <TabComponent
            companyData={companyData}
            params={this.props.match.params}
            companySettingsData={this.state.company}
          />
        </Paper>
      </div>
    );
  }
}

export { EditCompanies };
