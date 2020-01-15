import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Collapse } from "@material-ui/core";
import {
  CustomButton,
  InputField,
  Modal,
  LoadingModal,
  SuccessModal
} from "common-components";
const styles = {
  textField: {},

  formStyle: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: 15
  },
  formControl: {
    width: "100%",
    paddingBottom: 35
  }
};
const defaultState = {
  phrase_name: "",
  phrase_nameValid: false,
  phrase_nameError: false,

  phrase: "",
  phraseError: false,
  phraseValid: false,
  errorMessage: ""
};
class CreatePhraseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...defaultState,
      loading: false,
      createSuccess: false
    };
  }

  handleFieldChanges = (e) => {
    if (e.target.value.length > 0) {
      this.setState({
        [e.target.name]: e.target.value,
        [`${e.target.name}Valid`]: true,
        [`${e.target.name}Error`]: false
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        [`${e.target.name}Valid`]: false,
        [`${e.target.name}Error`]: true
      });
    }
  };

  //   handleFormSubmit = (e) => {
  //     e.preventDefault(e);
  //     this.setState({ loading: true });
  //     post(`/pitch/global/phrases/${this.props.phraseBookData.uuid}/phrases/`, {
  //       name: this.state.phrase_name,
  //       phrase: this.state.phrase
  //     })
  //       .then((result) => {
  //         if (result.status === 201) {
  //           this.props.update(result.data);
  //           this.setState({
  //             loading: false,
  //             createSuccess: true,
  //             ...defaultState
  //           });
  //           this.props.onClose();
  //         }
  //       })
  //       .catch((err) => {
  //         try {
  //           if (err.response.data.name) {
  //             this.setState({
  //               phrase_nameError: true,
  //               loading: false,
  //               errorMessage: err.response.data.name[0]
  //             });
  //           }
  //         } catch {}
  //       });
  //   };
  render() {
    const { classes, open, onClose, openFn, handleAdd } = this.props;
    return (
      <div>
        <SuccessModal
          open={this.state.createSuccess}
          text={`You have created ${this.state.phrase_name}`}
          btnText={"Create Another"}
          closeFn={() => {
            this.setState({
              createSuccess: false
            });
          }}
          btnFn={() => {
            this.setState({ ...defaultState, createSuccess: false });
            openFn();
          }}
        />
        <LoadingModal
          open={this.state.loading}
          text="One moment. We're creating the new phrase..."
          cancelFn={() => {
            this.setState({ loading: false });
          }}
        />
        <Modal open={open} onClose={onClose} title={<b>Create Phrase</b>}>
          <form
            className={classes.formStyle}
            onSubmit={(e) => {
              e.preventDefault(e);
              onClose();
              this.setState({ loading: true });
              handleAdd(
                {
                  name: this.state.phrase_name,
                  phrase: this.state.phrase,
                  slug: this.state.phrase_name.replace("-", " ")
                },
                () => {
                  this.setState({
                    loading: false,
                    createSuccess: true,
                    ...defaultState
                  });
                }
              );
            }}
          >
            <div className={classes.formControl}>
              <InputField
                label="Phrase name"
                fullWidth
                value={this.state.phrase_name}
                className={classes.textField}
                name="phrase_name"
                onChange={(e) => {
                  this.handleFieldChanges(e);
                }}
                autoComplete="off"
                autoFocus
                required
                error={this.state.phrase_nameError}
              />
              <Collapse in={this.state.phrase_nameError} timeout={1000}>
                <span style={{ color: "red" }}>{this.state.errorMessage}</span>
              </Collapse>
            </div>

            <div className={classes.formControl}>
              <div style={{ width: "100%" }}>
                <InputField
                  label="Phrase"
                  value={this.state.phrase}
                  name="phrase"
                  required
                  fullWidth
                  className={classes.textField}
                  onChange={(e) => {
                    this.handleFieldChanges(e);
                  }}
                  autoComplete="off"
                />
              </div>
            </div>
            <div style={{ paddingBottom: 15 }}>
              <CustomButton
                type="submit"
                handleClick={(e) => {
                  console.log(e);
                }}
                disabled={
                  !this.state.phrase_nameValid || !this.state.phraseValid
                }
              >
                Create Phrase
              </CustomButton>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}
export default withStyles(styles)(CreatePhraseModal);
