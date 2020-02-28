import React, { Component } from "react";
import { BackButton, StatusLabel, TableLoader } from "common-components";
import { TabComponent } from "./tabs";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import { styles } from "./style";
import { get } from "utils/api";

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
  render() {
    const { classes } = this.props;
    return (
      <div>
        <BackButton text="Back to companies" to="/manage/companies" />
        <div className={classes.nameContainer}>
          <p>{this.state.company.name}</p>
          <StatusLabel status={this.state.company.active} />
        </div>
        <Paper square={true} style={{ paddingTop: 15 }}>
          {this.state.company.uuid !== undefined ? (
            <TabComponent
              companyData={this.state.company}
              params={this.props.match.params}
              companySettingsData={this.state.company}
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
