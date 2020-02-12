/* eslint-disable */
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import ToastDialog from "../../../Campaigns/ToastDialog";
import LoaderDialog from "../../common-components/LoaderDialog";
// import api from "../../../../services/fetchApi";
import { mockData } from "../../../Campaigns/mockData";

const styles: any = (theme: any) => ({
  header: {
    color: "#444851",
    fontSize: "16px",
    lineHeight: "1.8",
    fontFamily: "Roboto, Helvetica, sans-serif"
  },
  textField: {
    width: "265px",
    marginRight: 25,
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(238, 238, 238, 0.99)"
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "#1194f6"
    },
    "& label.Mui-focused": {
      color: "#1194f6"
    },
    "& label.Mui-error": {
      color: "#cc0300"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1194f6"
    }
  },
  textFieldError: {
    width: "265px",
    marginRight: 25,
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(238, 238, 238, 0.99)"
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "red"
    },
    "& label.Mui-focused": {
      color: "red"
    },
    "& label.Mui-error": {
      color: "#cc0300"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "red"
    }
  },
  row: {
    width: "100%",
    display: "flex",
    justifyContent: "end"
  },
  switch: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#444851",
    float: "right",
    // "@media(max-width:320px)": {
    //   marginLeft: "-2px"
    // },
    "@media(max-width:768px)": {
      marginLeft: "-15px",
      marginTop: "20px"
    },
    "@media(max-width:425px)": {
      marginLeft: "-2px",
      marginTop: "-10px"
    }
  },
  addBtn: {
    backgroundColor: "#b6d36b",
    color: "white",
    float: "right",
    width: 227,
    "&:hover": {
      background: "#98b159"
    }
  }
});
const PurpleSwitch = withStyles({
  switchBase: {
    color: "#eee",
    "&$checked": {
      color: "#1194f6"
    },
    "&$checked + $track": {
      backgroundColor: "#eeeeee"
    }
  },
  checked: {},
  track: {
    backgroundColor: "#ccc"
  }
})(Switch);
interface State {
  checkedA: boolean;
  checkedB: boolean;
  id: any;
  schedule: any;
  displayed: any;
  showSaveBtn: boolean;
  openToast: boolean;
  selectedDate: any;
  loaderDialog: boolean;
  helpTextOpen: any;
  helpTextClose: any;
  originalSched?: any;
}
interface Props {
  id: any;
  details: any;
}
class CampaignDetails extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      checkedA: true,
      checkedB: true,
      id: null,
      schedule: [],
      displayed: [],
      showSaveBtn: false,
      openToast: false,
      selectedDate: new Date(),
      loaderDialog: false,
      helpTextOpen: ["", "", "", "", "", "", ""],
      helpTextClose: ["", "", "", "", "", "", ""]
    };
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
    this.setDisplayed = this.setDisplayed.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.fetchOriginal = this.fetchOriginal.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  setDisplayed(data: any) {
    const temp: any = [];
    if (data) {
      data.map((items: any) => {
        const size = Object.keys(items).length;
        for (let i = 0; i < size; i++) {
          temp.push(items[i]);
        }
      });
    } else {
      if (this.props.details.days) {
        this.props.details.days.map((items: any) => {
          const size = Object.keys(items).length;
          for (let i = 0; i < size; i++) {
            temp.push(items[i]);
          }
        });
      }
    }
    this.setState({
      displayed: temp
    });
  }
  componentDidMount() {
    this.setState({
      schedule: this.props.details.days,
      id: this.props.id
    });

    this.setDisplayed(null);
    this.fetchOriginal();
  }

  fetchOriginal() {
    const tempOriginal: any = mockData.data;
    const indexOriginal: any = tempOriginal.indexOf(
      tempOriginal.find(({ id }: any) => id === this.props.id)
    );
    this.setState({ originalSched: tempOriginal[indexOriginal].days });
    // api
    //   .fetch(`/data/${this.props.id}`, "get")
    //   .then(res => this.setState({ originalSched: res.data.days }));
  }

  handleChange = (key: any) => (event: any) => {
    const index = key.key;
    const name = event.target.name;
    const value = event.target.checked;
    this.setState(prevState => {
      const newItems = [...prevState.schedule];
      newItems[0][index][name] = value;
      return { schedule: newItems };
    });
    this.setDisplayed(this.state.schedule);
    this.setState({ showSaveBtn: true });
    // this.update();
  };
  handleUpdate = (key: any) => (event: any) => {
    const index = key.key;
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => {
      const newItems = [...prevState.schedule];
      newItems[0][index][name] = value;
      return { schedule: newItems };
    });

    // CHECK TIME
    if (name === "Open") {
      if (
        Date.parse(`01/01/2019 ${event.target.value}`) <
          Date.parse(`01/01/2019 8:00`) ||
        Date.parse(`01/01/2019 ${event.target.value}`) >
          Date.parse(`01/01/2019 ${this.state.schedule[0][index]["Close"]}`)
      ) {
        var tempHelpText = [...this.state.helpTextOpen];
        tempHelpText[index] = "Invalid time input";
        this.setState({
          showSaveBtn: false,
          helpTextOpen: tempHelpText,
          helpTextClose: tempHelpText
        });
      } else {
        var tempHelpText = [...this.state.helpTextOpen];
        tempHelpText[index] = "";
        this.setState({
          showSaveBtn: true,
          helpTextOpen: tempHelpText,
          helpTextClose: tempHelpText
        });
      }
    } else {
      if (
        Date.parse(`01/01/2019 ${event.target.value}`) >
        Date.parse(`01/01/2019 ${this.state.schedule[0][index]["Open"]}`)
      ) {
        var tempHelpText = [...this.state.helpTextClose];
        tempHelpText[index] = "";
        this.setState({
          showSaveBtn: true,
          helpTextClose: tempHelpText,
          helpTextOpen: tempHelpText
        });
      } else {
        var tempHelpText = [...this.state.helpTextClose];
        tempHelpText[index] = "Invalid time input";
        this.setState({
          showSaveBtn: false,
          helpTextClose: tempHelpText,
          helpTextOpen: tempHelpText
        });
      }
    }

    this.setDisplayed(this.state.schedule);
    // this.update();
  };
  update() {
    const days = this.state.schedule;
    const updated = { days: days };
    this.setState({ loaderDialog: true });

    var updateTemp = mockData.data;
    var updateIndex = updateTemp.indexOf(
      updateTemp.find(({ id }: any) => id === this.state.id)
    );

    // updateTemp[index]= { days:};
    setTimeout(() => {
      this.setState({
        openToast: true,
        loaderDialog: false,
        showSaveBtn: false
      });
    }, 1500);

    // setTimeout(() => {
    //   api
    //     .fetch(`/data/${this.state.id}`, "patch", updated, "application/json")
    //     .then(async res => {
    //       //  console.log(res.data);
    //       this.setState({ openToast: true, loaderDialog: false });
    //       this.fetchOriginal();
    //     })
    //     .catch(err => console.error(err));
    // }, 1500);
  }

  handleClose() {
    this.setState({ openToast: false });
  }

  render() {
    const { classes }: any = this.props;
    const schedule = JSON.stringify(this.state.schedule);
    const originalSched = JSON.stringify(this.state.originalSched);

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <p className={classes.header}>
              Set the hours you would like the campaign to run. The timezone for
              the campaign hours is US/Pacific.
              <br />
              No call or text will go out before 8am in the leads timezone,
              regardless the campaign hours.
            </p>
          </Grid>
          {this.state.displayed.map((item: any, key: any) => {
            const timeOpen = item.Open.split(":");
            return (
              <Grid item lg={12} key={key}>
                <TextField
                  data-cy={`open${key}`}
                  id="Open"
                  name="Open"
                  label={`${item.Day} Open`}
                  type="time"
                  defaultValue={item.Open}
                  className={
                    this.state.helpTextOpen[key] !== ""
                      ? classes.textFieldError
                      : classes.textField
                  }
                  onChange={this.handleUpdate({ key })}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      color:
                        this.state.helpTextOpen[key] !== "" ? "red" : "#999",
                      fontSize: 20,
                      fontWeight: 600
                    }
                  }}
                  inputProps={{
                    step: 300
                  }}
                  helperText={(() => {
                    if (this.state.helpTextOpen[key] !== "") {
                      return (
                        <span
                          id={`openHelper${key}`}
                          style={{ color: "red" }}
                        >{`${this.state.helpTextOpen[key]}`}</span>
                      );
                    }
                  })()}
                />

                <TextField
                  data-cy={`close${key}`}
                  id="Close"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      color:
                        this.state.helpTextClose[key] !== "" ? "red" : "#999",
                      fontSize: 20,
                      fontWeight: 600
                    }
                  }}
                  label={`${item.Day} Close`}
                  margin="dense"
                  defaultValue={item.Close}
                  className={
                    this.state.helpTextClose[key] !== ""
                      ? classes.textFieldError
                      : classes.textField
                  }
                  name="Close"
                  onChange={this.handleUpdate({ key })}
                  inputProps={{
                    step: 300
                  }}
                  style={{ position: "relative", top: -5 }}
                  helperText={(() => {
                    if (this.state.helpTextClose[key] !== "") {
                      return (
                        <span
                          id={`closeHelper${key}`}
                          style={{ color: "red" }}
                        >{`${this.state.helpTextClose[key]}`}</span>
                      );
                    }
                  })()}
                />
                <FormControlLabel
                  id={`switch${key}`}
                  className={classes.switch}
                  control={
                    <PurpleSwitch
                      id={`switch${key}`}
                      checked={item.Active}
                      onChange={this.handleChange({ key })}
                      value={key}
                      name="Active"
                    />
                  }
                  label={item.Active ? "Active" : "Closed"}
                  labelPlacement="start"
                />
              </Grid>
            );
          })}
          <Grid item lg={12}>
            {this.state.schedule && this.state.originalSched ? (
              schedule === originalSched ? (
                this.state.showSaveBtn ? (
                  <Button
                    data-cy="saveBtn"
                    variant="contained"
                    className={classes.addBtn}
                    onClick={this.update}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    data-cy="saveBtn"
                    disabled={true}
                    variant="contained"
                    className={classes.addBtn}
                    onClick={this.update}
                  >
                    Save
                  </Button>
                )
              ) : (
                <Button
                  data-cy="saveBtn"
                  disabled={true}
                  variant="contained"
                  className={classes.addBtn}
                  onClick={this.update}
                >
                  Save
                </Button>
              )
            ) : (
              <Button
                data-cy="saveBtn"
                disabled={true}
                variant="contained"
                className={classes.addBtn}
                onClick={this.update}
              >
                Save
              </Button>
            )}
          </Grid>
        </Grid>

        <ToastDialog
          open={this.state.openToast}
          handleClose={this.handleClose}
          msg="Campaign hours was successfully updated"
        />
        <LoaderDialog open={this.state.loaderDialog} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CampaignDetails);
