import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import NavTabs from "../../../../common-components/nav-tabs/Settings-menu-bar";
import { Paper, Grid, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputBase from "@material-ui/core/InputBase";
import Collapse from "@material-ui/core/Collapse";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";

/*COMPONENTS*/
import Search from "../../common-components/Search";

import { get, patch, remove, getGroups } from "../../../../../utils/api";

import styles from "./TeamSettings.styles.js";
import Toast from "../../common-components/Toast";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserSettings from "./UserSettings";
import TableLoader from "../../../../common-components/table-loader/TableLoader";
import { Dialog } from "@material-ui/core";
import DeleteModal from "../../../../common-components/delete-modal/DeleteModal";
import { Redirect } from "react-router-dom";

class TeamSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      location: [],
      team: [],
      teamLeader: [],
      dataLoaded: false,
      locationList: [],
      leaderList: [],
      teamName: "",
      saveDisable: true,
      nameError: false,
      selectedLocation: null,
      selectedLeader: null,
      openToast: false,
      saveLoader: false,
      collapse: false,
      openToast: false,
      redirect: false
    };
    this.initialState = {};
  }

  async componentDidMount() {
    const team = this.props.match.params.uuid;
    let leader, location;
    const data = await get(`/identity/team/${team}`).then(result => {
      leader = result.data.leader;
      location = result.data.location;
      this.setState({
        team: { ...result.data, active: true },
        teamName: result.data.name
      });
    });
    if (leader) {
      await get(`/identity/user/manage/${leader}`).then(lead => {
        this.setState({
          teamLeader: lead.data,
          selectedLeader: lead.data
        });
      });
    }
    const data3 = await get(`/identity/location/${location}`).then(loc => {
      this.setState({
        location: loc.data,
        selectedLocation: loc.data.uuid
      });
    });
    const data4 = await get("/identity/location/list/", {
      order_by: "-datetime_modified"
    }).then(res => {
      this.setState({
        locationList: res.data
      });
    });
    const data5 = await getGroups(
      "/identity/user/manage/list/?editable=true&groups=1&groups=2&groups=3&groups=6&groups=7&limit=1000"
    ).then(leads => {
      this.setState({
        leaderList: leads.data.results
      });
    });
    //get all users
    const data7 = await get("/identity/user/manage/list/", {
      editable: true
    }).then(users => {
      this.setState({ userList: users.data.results });
    });

    Promise.all([data, data3, data4, data5, data7]).then(() => {
      this.setState({
        dataLoaded: true
      });
      this.initialState = this.state;
    });
  }

  handleSaveBtn = () => {
    this.setState({
      saveDisable: false
    });
  };

  selectLeader = leader => {
    this.setState({
      selectedLeader: leader,
      saveDisable: false,
      collapse: true
    });
  };

  setDownshift = downshift => {
    this.downshift = downshift;
  };

  updateTeam = () => {
    this.setState({ saveLoader: true });
    const team = this.props.match.params.uuid;
    const updateData = {
      location: this.state.selectedLocation,
      leader: this.state.selectedLeader.uuid,
      name: this.state.teamName
    };
    patch(`/identity/team/${team}/`, updateData).then(async res => {
      await this.componentDidMount();
      this.setState({
        saveDisable: true,
        openToast: true,
        saveLoader: false,
        collapse: false
      });
      this.downshift.clearSelection();
    });
  };

  deleteTeam = () => {
    const team = this.props.match.params.uuid;
    this.setState({ dataLoaded: false });
    remove(`/identity/team/${team}/`).then(res => {
      this.setState({ redirect: true });
    });
  };

  render() {
    const { classes } = this.props;
    const { location, team, locationList, selectedLeader } = this.state;
    if (this.state.dataLoaded) {
      return (
        <div>
          <NavTabs
            data={team}
            tabnames={[]}
            history={location}
            back={{
              name: "Back to Team location",
              url: `/manage/locations/edit/${location.uuid}`
            }}
          />
          <Paper square={true} className={classes.paper}>
            <div style={{ width: "508px" }}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className={classes.inputContainer}
                >
                  <FormControl error={this.state.nameError} fullWidth>
                    <InputLabel
                      className={classes.textField}
                      classes={{
                        root: classes.inputLabel,
                        shrink: classes.shrink,
                        focused: classes.focused
                      }}
                      htmlFor="name"
                      required
                    >
                      Team name
                    </InputLabel>
                    <Input
                      inputRef={nameInput => (this.nameInput = nameInput)}
                      onChange={e => {
                        if (e.target.value.length === 0) {
                          this.setState({
                            nameError: true
                          });
                        } else {
                          this.setState({
                            nameError: false
                          });
                        }
                        this.setState({
                          teamName: e.target.value
                        });
                        this.handleSaveBtn();
                        this.setState({ collapse: true });
                      }}
                      classes={{
                        root: classes.input,
                        underline: classes.textField
                      }}
                      autoComplete="off"
                      id="name"
                      defaultValue={team.name}
                      required
                    />
                    <FormHelperText>
                      {this.state.nameError ? "A team name is required" : null}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className={classes.inputContainer}
                >
                  <FormControl fullWidth>
                    <InputLabel
                      classes={{
                        root: classes.inputLabel,
                        shrink: classes.shrink,
                        focused: classes.focused
                      }}
                      htmlFor="location"
                      required
                    >
                      Team location
                    </InputLabel>
                    <Select
                      id="location"
                      value={this.state.selectedLocation}
                      inputProps={{
                        classes: { underline: classes.selectInput }
                      }}
                      onChange={e => {
                        this.setState({ selectedLocation: e.target.value });
                        this.handleSaveBtn();
                        this.setState({ collapse: true });
                      }}
                    >
                      {locationList.map(loc => (
                        <MenuItem value={loc.uuid}>{loc.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className={classes.inputContainer}
                >
                  <FormControl fullWidth>
                    <InputLabel
                      classes={{
                        root: classes.inputLabel,
                        shrink: classes.shrink,
                        focused: classes.focused
                      }}
                      htmlFor="uuid"
                    >
                      UUID
                    </InputLabel>
                    <Input
                      classes={{
                        root: classes.input,
                        underline: classes.textField
                      }}
                      autoComplete="off"
                      id="uuid"
                      value={team.uuid}
                      disabled={true}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className={classes.inputContainer}
                >
                  <FormControl fullWidth>
                    <InputLabel
                      classes={{
                        root: classes.inputLabel,
                        shrink: classes.shrink,
                        focused: classes.focused
                      }}
                      htmlFor="leader"
                    >
                      Team leader
                    </InputLabel>
                    <Input
                      classes={{
                        root: classes.input,
                        underline: classes.textField
                      }}
                      autoComplete="off"
                      id="leader"
                      value={
                        selectedLeader
                          ? `${selectedLeader.username} | ${selectedLeader.first_name} ${selectedLeader.last_name}`
                          : "None"
                      }
                      disabled={true}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className={classes.inputContainer}
                >
                  <FormControl fullWidth disabled>
                    <Search
                      setRef={this.setDownshift}
                      searchText="Search for team leader"
                      data={this.state.leaderList}
                      searchFunction={this.selectLeader}
                      voices={this.state.voices}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className={classes.inputContainer}
                >
                  <FormControl fullWidth disabled>
                    <InputLabel
                      classes={{
                        root: classes.removeLeader,
                        shrink: classes.shrink,
                        focused: classes.focused
                      }}
                      htmlFor="delete"
                    >
                      Delete team
                    </InputLabel>
                    <InputBase
                      style={{
                        margin: 8
                      }}
                      shrink="false"
                      value={" "}
                      id="delete"
                      endAdornment={
                        <InputAdornment position="end">
                          <Button
                            onClick={() => {
                              this.setState({ openDelete: true });
                            }}
                            variant="contained"
                            classes={{ root: classes.delBtn }}
                          >
                            <DeleteIcon className={classes.delIcon} /> Delete
                          </Button>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Collapse
                  in={this.state.collapse}
                  classes={{ wrapper: classes.collapseWrapper }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    transition: "all 1s ease"
                  }}
                >
                  <span
                    style={{
                      width: "50%",
                      margin: "0 auto",
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <button
                      // disabled={errors.name || errors.email || errors.website}
                      type="submit"
                      className={
                        this.state.saveDisable || this.state.nameError
                          ? `${classes.button} ${classes.disabled}`
                          : `${classes.button} ${classes.active}`
                      }
                      onClick={this.updateTeam}
                    >
                      {this.state.saveLoader ? (
                        <CircularProgress className={classes.icon} size={20} />
                      ) : (
                        "SAVE"
                      )}
                    </button>

                    <button
                      className={`${classes.button} ${classes.cancel}`}
                      onClick={() => {
                        this.setState(this.initialState);
                        this.nameInput.value = team.name;
                        this.downshift.clearSelection();
                      }}
                    >
                      CANCEL
                    </button>
                  </span>
                </Collapse>
              </Grid>
            </div>
          </Paper>

          <UserSettings team={this.props.match.params.uuid} />
          <Toast
            toastType={"check"}
            open={this.state.openToast}
            handleClose={() => this.setState({ openToast: false })}
            message={"Saved changes"}
            vertical={"top"}
            horizontal={"right"}
          />
          <Dialog
            open={this.state.openDelete}
            disableBackdropClick
            disableEscapeKeyDown
          >
            <DeleteModal
              header="Delete Team"
              msg="team"
              name={this.state.team.name}
              closeFn={() => {
                this.setState({ openDelete: false });
              }}
              delFn={this.deleteTeam}
            />
          </Dialog>
        </div>
      );
    } else if (this.state.redirect) {
      return <Redirect to={`/manage/locations/edit/${location.uuid}`} />;
    } else return <TableLoader />;
  }
}

export default withStyles(styles)(TeamSettings);
