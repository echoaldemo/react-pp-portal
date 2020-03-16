import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Button,
  Typography,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  InputBase,
  Collapse,
  Switch
} from "@material-ui/core";
/*COMPONENTS*/
import {
  HeaderButton,
  LoadingModal,
  SuccessModal,
  TableLoader,
  BackButton,
  StatusLabel
} from "common-components";
import Search from "../common-components/Search";
import Toast from "../common-components/Toast";
import Teams from "../teams/Teams";
import NewTeam from "./addNewTeam";
import { get, patch, post, cancel } from "utils/api";
import styles from "./LocationSettings.styles.js";

class LocationSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      location: [],
      locationsTeams: [],
      locationLeader: [],
      originalData: {
        name: "",
        leader: "",
        active: ""
      },
      updateData: {
        name: "",
        leader: "",
        active: ""
      },
      openNewTeam: false,
      openToast: false,
      leader: [],
      load: false,
      success: false,
      nameMsg: "",
      dataLoaded: true
    };
  }

  async componentDidMount() {
    await get(`/identity/location/${this.props.match.params.uuid}/`).then(
      result => {
        this.setState({
          location: result.data,
          originalData: {
            name: result.data.name,
            leader: result.data.leader,
            active: result.data.active
          },
          updateData: {
            name: result.data.name,
            leader: result.data.leader,
            active: result.data.active
          }
        });
        if (result.data.leader) {
          get(`/identity/user/manage/${result.data.leader}`).then(res => {
            this.setState({
              locationLeader: res.data
            });
          });
        }
      }
    );
    await get(`/identity/team/list`, {
      location: this.props.match.params.uuid
    }).then(result => {
      this.setState({
        locationsTeams: result.data
      });
    });
    await get(
      `/identity/user/manage/list/?editable=true&groups=1&groups=2&groups=3&groups=6`
    ).then(result => {
      this.setState({
        leader: result.data.results,
        dataLoaded: true
      });
    });
  }

  fetchLocationsTeams = () => {
    get(`/identity/team/list/`, {
      location: this.props.match.params.uuid
    }).then(result => {
      this.setState({
        locationsTeams: result.data
      });
    });
  };

  fetchLocations = () => {
    get(`/identity/location/${this.props.match.params.uuid}`).then(result => {
      this.setState({
        location: result.data,
        originalData: {
          name: result.data.name,
          leader: result.data.leader,
          active: result.data.active
        },
        updateData: {
          name: result.data.name,
          leader: result.data.leader,
          active: result.data.active
        }
      });
      get(`/identity/user/manage/${result.data.leader}`).then(res => {
        this.setState({
          locationLeader: res.data
        });
      });
    });
  };

  selectedVoice = val => {
    var temp = this.state.updateData;
    temp.leader = val.uuid;
    get(`/identity/user/manage/${val.uuid}`).then(res => {
      this.setState({
        locationLeader: res.data,
        updateData: temp
      });
    });
  };

  updateLocation = () => {
    patch(
      `/identity/location/${this.props.match.params.uuid}/`,
      this.state.updateData
    ).then(res => {
      this.handleOpenToast();
      this.fetchLocations();
    });
  };

  hancleCloseNewTeam = () => {
    this.setState({
      openNewTeam: false
    });
  };
  handleOpenNewTeam = () => {
    this.setState({
      success: false,
      openNewTeam: true
    });
  };
  handleCloseToast = () => {
    this.setState({
      openToast: false
    });
  };
  handleOpenToast = () => {
    this.setState({
      openToast: true
    });
  };
  setDownshift = downshift => {
    this.downshift = downshift;
  };

  addNewTeam = (name, leader) => {
    this.setState({
      openNewTeam: false,
      load: true
    });
    post(`/identity/team/create/`, {
      location: this.props.match.params.uuid,
      leader: leader,
      name: name
    }).then(res => {
      this.setState({ load: false, nameMsg: name, success: true });
      this.hancleCloseNewTeam();
      this.fetchLocationsTeams();
    });
  };

  handleCancel = () => {
    cancel();
    this.setState({ load: false });
  };
  handleCloseSuccess = () => {
    this.setState({ open: false, success: false });
  };
  handleOpenSuccess = () => {
    this.setState({ open: true, success: false });
  };

  render() {
    const { classes } = this.props;
    var edit =
      JSON.stringify(this.state.originalData) ===
      JSON.stringify(this.state.updateData)
        ? false
        : this.state.updateData.name.length === 0
        ? false
        : true;
    if (this.state.dataLoaded) {
      return (
        <div>
          <BackButton text="Back to location" to="/manage/locations/" />
          <div className="title-container">
            <Typography className="edit-title">
              {this.state.updateData.name}
            </Typography>
            &emsp;
            <StatusLabel status={false} />
          </div>
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
                  <FormControl fullWidth>
                    <InputLabel
                      classes={{
                        root: classes.inputLabel,
                        shrink: classes.shrink,
                        focused: classes.focused
                      }}
                      htmlFor="name"
                      required
                    >
                      Location name
                    </InputLabel>
                    <Input
                      classes={{
                        root: classes.input,
                        underline: classes.textField
                      }}
                      id="name"
                      value={`${this.state.updateData.name}`}
                      onChange={event => {
                        var temp = this.state.updateData;
                        temp.name = event.target.value;
                        this.setState({
                          updateData: temp
                        });
                      }}
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
                      value={`${this.state.location.uuid}`}
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
                      htmlFor="uuid"
                    >
                      Location leader
                    </InputLabel>
                    <Input
                      classes={{
                        root: classes.input,
                        underline: classes.textField
                      }}
                      autoComplete="off"
                      id="uuid"
                      value={
                        this.state.locationLeader.length === 0
                          ? "None"
                          : `${this.state.locationLeader.first_name} ${this.state.locationLeader.last_name} | ${this.state.locationLeader.username}`
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
                    <InputLabel
                      classes={{
                        root: classes.inputLabel,
                        shrink: classes.shrink,
                        focused: classes.focused
                      }}
                      htmlFor="status"
                    >
                      Location status
                    </InputLabel>
                    <Input
                      className={classes.textField}
                      nameMsg
                      id="input"
                      value={
                        this.state.updateData.active ? "Active" : "Inactive"
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <Switch
                            classes={{
                              colorPrimary: classes.switchButton,
                              track: classes.switchTrack
                            }}
                            id="active"
                            color="primary"
                            checked={this.state.updateData.active}
                            onChange={e => {
                              var temp = this.state.updateData;
                              temp.active = !this.state.updateData.active;
                              this.setState({
                                updateData: temp
                              });
                            }}
                          />
                        </InputAdornment>
                      }
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
                      searchText="Search for location leader"
                      data={this.state.leader}
                      searchFunction={this.selectedVoice}
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
                      htmlFor="website"
                    >
                      Remove Leader
                    </InputLabel>
                    <InputBase
                      style={{
                        margin: 8
                      }}
                      shrink="false"
                      value={" "}
                      id="del"
                      endAdornment={
                        <InputAdornment position="end">
                          <Button
                            variant="contained"
                            classes={{ root: classes.delBtn }}
                            onClick={() => {
                              var temp = this.state.updateData;
                              temp.leader = null;
                              this.setState({
                                locationLeader: [],
                                updateData: temp
                              });
                              // this.downshift.clearSelection();
                            }}
                          >
                            Remove
                          </Button>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Collapse
                  in={edit}
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
                      disabled={false}
                      type="submit"
                      className={
                        true // lagay mo na lang dito yung function if may tig edit siya tiya ka lang maga active yung save
                          ? `${classes.button} ${classes.active}`
                          : `${classes.button} ${classes.disabled}`
                      }
                      onClick={() => {
                        this.updateLocation();
                      }}
                    >
                      SAVE
                    </button>
                    <button
                      className={`${classes.button} ${classes.cancel}`}
                      onClick={e => {
                        this.fetchLocations();
                      }}
                    >
                      CANCEL
                    </button>
                  </span>
                </Collapse>
              </Grid>
            </div>
          </Paper>
          <div
            style={{
              marginTop: 50,
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Typography variant="h5">Location teams</Typography>

            <HeaderButton
              buttonText="New team"
              openFunction={this.handleOpenNewTeam}
            />
          </div>
          <Paper style={{ height: "auto", marginTop: "2%" }}>
            <Teams
              userData={this.state.locationsTeams}
              innerLoading={false}
              headers={["Team name", "Slug", "UUID", ""]}
            />
          </Paper>
          <NewTeam
            handleClose={this.hancleCloseNewTeam}
            open={this.state.openNewTeam}
            leader={this.state.leader}
            location={this.props.match.params.uuid}
            createTeam={this.addNewTeam}
            // selectedVoice={this.selectedVoice}
            // voices={this.state.voices}
          />
          <LoadingModal
            open={this.state.load}
            text={"One moment. We’re adding the campaign…"}
            cancelFn={this.handleCancel}
          />
          <SuccessModal
            open={this.state.success}
            text={`You have created the “${this.state.nameMsg}” team `}
            btnText={"ADD CAMPAIGN"}
            closeFn={this.handleCloseSuccess}
            btnFn={this.handleOpenNewTeam}
          />
          <Toast
            toastType={"check"}
            open={this.state.openToast}
            handleClose={this.handleCloseToast}
            message={"Saved changes"}
            vertical={"top"}
            horizontal={"right"}
          />
        </div>
      );
    } else {
      return <TableLoader />;
    }
  }
}

export default withStyles(styles)(LocationSettings);
