import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { TableLoader } from "common-components";
import DNDCards from "../cards/DNDCards";
import { styles } from "./styles";
import { get } from "utils/api";

interface IProps {
  classes: any;
  company: any;
}

interface IState {
  loadingState: boolean;
  activeTestData: Array<Object>;
  globalTestData: Array<Object>;
  companyTestData: Array<Object>;
  activeData: Array<Object>;
}

const defaultState = {
  loadingState: false,
  activeTestData: [
    { uuid: 1, name: "Programs" },
    { uuid: 2, name: "Portal" },
    { uuid: 3, name: "First-names-sentence" },
    { uuid: 4, name: "First-names-questions" }
  ],
  globalTestData: [],
  companyTestData: [],
  activeData: []
};
class RRTest extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      ...defaultState
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = () => {
    this.setState({ loadingState: true });
    get(`/pitch/company/${this.props.company.slug}/rapid-response/tests/`)
      .then((res: any) => {
        this.setState({ companyTestData: res.data });
      })
      .then(() => {
        get(`/pitch/global/rapid-response/tests/`).then((globalRes: any) => {
          this.setState({
            globalTestData: globalRes.data,
            loadingState: false
          });
        });
      })
      .catch((err: any) => {
        alert("Failed to load data");
      });
  };

  setActiveData = (data: any) => {
    this.setState({
      activeData: data
    });
  };
  saveActiveSegment = (data: any) => {
    //API request here for updating activeSegments
    this.setState({ activeTestData: data });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.loadingState ? (
          <>
            <div style={{ height: 600 }}>
              <TableLoader />
            </div>
          </>
        ) : (
          <div className={classes.container}>
            <DNDCards
              card1Title="Active segments"
              card2Title="Global segments"
              card3Title="Company segments"
              card1Data={this.state.activeTestData}
              card2Data={this.state.globalTestData}
              card3Data={this.state.companyTestData}
              saveActiveSegment={this.saveActiveSegment}
              setActiveData={this.setActiveData}
            />
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(styles)(RRTest);
