import React from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Settings from "@material-ui/icons/Settings";
import { mockData } from "../../../Campaigns/mockData";

// import api from "../../../../services/fetchApi";

const styles = {
  root: {
    padding: "15px",
    backgroundColor: "white",
    marginBottom: "10px",
    "&:hover": {
      backgroundColor: "#F8F9FA"
    }
  },
  eventHeader: {
    display: "flex",
    justifyContent: "space-between"
  },
  iconButton: {
    marginTop: "-12px"
  },
  settingsIcon: {
    height: "20px",
    color: "#444851"
  },
  sms: {
    textDecoration: "underline",
    fontWeight: 600
  }
};
interface Props {
  key: any;
  editSchedule: any;
  color: any;
  minutes: any;
  message: any;
  id: any;
}
class HeaderDays extends React.Component<Props, { minutes: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      minutes: ""
    };
  }

  fetchMinutes = () => {
    mockData.options[7].preSchedMinutes.forEach((ress: any) => {
      if (ress.id === this.props.minutes) {
        this.setState({ minutes: ress.value });
      }
    });

    // api.fetch(`/options`, "get")
    //   .then(res => {
    //     res.data[7].preSchedMinutes.forEach(ress => {
    //       if (ress.id === this.props.minutes) {
    //         this.setState({ minutes: ress.value });
    //       }
    //     });
    //   });
  };

  componentDidMount() {
    this.fetchMinutes();
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.minutes !== prevProps.minutes) {
  //     this.fetchMinutes();
  //   }
  // }

  render() {
    const { classes, editSchedule }: any = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.eventHeader}>
          <Typography
            variant="body2"
            color="textPrimary"
            className={classes.sms}
          >
            SMS
          </Typography>
          <IconButton
            className={classes.iconButton}
            onClick={() => editSchedule(this.props.id)}
            id="edit-btn"
          >
            <Settings className={classes.settingsIcon} />
          </IconButton>
        </div>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          noWrap={true}
        >
          {this.props.message}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {this.state.minutes}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(HeaderDays);
