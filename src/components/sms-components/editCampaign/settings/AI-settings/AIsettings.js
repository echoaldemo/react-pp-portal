import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Textfield from "../../common-components/Textfield";
import CheckBox from "../../common-components/CheckBox";
import SnackBar from "../../common-components/SnackBar";
import Grid from "@material-ui/core/Grid";
import LoaderDialog from "../../common-components/LoaderDialog";
import Button from "@material-ui/core/Button";
import { mockData } from "../../../Campaigns/mockData";
import api from "../../../../services/fetchApi";

const styles = theme => ({
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
class AIsettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "",
      ai: [],
      loaderDialog: false,
      aiRules: this.props.aiRules,
      voiceSched: this.props.voiceSched,
      amd: this.props.amd,
      originalAI: this.props.aiRules,
      originalVoiceSched: this.props.voiceSched,
      originalAMD: this.props.amd
    };
  }
  // Fetching data from the mock api with it first render
  componentDidMount = () => {
    // fetch("http://localhost:4000/options")
    //   .then(data => data.json())
    this.setState({
      ai: mockData.options[0].aiRules
    });

    // api.fetch(`/options`, "get").then(res => {
    //   this.setState({
    //     ai: mockData.options[0].aiRules
    //   });
    // });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleVoiceSched = () => {
    this.setState({
      voiceSched: !this.state.voiceSched
    });
  };

  handleAMD = () => {
    this.setState({
      amd: !this.state.amd
    });
  };

  updateAISettings = () => {
    this.setState({
      loaderDialog: true
    });

    setTimeout(() => {
      this.setState({
        loaderDialog: false,
        originalAI: this.state.aiRules,
        originalVoiceSched: this.state.voiceSched,
        originalAMD: this.state.amd
      });
      this.props.updateAISettings(
        this.state.aiRules,
        this.state.voiceSched,
        this.state.amd
      );
      this.handleSnackBar();
    }, 3000);
  };

  handleSnackBar = () => {
    this.setState({
      open: true,
      message: `AI Settings updated.`
    });
  };

  handleClose = () => this.setState({ open: false });
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9} md={6} lg={6}>
            <Textfield
              label="AI Rules"
              name="aiRules"
              input={this.state.aiRules}
              onchange={this.handleChange}
              values={this.state.ai}
              require={true}
              field="ai"
              data-testid="ai"
            />
            <CheckBox
              input={this.state.voiceSched}
              onchange={this.handleVoiceSched}
              label="Enable voice scheduling"
              formLabel="Voice scheduling feature allows non-mobile users to schedule a callback
             using AI voice upon pressing the callback digit. (Speech recognition fee applies, $0.0250 per 15 seconds)"
              // id=""
            />
            <CheckBox
              input={this.state.amd}
              onchange={this.handleAMD}
              label="Enable enhanced AMD"
              formLabel={`Enhanced AMD is Answering machine detection powered by AI and machine learning. Cost is $0.0075 per call, US & Canada only.`}
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
            {this.state.aiRules !== this.state.originalAI ||
            this.state.voiceSched !== this.state.originalVoiceSched ||
            this.state.amd !== this.state.originalAMD ? (
              <Button
                variant="contained"
                className={classes.addBtn}
                onClick={this.updateAISettings}
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
export default withStyles(styles)(AIsettings);
