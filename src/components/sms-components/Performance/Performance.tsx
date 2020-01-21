import React, { Component, Fragment } from "react";

import { Paper, Grid, Typography } from "@material-ui/core";

import { withStyles } from "@material-ui/styles";
import { styles } from "./Styles/Performance";

import Activeness from "./Activeness";
import Field from "./Field";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import {
  PeopleOutline,
  LocalPhone,
  Shuffle,
  Message
} from "@material-ui/icons";

interface State {
  latestDate: any;
  totalActiveLeads: any;
  totalLiveCalls: any;
  totalOutBoundCalls: any;
  totalLongTransfers: any;
  totalTransfers: any;
  totalSMSReceived: any;
  totalSMSSent: any;
}
interface Props {
  campaigns: any;
  classes: any;
}

class Performance extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      latestDate: "Friday, August 30, 2019, 9:00:00 AM",
      totalActiveLeads: " - ",
      totalLiveCalls: " - ",
      totalOutBoundCalls: " - ",
      totalLongTransfers: " - ",
      totalTransfers: " - ",
      totalSMSReceived: " - ",
      totalSMSSent: " - "
    };
  }

  sum = (arrayData: any, field: any) => {
    if (arrayData.length === 0) return { [field]: 0 };
    return arrayData.reduce((a: any, b: any) => {
      return { [field]: Number(a[field]) + Number(b[field]) };
    });
  };

  componentDidUpdate({ campaigns }: any) {
    if (
      campaigns.map((c: any) => JSON.stringify(c)).join() !==
      this.props.campaigns.map((c: any) => JSON.stringify(c)).join()
    ) {
      this.setState({
        totalActiveLeads: this.sum(this.props.campaigns, "activeLeads")[
          "activeLeads"
        ].toFixed(3),
        totalLiveCalls: this.sum(this.props.campaigns, "liveCalls")[
          "liveCalls"
        ].toFixed(3),
        totalOutBoundCalls: this.sum(this.props.campaigns, "outboundCalls")[
          "outboundCalls"
        ].toFixed(3),
        totalLongTransfers: this.sum(this.props.campaigns, "longTransfer")[
          "longTransfer"
        ],
        totalTransfers: (
          this.sum(this.props.campaigns, "transfers")["transfers"] / 100
        ).toFixed(3),
        totalSMSReceived: this.sum(this.props.campaigns, "smsReceived")[
          "smsReceived"
        ],
        totalSMSSent: this.sum(this.props.campaigns, "smsSent")[
          "smsSent"
        ].toFixed(3),
        latestDate: this.props.campaigns.sort((a: any, b: any) => {
          let DateA: any = new Date(a.date);
          let DateB: any = new Date(b.date);

          return DateA - DateB;
        })[0]
      });
    }
  }

  render() {
    const {
        totalActiveLeads,
        totalLiveCalls,
        totalOutBoundCalls,
        totalLongTransfers,
        totalTransfers,
        latestDate,
        totalSMSReceived,
        totalSMSSent
      }: any = this.state,
      { classes }: any = this.props;

    return (
      <Fragment>
        <div className={classes.header}>
          <div className={classes.headerWrap}>
            <Typography data-cy-performance className={classes.title}>
              SMS Dashboard{" "}
            </Typography>
          </div>
        </div>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              <Activeness date={latestDate} />
            </Grid>
            <Grid container item xs={12}>
              <Grid
                className={classes.fieldsContainer}
                container
                direction="row"
                justify="space-between"
                alignItems="stretch"
                alignContent="stretch"
                spacing={1}
              >
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Field
                    borderLeft={false}
                    label="ACTIVE LEADS"
                    icon={<PeopleOutline className={classes.icon} />}
                    value={`${parseFloat(totalActiveLeads).toFixed(2)}`}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Field
                    borderLeft={true}
                    label="LIVE/OUTBOUND CALLS"
                    icon={<LocalPhone className={classes.icon} />}
                    value={`${parseFloat(totalLiveCalls).toFixed(
                      2
                    )}/${parseFloat(totalOutBoundCalls).toFixed(2)}`}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Field
                    borderLeft={true}
                    label="LONG TRANSFERS/TRANSFERS"
                    icon={<Shuffle className={classes.icon} />}
                    value={`${totalLongTransfers}/${parseFloat(
                      totalTransfers
                    ).toFixed(2)}`}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Field
                    borderLeft={true}
                    label="SMS RECEIVED/SENT"
                    icon={<Message className={classes.icon} />}
                    value={`${totalSMSReceived}/${parseFloat(
                      totalSMSSent
                    ).toFixed(2)}`}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Performance);
