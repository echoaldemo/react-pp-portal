import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Textfield from "../../common-components/Textfield";
import CheckBox from "../../common-components/CheckBox";
import SnackBar from "../../common-components/SnackBar";
import Grid from "@material-ui/core/Grid";
import LoaderDialog from "../../common-components/LoaderDialog";
import Button from "@material-ui/core/Button";
import { mockData } from "../../../Campaigns/mockData";

// import api from "../../../../services/fetchApi";

const styles: any = (theme: any) => ({
  footer: {
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: "14px",
    color: "#999999"
  },
  addBtn: {
    width: "100%",
    backgroundColor: "#b6d36b",
    color: "white",
    "&:hover": {
      background: "#98b159"
    }
  }
});
interface State {
  id: any;
  numberListArr: any;
  message: string;
  loaderDialog: boolean;
  numberList_id: any;
  localMatch: any;
  originalNumberlist: any;
  originalLocalMatch: any;
  [x: number]: any;
  open?: any;
}
interface Props {
  id: any;
  numberList_id: any;
  localMatch: any;
  updatPhoneNumbers: any;
}
class PhoneNumberSettings extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: this.props.id,
      numberListArr: [],
      message: "",
      loaderDialog: false,
      numberList_id: this.props.numberList_id,
      localMatch: this.props.localMatch,
      originalNumberlist: this.props.numberList_id,
      originalLocalMatch: this.props.localMatch
    };
  }

  componentDidMount = () => {
    // fetch("http://localhost:4000/options")
    //   .then(data => data.json())
    this.setState({
      numberListArr: mockData.options[1].numberList
    });
    // api.fetch(`/options`, "get").then(res => {
    //   this.setState({
    //     numberListArr: res.data[1].numberList
    //   });
    // });
  };

  handleChange = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleLocalMatch = () => {
    this.setState({
      localMatch: !this.state.localMatch
    });
  };

  updatePhoneNumbers = () => {
    this.setState({
      loaderDialog: true
    });

    setTimeout(() => {
      this.setState({
        loaderDialog: false,
        originalNumberlist: this.state.numberList_id,
        originalLocalMatch: this.state.localMatch
      });
      this.props.updatPhoneNumbers(
        this.state.numberList_id,
        this.state.localMatch
      );
      this.handleSnackBar();
    }, 3000);
  };

  handleSnackBar = () => {
    this.setState({
      open: true,
      message: `Phone numbers updated.`
    });
  };

  handleClose = () => this.setState({ open: false });

  render() {
    const { classes }: any = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9} md={6} lg={6}>
            <Textfield
              label="Number list"
              name="numberList_id"
              input={this.state.numberList_id}
              onchange={this.handleChange}
              values={this.state.numberListArr}
              helperText="Select a phone number list to assign numbers to this campaign."
              require={true}
              field="numberList_id"
            />
            <CheckBox
              input={this.state.localMatch}
              onchange={this.handleLocalMatch}
              label="Enable local match"
              formLabel="Enabling local area match will send calls and sms from the phone number geograpgically closest to the lead."
              formSubLabel=""
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ marginTop: "50px", marginBottom: "20px" }}
        >
          <Grid item xs={12} sm={8} md={9} lg={9}>
            <p className={classes.footer}>*Required fields</p>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            {this.state.numberList_id !== this.state.originalNumberlist ||
            this.state.localMatch !== this.state.originalLocalMatch ? (
              <Button
                variant="contained"
                className={classes.addBtn}
                onClick={this.updatePhoneNumbers}
                data-cy="save"
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
export default withStyles(styles)(PhoneNumberSettings);
