import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { TableLoader } from "common-components";
import CallsAndSMS from "./CallsAndSMS/CallsAndSMS";
import Days from "./Days/Days";

const styles: any = (theme: any) => ({
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
    fontSize: "14px",
    fontWeight: 600,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#7c8a97"
  }
});
interface Props {
  id: any;
  campaignDetails: any;
  CDDataChange: any;
  CDcallsmsChange: any;
  audio: any;
  loaded: any;
}
interface State {
  schedule: number;
  loading: boolean;
  tabs: any;
  timeout?: any;
}
class Schedule extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      schedule: 0,
      loading: true,
      tabs: [
        { id: 0, name: "Days" },
        { id: 1, name: "Calls & SMS" }
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

  scheduleTabChange = (e: any, value: number) => {
    this.setState({
      schedule: value,
      loading: true,
      timeout: setTimeout(() => {
        this.setState({
          loading: false
        });
      }, 500)
    });
  };

  render() {
    const {
      classes,
      id,
      campaignDetails,
      CDcallsmsChange,
      audio,
      loaded
    }: any = this.props;
    return (
      <React.Fragment>
        <AppBar position="static" className={classes.tab}>
          <Tabs value={this.state.schedule} onChange={this.scheduleTabChange}>
            {this.state.tabs.map((tab: any) => (
              <Tab
                value={tab.id}
                label={tab.name}
                wrapped
                className={classes.text}
                key={tab.id}
                id={tab.id}
              />
            ))}
          </Tabs>
        </AppBar>
        {this.state.loading ? (
          <TableLoader />
        ) : this.state.schedule === 0 ? (
          <Days id={this.props.id} />
        ) : (
          <CallsAndSMS
            id={id}
            callsms={campaignDetails.callsms}
            CDcallsmsChange={CDcallsmsChange}
            audio={audio}
            loaded={loaded}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Schedule);
