import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import SnackBar from "../../common-components/SnackBar";
import LoaderDialog from "../../common-components/LoaderDialog";
import Button from "@material-ui/core/Button";
import InputTextField from "../../common-components/InputTextField";
import { mockData } from "../../../Campaigns/mockData";

// import api from "../../../../services/fetchApi";

const styles = theme => ({
  formControl: {
    marginTop: theme.spacing(1),
    width: "100%",
    fontSize: "10px"
  },
  select: {
    marginTop: theme.spacing(3),
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    textAlign: "left",
    "& label": {
      color: "#999999",
      fontSize: "20px",
      fontWeight: "bold",
      marginTop: "-10px",
      textOverflow: "ellipsis"
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(238, 238, 238, 0.99)"
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "#1194f6"
    },
    "& label.Mui-focused": {
      color: "#1194f6"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1194f6"
    },
    "& .MuiFormHelperText-root": {
      width: "100%",
      color: "#999999",
      fontSize: "12px"
    },
    "& .MuiSelect-selectMenu": {
      fontSize: "18px",
      color: "#444851"
    },
    marginBottom: "40px"
  },
  menu: {
    width: 200
  },
  footer: {
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: "14px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#999999"
  },
  addBtn: {
    width: "100%",
    backgroundColor: "#b6d36b",
    color: "white",
    "&:hover": {
      background: "#98b159"
    }
  },
  label: {
    "& .MuiFormControlLabel-label": {
      color: "#444851"
    }
  }
});

const checkBoxStyles = {
  root: {
    "&$checked": {
      color: "#1194f6"
    }
  },
  checked: {}
};
const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

class CampaignDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      name: this.props.campaignDetails.name,
      longTransfer: this.props.campaignDetails.longTransfer,
      closeLead: this.props.campaignDetails.closeLead,
      closeDuration: this.props.campaignDetails.closeDuration,
      revenue: this.props.campaignDetails.revenue,
      setLongTransfers: this.props.campaignDetails.setLongTransfers,
      repostRules: this.props.campaignDetails.repostRules,
      errorName: false,
      errorRevenue: false,
      LongTransferData: [],
      CloseLeadData: [],
      CloseDurationData: [],
      RepostRulesData: [],
      message: "",
      open: false,
      loaderDialog: false,
      originalname: this.props.campaignDetails.name,
      originallongTransfer: this.props.campaignDetails.longTransfer,
      originalcloseLead: this.props.campaignDetails.closeLead,
      originalcloseDuration: this.props.campaignDetails.closeDuration,
      originalrevenue: this.props.campaignDetails.revenue,
      originalsetLongTransfers: this.props.campaignDetails.setLongTransfers,
      originalrepostRules: this.props.campaignDetails.repostRules
    };
  }

  componentDidMount = () => {
    // fetch("http://localhost:4000/options")
    //   .then(data => data.json())
    console.log(mockData.options);
    this.setState({
      LongTransferData: mockData.options[3].longTransfer,
      CloseLeadData: mockData.options[4].closeLead,
      CloseDurationData: mockData.options[5].closeDuration,
      RepostRulesData: mockData.options[6].repostRules
    });
    // api.fetch(`/options`, "get").then(res => {
    // this.setState({
    //   LongTransferData: res.data[3].longTransfer,
    //   CloseLeadData: res.data[4].closeLead,
    //   CloseDurationData: res.data[5].closeDuration,
    //   RepostRulesData: res.data[6].repostRules
    // });
    // });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleCheckBoxChange = () => {
    this.setState({
      setLongTransfers: !this.state.setLongTransfers
    });
  };

  handleSnackBar = () => {
    this.setState({
      open: true,
      message: `Campaign details updated.`
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  updateCampaignDetails = () => {
    this.setState({
      loaderDialog: true
    });

    setTimeout(() => {
      this.setState({
        loaderDialog: false,
        originalname: this.state.name,
        originallongTransfer: this.state.longTransfer,
        originalcloseLead: this.state.closeLead,
        originalcloseDuration: this.state.closeDuration,
        originalrevenue: this.state.revenue,
        originalsetLongTransfers: this.state.setLongTransfers,
        originalrepostRules: this.state.repostRules
      });
      this.props.updateCampaigndetails(
        this.state.name,
        this.state.longTransfer,
        this.state.closeLead,
        this.state.closeDuration,
        this.state.revenue,
        this.state.setLongTransfers,
        this.state.repostRules
      );
      this.handleSnackBar();
    }, 3000);
  };

  // checks if the input for campaign name is empty and displays error when it is emplty
  checkName = event => {
    if (event.target.value.length === 0) {
      this.setState({
        errorName: true
      });
    } else {
      this.setState({
        errorName: false
      });
    }
  };

  // checks if the input for revenue is empty and displays error when it is emplty
  checkRevenue = event => {
    if (event.target.value.length === 0 || event.target.value === "0") {
      this.setState({
        errorRevenue: true
      });
    } else {
      this.setState({
        errorRevenue: false
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <InputTextField
              label="Campaign Name"
              name="name"
              value={this.state.name}
              handleTextChange={this.handleChange}
              keyup={this.checkName}
              error={this.state.errorName}
              required={true}
              type="text"
            />
            <TextField
              select
              label="Long Transfer"
              name="longTransfer"
              required
              className={classes.select}
              value={this.state.longTransfer}
              onChange={this.handleChange}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              margin="normal"
            >
              {this.state.LongTransferData.map((option, i) => (
                <MenuItem
                  key={option.value}
                  id={`longTransfer${i}`}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Close lead after being on a"
              name="closeLead"
              required
              className={classes.select}
              value={this.state.closeLead}
              onChange={this.handleChange}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              margin="normal"
            >
              {this.state.CloseLeadData.map((option, i) => (
                <MenuItem
                  key={option.value}
                  id={`closeLead${i}`}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Close duration"
              name="closeDuration"
              required
              className={classes.select}
              value={this.state.closeDuration}
              onChange={this.handleChange}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              margin="normal"
            >
              {this.state.CloseDurationData.map((option, i) => (
                <MenuItem
                  key={option.value}
                  id={`closeDuration${i}`}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <InputTextField
              label="Revenue per conversion"
              name="revenue"
              type="number"
              value={this.state.revenue}
              handleTextChange={this.handleChange}
              keyup={this.checkRevenue}
              error={this.state.errorRevenue}
              required={true}
              helperText={
                <React.Fragment>
                  <span>
                    Setting revenue per conversion will enable the ROI Report if
                    you post back
                  </span>
                  <span>conversion data on your leads</span>
                </React.Fragment>
              }
            />
            <FormControl className={classes.formControl}>
              <FormControlLabel
                control={
                  <CustomCheckbox
                    id="campaignDetailsCheckbox"
                    color="primary"
                    checked={this.state.setLongTransfers}
                    onChange={this.handleCheckBoxChange}
                    value={this.state.setLongTransfers}
                  />
                }
                label={"Automatically set long transfers as converted"}
                className={classes.label}
              />
            </FormControl>
            <TextField
              select
              label="Repost rules"
              name="repostRules"
              required
              className={classes.select}
              value={this.state.repostRules}
              onChange={this.handleChange}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              margin="normal"
              style={{ marginTop: "30px" }}
              helperText={
                <React.Fragment>
                  <span>
                    Setting for duplicate leads being posted to this campaign
                    via the API.
                  </span>
                  <span>
                    Disclaimer: Reposting a lead will overwrite the existing
                    lead's stats.
                  </span>
                </React.Fragment>
              }
            >
              {this.state.RepostRulesData.map((option, i) => (
                <MenuItem
                  key={option.value}
                  id={`repostRules${i}`}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ marginTop: "30px", marginBottom: "10px" }}
        >
          <Grid item xs={12} sm={8} md={9} lg={9}>
            <p className={classes.footer}>*Required fields</p>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            {this.state.name !== this.state.originalname ||
              this.state.revenue !== this.state.originalrevenue ||
              this.state.setLongTransfers !==
              this.state.originalsetLongTransfers ||
              this.state.repostRules !== this.state.originalrepostRules ||
              this.state.closeDuration !== this.state.originalcloseDuration ||
              this.state.closeLead !== this.state.originalcloseLead ||
              this.state.longTransfer !== this.state.originallongTransfer ? (
                <Button
                  variant="contained"
                  id="campaignDetailsSave"
                  className={classes.addBtn}
                  onClick={this.updateCampaignDetails}
                  disabled={this.state.name ? false : true}
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

export default withStyles(styles)(CampaignDetails);
