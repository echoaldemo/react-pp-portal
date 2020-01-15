import React, { Component } from "react";
import { withStyles } from "@material-ui/core";

import { TableLoader } from 'common-components';
import DNDCards from '../cards/DNDCards';

// import { get } from "../../../../utils/api";

const styles = {
  container: {
    padding: 30
  },
  cardContainer: {
    width: 475
  }
};

const defaultState = {
  loadingState: false,

  activeTestData: [],
  globalTestData: [],
  companyTestData: [],
  activeData: []
};
class RRTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...defaultState
    };
  }
  componentDidMount() {
    // this.getAllData();
  }

  getAllData = () => {
    // this.setState({ loadingState: true });
    // get(`/pitch/company/${this.props.company.slug}/rapid-response/tests/`)
    //   .then(res => {
    //     this.setState({ companyTestData: res.data });
    //   })
    //   .then(() => {
    //     get(`/pitch/global/rapid-response/tests/`).then(globalRes => {
    //       this.setState({
    //         globalTestData: globalRes.data,
    //         loadingState: false
    //       });
    //     });
    //   })
    //   .catch(err => {
    //     alert("Failed to load data");
    //   });
  };

  setActiveData = data => {
    this.setState({
      activeData: data
    });
  };
  saveActiveSegment = data => {
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
              <TableLoader
                headerText="Rapid Response Test"
                message="Loading All test"
              />
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