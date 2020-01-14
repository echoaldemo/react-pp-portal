import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AIsettings from "./AI-settings/AIsettings";
import PhoneNumberSettings from "./PhoneNumber-settings/PhoneNumberSettings";
import DeliverySettings from "./Delivery-settings/DeliverySettings";
// import Loader from "../common-components/Loader";
import CampaignDetails from "./CampaignDetails/CampaignDetails";
import CallRecording from "./CallRecording/CallRecording";
import TransferCallback from "./TransferCallback/TransferCallback";
import CampaignHours from "./CampaignHours/CampaignHours";
import Textfield from "../common-components/Textfield";
import Hidden from "@material-ui/core/Hidden";
import { TableLoader } from "common-components"


const styles = theme => ({
  tab: {
    backgroundColor: "#eeeeee",
    color: "#7b8a96",
    marginBottom: theme.spacing(4),
    "& .MuiTab-textColorInherit.Mui-selected": {
      backgroundColor: "#1194f6",
      color: "#ffffff"
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "transparent"
    }
  },
  text: {
    fontFamily: "Roboto, Helvetica, sans-serif",
    // fontSize: "14px",
    fontWeight: 600,
    boxShadow: 0,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#7c8a97",
    "@media (min-width: 600px)": {
      minWidth: 73
    }
  }
});
class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      setting: 0,
      loading: true,
      tabs: [
        { id: 0, name: "Campaign Details" },
        { id: 1, name: "AI Settings" },
        { id: 2, name: "Phone Numbers" },
        { id: 3, name: "Delivery" },
        { id: 4, name: "Call Recording" },
        { id: 5, name: "Transfer Callback" },
        { id: 6, name: "Campaign Hours" }
      ]
    };
  }
  componentDidMount() {
    this.setState({
      timeout: setTimeout(() => {
        this.setState({
          loading: false
        });
      }, 1000)
    });
  }
  settingTabChange = (e, value) => {
    this.setState({
      setting: value,
      loading: true,
      timeout: setTimeout(() => {
        this.setState({
          loading: false
        });
      }, 1000)
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const {
      classes,
      id,
      campaignDetails,
      CDDataChange,
      updateCampaigndetails
    } = this.props;
    return (
      <React.Fragment>
        <Hidden smUp>
          <Textfield
            input={this.state.setting}
            name="setting"
            onchange={this.handleChange}
            values={this.state.tabs}
            require={true}
            field="delivery"
            variant="filled"
          />
        </Hidden>
        <Hidden only="xs">
          <AppBar position="static" className={classes.tab}>
            <Tabs
              variant="fullWidth"
              value={this.state.setting}
              onChange={this.settingTabChange}
            >
              {this.state.tabs.map(tab => (
                <Tab
                  data-cy={`settings${tab.id}`}
                  value={tab.id}
                  label={tab.name}
                  wrapped
                  className={classes.text}
                  key={tab.id}
                />
              ))}
            </Tabs>
          </AppBar>
        </Hidden>
        {this.state.loading ? (
          <TableLoader />
        ) : this.state.setting === 0 ? (
          <CampaignDetails
            id={id}
            CDDataChange={CDDataChange}
            campaignDetails={campaignDetails}
            updateCampaigndetails={updateCampaigndetails}
          />
        ) : this.state.setting === 1 ? (
          <AIsettings
            id={id}
            aiRules={campaignDetails.aiRules}
            voiceSched={campaignDetails.voiceSched}
            amd={campaignDetails.amd}
            updateAISettings={this.props.updateAISettings}
          />
        ) : this.state.setting === 2 ? (
          <PhoneNumberSettings
            id={id}
            numberList_id={campaignDetails.numberList_id}
            localMatch={campaignDetails.localMatch}
            updatPhoneNumbers={this.props.updatPhoneNumbers}
          />
        ) : this.state.setting === 3 ? (
          <DeliverySettings
            id={id}
            leadsPerDay={campaignDetails.leadsPerDay}
            delType={campaignDetails.delType}
            transfers={campaignDetails.transfers}
            maxCps={campaignDetails.maxCps}
            updatDelSettings={this.props.updatDelSettings}
          />
        ) : this.state.setting === 4 ? (
          <CallRecording
            id={id}
            CDDataChange={CDDataChange}
            recordCalls={campaignDetails.recordCalls}
          />
        ) : this.state.setting === 5 ? (
          <TransferCallback
            id={id}
            fallbackTransfer={campaignDetails.fallbackTransfer}
            fallbackTimeOut={campaignDetails.fallbackTimeOut}
            fallbackNumber={campaignDetails.fallbackNumber}
            origFallbackTimeOut={campaignDetails.fallbackTimeOut}
            origFallbackNumber={campaignDetails.fallbackNumber}
            updateTransferCallback={this.props.updateTransferCallback}
          />
        ) : this.state.setting === 6 ? (
          <CampaignHours id={id} details={campaignDetails} />
        ) : null}
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Settings);
