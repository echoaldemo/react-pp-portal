import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Textfield from "../../common-components/Textfield";
import SnackBar from "../../common-components/SnackBar";
import Grid from "@material-ui/core/Grid";
import InputTextField from "../../common-components/InputTextField";
import LoaderDialog from "../../common-components/LoaderDialog";
import Button from "@material-ui/core/Button";
import { mockData } from "../../../Campaigns/mockData";

// import api from "../../../../services/fetchApi";

const styles: any = (theme: any) => ({
  footer: {
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: "14px",
    color: "#999999"
  },
  addBtn: {
    width: "100%",
    backgroundColor: "#b6d36b",
    color: "white",
    "&:hover": {
      background: "#98b159"
    }
  }
});
interface Props {
  delType: any;
  transfers: any;
  maxCps: any;
  leadsPerDay: any;
  id: any;
  updatDelSettings: any;
}
interface State {
  id: any;
  delTypeList: any;
  delType: any;
  open: boolean;
  message: any;
  errorLeads: boolean;
  errorCPS: boolean;
  leadsPerDay: any;
  transfers: any;
  maxCps: any;
  originalLeads: any;
  originalDelType: any;
  originalTransfers: any;
  originalMaxCps: any;
  loaderDialog: boolean;
  [x: number]: any;
}

class DeliverySettings extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: this.props.id,
      delTypeList: [],
      delType: this.props.delType,
      open: false,
      message: "",
      errorLeads: false,
      errorCPS: false,
      leadsPerDay: this.props.leadsPerDay,
      transfers: this.props.transfers,
      maxCps: this.props.maxCps,
      originalLeads: this.props.leadsPerDay,
      originalDelType: this.props.delType,
      originalTransfers: this.props.transfers,
      originalMaxCps: this.props.maxCps,
      loaderDialog: false
    };
  }
  componentDidMount = () => {
    this.setState({
      delTypeList: mockData.options[2].deliveryType
    });
    // api.fetch(`/options`, "get").then(res => {
    //   this.setState({
    //     delTypeList: res.data[2].deliveryType
    //   });
    // });
  };

  handleChange = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  checkLeads = (event: any) => {
    if (event.target.value.length === 0 || event.target.value === "0") {
      this.setState({
        errorLeads: true
      });
    } else {
      this.setState({
        errorLeads: false
      });
    }
  };

  checkCPS = (event: any) => {
    if (event.target.value.length === 0 || event.target.value === "0") {
      this.setState({
        errorCPS: true
      });
    } else {
      this.setState({
        errorCPS: false
      });
    }
  };

  updateDelSettings = () => {
    this.setState({
      loaderDialog: true
    });

    setTimeout(() => {
      this.setState({
        loaderDialog: false,
        originalLeads: this.state.leadsPerDay,
        originalDelType: this.state.delType,
        originalTransfers: this.state.transfers,
        originalMaxCps: this.state.maxCps
      });
      this.props.updatDelSettings(
        this.state.leadsPerDay,
        this.state.delType,
        this.state.transfers,
        this.state.maxCps
      );
      this.handleSnackBar();
    }, 3000);
  };

  handleSnackBar = () => {
    this.setState({
      open: true,
      message: `Delivery Settings updated.`
    });
  };

  handleClose = () => this.setState({ open: false });
  render() {
    const { classes }: any = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9} md={6} lg={6}>
            <InputTextField
              label="Leads per day"
              name="leadsPerDay"
              type="number"
              value={this.state.leadsPerDay}
              handleTextChange={this.handleChange}
              keyup={this.checkLeads}
              error={this.state.errorLeads}
              helperText="The maximum amount of leads to start in a day: 0 to unlimited."
              required={true}
            />
            <Textfield
              label="Delivery type"
              name="delType"
              input={this.state.delType}
              onchange={this.handleChange}
              values={this.state.delTypeList}
              require={true}
              field="delType"
            />
            <InputTextField
              label="Concurrent transfers"
              name="transfers"
              type="number"
              value={this.state.transfers}
              handleTextChange={this.handleChange}
              required={false}
            />
            <InputTextField
              label="Max CPS"
              name="maxCps"
              type="number"
              value={this.state.maxCps}
              handleTextChange={this.handleChange}
              keyup={this.checkCPS}
              error={this.state.errorCPS}
              required={true}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ marginTop: "50px", marginBottom: "20px" }}
        >
          <Grid item xs={12} sm={8} md={9} lg={9}>
            <p className={classes.footer}>*Required fields</p>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            {this.state.leadsPerDay !== this.state.originalLeads ||
            this.state.delType !== this.state.originalDelType ||
            this.state.transfers !== this.state.originalTransfers ||
            this.state.maxCps !== this.state.originalMaxCps ? (
              <Button
                id="updateDelivery"
                variant="contained"
                className={classes.addBtn}
                onClick={this.updateDelSettings}
              >
                Save
              </Button>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <LoaderDialog open={this.state.loaderDialog} />
        <SnackBar
          open={this.state.open}
          onClose={this.handleClose}
          message={this.state.message}
        />
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(DeliverySettings);
