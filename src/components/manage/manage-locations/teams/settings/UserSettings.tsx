import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";

import UserCard from "../../common-components/cards/UserCard";
import UserQueueCard from "../../common-components/cards/UserQueueCard";
import TeamMemberCard from "../../common-components/cards/TeamMemberCard";

import { get, patch } from "../../../../../utils/api";

import styles from "./TeamSettings.styles.js";
interface Props {
  team: any;
  classes: any;
}
interface State {
  userList: any;
  dataLoaded: boolean;
  userQueue: any;
  teamMembers: any;
  removeQueue: any;
}
class UserSettings extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      userList: [],
      dataLoaded: true,
      userQueue: [],
      teamMembers: [],
      removeQueue: []
    };
  }

  async componentDidMount() {
    //get all users
    const data = await get("/identity/user/manage/list/", {
      editable: true,
      limit: 1000
    }).then((users: any) => {
      this.setState({ userList: users.data.results });
    });
    const data2 = await get(`/identity/user/manage/list/`, {
      team: this.props.team
    }).then((members: any) => {
      this.setState({ teamMembers: members.data.results });
    });
    Promise.all([data, data2]).then(() => {
      this.setState({
        dataLoaded: true
      });
    });
  }

  addToQueue = (user: any) => {
    if (
      !this.state.userQueue.some((u: any) => u.uuid === user.uuid) &&
      !this.state.teamMembers.some((u: any) => u.uuid === user.uuid)
    ) {
      this.setState({
        userQueue: [...this.state.userQueue, user]
      });
    }
  };

  removeFromQueue = (index: any) => {
    let temp = this.state.userQueue;
    temp.splice(index, 1);
    this.setState({ userQueue: temp });
  };

  cancelQueue = () => {
    this.setState({ userQueue: [] });
  };

  addToTeam = () => {
    const queue = this.state.userQueue;
    this.setState({
      teamMembers: [...this.state.teamMembers, ...queue],
      userQueue: []
    });
    queue.forEach((user: any) => {
      patch(`/identity/user/manage/${user.uuid}/`, { team: this.props.team });
    });
  };

  addToRemove = (id: number) => {
    const index = this.state.removeQueue.indexOf(id);
    if (index === -1) {
      this.setState({ removeQueue: [...this.state.removeQueue, id] });
    } else {
      let temp = this.state.removeQueue;
      temp.splice(index, 1);
      this.setState({ removeQueue: temp });
    }
  };

  removeMembers = () => {
    const queue = this.state.removeQueue;
    var filtered = this.state.teamMembers.filter((user: any) => {
      return queue.indexOf(user.uuid) === -1;
    });
    this.setState({
      removeQueue: [],
      teamMembers: filtered
    });
    queue.forEach((user: any) => {
      patch(`/identity/user/manage/${user}/`, { team: null });
    });
  };

  render() {
    const { classes } = this.props;
    const { userList, userQueue, dataLoaded } = this.state;
    if (dataLoaded) {
      return (
        <React.Fragment>
          <Paper style={{ height: "auto", marginTop: "2%", padding: "20px" }}>
            <Typography className={classes.userSettings}>
              User settings
            </Typography>
            <Grid container className={classes.cardCon}>
              <Grid
                item
                sm={12}
                xs={12}
                md={4}
                lg={4}
                className={classes.cardItem}
              >
                <UserCard
                  userList={userList}
                  addToQueue={this.addToQueue}
                  members={this.state.teamMembers}
                />
              </Grid>

              <Grid
                item
                sm={12}
                xs={12}
                md={4}
                lg={4}
                className={classes.cardItem}
              >
                <UserQueueCard
                  queue={userQueue}
                  remove={this.removeFromQueue}
                  cancelQueue={this.cancelQueue}
                  addToTeam={this.addToTeam}
                />
              </Grid>

              <Grid
                item
                sm={12}
                xs={12}
                md={4}
                lg={4}
                className={classes.cardItem}
              >
                <TeamMemberCard
                  members={this.state.teamMembers}
                  removeQueue={this.state.removeQueue}
                  addToRemove={this.addToRemove}
                  removeMembers={this.removeMembers}
                />
              </Grid>
            </Grid>
          </Paper>
        </React.Fragment>
      );
    } else return null;
  }
}

export default withStyles(styles)(UserSettings);
