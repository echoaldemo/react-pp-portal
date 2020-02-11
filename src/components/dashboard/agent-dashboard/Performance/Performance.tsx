import React, { Fragment } from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import styles from "./Styles/Performance";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {
  PeopleOutline,
  LocalPhone,
  PhoneForwarded,
  MailOutline
} from "@material-ui/icons";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: 18
  }
});

const useStyles = makeStyles(styles);

const Performance = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.paperPadding}>
        <ThemeProvider theme={theme}>
          <Typography className={classes.agentTypo}>
            Agents Dashboard
          </Typography>
        </ThemeProvider>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <ThemeProvider theme={theme}>
                <Typography className={classes.performanceMargin}>
                  Performance{" "}
                  <span className={classes.performanceHeader}>(now)</span>
                </Typography>
              </ThemeProvider>
            </Grid>
            <Grid item>
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
                  <div className={classes.noBorderLeft}>
                    <h4 className={classes.header}>{"AGENTS ON CALL"}</h4>
                    <span className={classes.value}>
                      <PeopleOutline className={classes.icon} /> {"24/300"}
                    </span>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  {/* <Field
                      borderLeft={true}
                      label="LIVE/OUTBOUND CALLS"
                      icon="local_phone"
                      value={`95/100`}
                    /> */}
                  <div className={classes.withBorderLeft}>
                    <h4 className={classes.header}>{"TOTAL CALLS"}</h4>
                    <span className={classes.value}>
                      <LocalPhone className={classes.icon} /> {"2.354"}
                    </span>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  {/* <Field
                      borderLeft={true}
                      label="LONG TRANSFERS/TRANSFERS"
                      icon="shuffle"
                      value={`95/100`}
                    /> */}
                  <div className={classes.withBorderLeft}>
                    <h4 className={classes.header}>{"TEST CALLS"}</h4>
                    <span className={classes.value}>
                      <PhoneForwarded className={classes.icon} /> {"1.027"}
                    </span>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  {/* <Field
                      borderLeft={true}
                      label="SMS RECEIVED/SENT"
                      icon="message"
                      value={`95/100`}
                    /> */}
                  <div className={classes.withBorderLeft}>
                    <h4 className={classes.header}>{"CLOSED EMAILS"}</h4>
                    <span className={classes.value}>
                      <MailOutline className={classes.icon} /> {"842/1436"}
                    </span>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Fragment>
  );
};

export default Performance;
