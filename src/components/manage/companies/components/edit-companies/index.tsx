import React, { Component } from "react";
import { BackButton, StatusLabel, TableLoader } from "common-components";
import { TabComponent } from "./tabs";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import { styles } from "./style";
import { get } from "utils/api";
import { company } from "components/manage/manage-campaigns/components/edit-campaigns/pitch/components/phrase-books/Mock";

interface IProps {
  match: any;
  classes: any;
}

interface IState {
  company: any;
  loadingState: boolean;
}

class EditCompaniesComponent extends Component<IProps, IState> {
  constructor(props: IProps) {
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
    this.setState({ loadingState: true });
    get(`/identity/company/${this.props.match.params.uuid}/`).then(
      (result: any) => {
        this.setState({ company: result.data, loadingState: false });
      }
    );
  };

  handleUpdateHeader = (data: any) => {
    this.setState({
      company: data
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <BackButton text="Back to companies" to="/manage/companies" />
        <div className={classes.nameContainer}>
          {this.state.company.uuid !== undefined ? (
            <>
              <p>{this.state.company.name}</p>
              <StatusLabel status={this.state.company.active} />
            </>
          ) : (
            <p>{"Loading..."}</p>
          )}
        </div>
        <Paper square={true} style={{ paddingTop: 15 }}>
          {this.state.company.uuid !== undefined ? (
            <TabComponent
              companyData={this.state.company}
              params={this.props.match.params}
              companySettingsData={this.state.company}
              handleUpdateHeader={this.handleUpdateHeader}
            />
          ) : (
            <TableLoader />
          )}
        </Paper>
      </div>
    );
  }
}

const EditCompanies = withStyles(styles)(EditCompaniesComponent);

export { EditCompanies };
