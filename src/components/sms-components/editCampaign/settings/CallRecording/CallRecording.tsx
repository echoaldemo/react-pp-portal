import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CheckBox from "../../common-components/CheckBox";
import SnackBar from "../../common-components/SnackBar";
import Grid from "@material-ui/core/Grid";
import LoaderDialog from "../../common-components/LoaderDialog";

const styles: any = (theme: any) => ({
  grid: {
    marginBottom: "90px"
  },
  p: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: theme.spacing(6),
    color: "#999999",
    fontSize: "14px"
  }
});
interface State {
  id: any;
  message: string;
  loaderDialog: boolean;
  open?: any;
}
interface Props {
  id: any;
  CDDataChange: any;
  recordCalls: any;
}
class CallRecording extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: this.props.id,
      message: "",
      loaderDialog: false
    };
  }

  handleCallRecording = () => {
    this.setState({
      loaderDialog: true
    });
    setTimeout(() => {
      this.setState({
        loaderDialog: false
      });
      this.props.CDDataChange("recordCalls", !this.props.recordCalls);
      this.handleSnackbar("cb", this.props.recordCalls);
    }, 500);
  };

  handleSnackbar(type: any, data: any) {
    this.setState({ open: true });
    if (type === "cb") {
      if (data === true) {
        this.setState({
          message: "Enabled call recording"
        });
      } else {
        this.setState({
          message: "Disabled call recording"
        });
      }
    }
  }

  handleClose = () => this.setState({ open: false });

  render() {
    const { classes, recordCalls }: any = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={12} sm={9} md={6} lg={6}>
            <CheckBox
              input={recordCalls}
              onchange={this.handleCallRecording}
              label="Record calls"
              formLabel={`If you choose to record calls, you need to comply with certain laws and regulations, including those regarding obtaining consent to record (such as California's invasion of Privacy Act and similar laws and jurisdictions. `}
              formSubLabel={`Call recordings only apply to transfered calls, stored for 60 days, and then automaticallt deleted by the system. Cost is $0.0025 per minute of recording time, as well as $0.0005 per minute for storage.`}
            />
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
export default withStyles(styles)(CallRecording);
