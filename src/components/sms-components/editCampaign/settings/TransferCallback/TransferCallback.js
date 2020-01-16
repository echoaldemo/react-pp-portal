import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CheckBox from "../../common-components/CheckBox";
import SnackBar from "../../common-components/SnackBar";
import Grid from "@material-ui/core/Grid";
import LoaderDialog from "../../common-components/LoaderDialog";
import InputTextField from "../../common-components/InputTextField";
import Button from "@material-ui/core/Button";

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

class TransferCallback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fallbackTimeOut: this.props.fallbackTimeOut,
      fallbackNumber: this.props.fallbackNumber,
      fallbackTransfer: this.props.fallbackTransfer,
      originalTimeout: this.props.fallbackTimeOut,
      originalNumber: this.props.fallbackNumber,
      originalTransfer: this.props.fallbackTransfer,
      message: "",
      id: this.props.id,
      loaderDialog: false,
      errorTimeout: false,
      errorNumber: false
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFallbackTransfer = () => {
    this.setState({
      fallbackTransfer: !this.state.fallbackTransfer
    });
  };

  handleClose = () => this.setState({ open: false });

  updateSettings = () => {
    this.setState({
      loaderDialog: true
    });

    setTimeout(() => {
      this.setState({
        loaderDialog: false,
        originalTransfer: this.state.fallbackTransfer,
        originalTimeout: this.state.fallbackTimeOut,
        originalNumber: this.state.fallbackNumber
      });
      this.props.updateTransferCallback(
        this.state.fallbackTransfer,
        this.state.fallbackTimeOut,
        this.state.fallbackNumber
      );
      this.handleSnackBar();
    }, 1000);
  };

  handleSnackBar = () => {
    this.setState({
      open: true,
      message: `Transfer callback settings updated`
    });
  };

  checkTimeOut = event => {
    if (event.target.value.length === 0 || event.target.value === "0") {
      this.setState({
        errorTimeout: true
      });
    } else {
      this.setState({
        errorTimeout: false
      });
    }
  };

  checkNumber = event => {
    if (event.target.value.length === 0 || event.target.value === "0") {
      this.setState({
        errorNumber: true
      });
    } else {
      this.setState({
        errorNumber: false
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={12} sm={9} md={6} lg={6}>
            <CheckBox
              name="tc-checkbox"
              input={this.state.fallbackTransfer}
              onchange={this.handleFallbackTransfer}
              label="Enabled fallback transfer"
              formLabel=""
              formSubLabel=""

            />
            <InputTextField
              label="Fallback timeout"
              name="fallbackTimeOut"
              value={this.state.fallbackTimeOut}
              handleTextChange={this.handleChange}
              keyup={this.checkTimeOut}
              error={this.state.errorTimeout}
              onBlur={this.saveText}
              required={true}
              type="number"
              dataCyID="1"

            />
            <InputTextField
              id='tc-fallbackNumber'
              label="Fallback number"
              name="fallbackNumber"
              value={this.state.fallbackNumber}
              handleTextChange={this.handleChange}
              keyup={this.checkNumber}
              error={this.state.errorNumber}
              onBlur={this.saveText}
              required={true}
              type="number"
              dataCyID="2"
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
            {this.state.fallbackTransfer !== this.state.originalTransfer ||
              this.state.fallbackTimeOut !== this.state.originalTimeout ||
              this.state.fallbackNumber !== this.state.originalNumber ? (
                this.state.fallbackTimeOut.length !== 0 && this.state.fallbackNumber.length !== 0 ?
                  (<Button
                    variant="contained"
                    className={classes.addBtn}
                    onClick={this.updateSettings}
                    data-cy="saveBtn"
                  >
                    Save
                  </Button>)
                  : null
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
export default withStyles(styles)(TransferCallback);
