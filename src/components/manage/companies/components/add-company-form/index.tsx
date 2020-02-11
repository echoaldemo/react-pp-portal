/* eslint-disable */
import React, { Component } from "react";
import { Collapse, FormHelperText, withStyles } from "@material-ui/core";
import { InputField, LoadingModal, SuccessModal } from "common-components";
import { styles, Btn, Cancel, CreateBtn, CreateText, Disabled } from "./styles";

const companyBasicInfo = {
  companyName: "",
  companyNameValid: false,
  companyNameError: false,
  companyEmail: "",
  companyEmailValid: false,
  companyEmailError: false,
  companyWebsite: "",
  companyWebsiteValid: false,
  companyWebsiteError: false
};

const defaultState = {
  buttonDisabled: true,
  loadingState: false,
  creationError: false,
  creationSuccess: false,
  errorMessage: ""
};

interface IProps {
  handleUpdate: any;
  closeModal: any;
  openModal: any;
  classes: any;
}

interface IState {
  companyName: string;
  companyNameValid: boolean;
  companyNameError: boolean;
  companyEmail: string;
  companyEmailValid: boolean;
  companyEmailError: boolean;
  companyWebsite: string;
  companyWebsiteValid: boolean;
  companyWebsiteError: boolean;
  buttonDisabled: boolean;
  loadingState: boolean;
  creationError: boolean;
  creationSuccess: boolean;
  errorMessage: string;
}

class AddCompanyForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      ...companyBasicInfo,
      ...defaultState
    };
  }
  validateEmail = (email: string) => {
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(
      email
    );
  };

  validateWebsite = (website: string) => {
    return /^(?:https(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
      website
    );
  };
  handleCompanyName = (e: any) => {
    if (e.target.value.length > 0) {
      this.setState({
        [e.target.name]: e.target.value,
        [`${e.target.name}Valid`]: true,
        companyNameError: false
      } as any);
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        [`${e.target.name}Valid`]: false
      } as any);
    }
  };
  handleCompanyEmail = (e: any) => {
    if (e.target.value.length > 0) {
      if (this.validateEmail(e.target.value)) {
        this.setState({
          companyEmailValid: true,
          companyEmailError: false,
          [e.target.name]: e.target.value
        } as any);
      } else {
        this.setState({
          companyEmailError: true,
          companyEmailValid: false,
          [e.target.name]: e.target.value
        } as any);
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        companyEmailValid: false,
        companyEmailError: false
      } as any);
    }
  };
  handleCompanyWebsite = (e: any) => {
    if (e.target.value.length > 0) {
      if (this.validateWebsite(e.target.value)) {
        this.setState({
          companyWebsiteError: false,
          companyWebsiteValid: true,
          [e.target.name]: e.target.value
        } as any);
      } else {
        this.setState({
          companyWebsiteError: true,
          companyWebsiteValid: false,
          [e.target.name]: e.target.value
        } as any);
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        companyWebsiteValid: false,
        companyWebsiteError: false
      } as any);
    }
  };

  createCompany = (e: any) => {
    e.preventDefault();
    this.setState({
      loadingState: true
    });
    /* post("/identity/company/create/", {
      name: this.state.companyName,
      email: this.state.companyEmail,
      website: this.state.companyWebsite
    })
      .then(res => {
        this.setState({
          loadingState: false,
          creationSuccess: true,
          creationError: false
        });

        this.props.handleUpdate();
      })
      .catch(err => {
        console.log(err);

        if (err.response.data.website) {
          this.setState({
            errorMessage: "Please enter a valid URL!",
            loadingState: false,
            companyBasicInfo,
            creationError: true,
            companyWebsiteError: true
          });
        } else if (err.response.data.name) {
          this.setState({
            errorMessage: "Company with this name already exist",
            loadingState: false,
            companyBasicInfo,
            creationError: true,
            companyNameError: true
          });
        }
      }); */
  };

  handleBlur = (e: any) => {
    if (e.target.value.length > 0) {
      if (e.target.name == "companyEmail") {
        this.setState({
          companyEmailValid: false,
          companyEmailError: false
        });
      }
    }
  };
  handleExit = () => {
    this.setState({
      ...defaultState
    });
  };
  handleCreateNew = () => {
    this.setState({
      ...defaultState,
      ...companyBasicInfo
    });
  };

  render() {
    const { classes } = this.props;
    let companyNameProps = {
      autoComplete: "off",
      error: this.state.companyNameError,
      required: true,
      label: "Company name",
      name: "companyName",
      onChange: (e: any) => {
        this.handleCompanyName(e);
      },
      onBlur: (e: any) => {
        this.handleBlur(e);
      },
      className: classes.textField,
      value: this.state.companyName,
      fullWidth: true
    };
    let companyEmailProps = {
      autoComplete: "off",
      error: this.state.companyNameError,
      label: "Company email",
      name: "companyEmail",
      onChange: (e: any) => {
        this.handleCompanyEmail(e);
      },
      onBlur: (e: any) => {
        this.handleBlur(e);
      },
      className: classes.textField,
      value: this.state.companyEmail,
      fullWidth: true
    };
    let companyWebProps = {
      autoComplete: "off",
      error: this.state.companyWebsiteError,
      label: "Company website",
      name: "companyWebsite",
      onChange: (e: any) => {
        this.handleCompanyWebsite(e);
      },
      value: this.state.companyWebsite,
      fullWidth: true
    };
    return (
      <>
        <SuccessModal
          open={this.state.creationSuccess}
          text={`You have created ${this.state.companyName}`}
          btnText={"Create Another"}
          closeFn={() => {
            this.setState({
              creationSuccess: false
            });
          }}
          btnFn={() => {
            this.handleCreateNew();
            this.props.openModal();
          }}
        />
        <LoadingModal
          open={this.state.loadingState}
          text="One moment. We're creating the new phrase..."
          cancelFn={() => {
            this.setState({ loadingState: false, ...defaultState });
          }}
        />
        <form
          className={classes.formWrapper}
          onSubmit={e => {
            this.createCompany(e);
          }}
        >
          <div className={classes.formContainer}>
            <InputField {...companyNameProps} />
            <Collapse in={this.state.companyNameError} timeout={1000}>
              <FormHelperText style={{ color: "red" }}>
                Invalid Company Name
              </FormHelperText>
            </Collapse>
          </div>
          <div className={classes.formContainer}>
            <InputField {...companyEmailProps} />
            <Collapse in={this.state.companyEmailError} timeout={500}>
              <FormHelperText style={{ color: "red" }}>
                Invalid Email
              </FormHelperText>
            </Collapse>
          </div>
          <div className={classes.formContainer}>
            <InputField {...companyWebProps} />
            <Collapse in={this.state.companyWebsiteError} timeout={1000}>
              <FormHelperText style={{ color: "red" }}>
                Invalid website
              </FormHelperText>
            </Collapse>
          </div>
          <div className={classes.buttonContainer}>
            <Btn>
              <Cancel onClick={this.props.closeModal}>Cancel</Cancel>
            </Btn>

            {this.state.companyNameValid &&
            !this.state.companyEmailError &&
            !this.state.companyWebsiteError ? (
              <CreateBtn data-cy="create-button">
                <CreateText>Create Campaign</CreateText>
              </CreateBtn>
            ) : (
              <Btn
                data-cy="create-button"
                disabled
                onClick={this.props.closeModal}
              >
                <Disabled>Create Campaign</Disabled>
              </Btn>
            )}
          </div>
        </form>
      </>
    );
  }
}

export default withStyles(styles)(AddCompanyForm);
