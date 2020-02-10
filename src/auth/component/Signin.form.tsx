import React, { useState } from "react";
import {
  Collapse,
  FormControl,
  FormHelperText,
  InputLabel,
  Button
} from "@material-ui/core/";
import { CustomInput, useStyles } from "./styled/styledComponents";

interface StateType {
  formText: {
    username: string;
    password: string;
  };
  formError: {
    username: boolean;
    password: boolean;
  };
}

interface PropType {
  handleLoadingLogin: (bool: boolean) => void;
  handleSnackbar: (bool: boolean, mess: string) => void;
  logger: (data: any) => void;
}

function SignInForm(props: PropType) {
  const [state, setState] = useState<StateType>({
    formText: {
      username: "",
      password: ""
    },
    formError: {
      username: false,
      password: false
    }
  });
  const classes: any = useStyles();
  return (
    <>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}
        onSubmit={e => {
          e.preventDefault();
          props.handleLoadingLogin(true);
          props.logger(state.formText);
        }}
      >
        <div
          style={{
            height: "80px",
            width: "335px"
          }}
        >
          <FormControl
            style={{ width: "100%", marginTop: "10px", marginBottom: 40 }}
            error={state.formError.username}
          >
            <InputLabel
              classes={
                state.formError.username
                  ? {
                      root: classes.inputLabelError
                    }
                  : { root: classes.inputLabel }
              }
            >
              Username
            </InputLabel>
            <CustomInput
              required
              value={state.formText.username}
              classes={{
                root: classes.inputField,
                underline: classes.inputUnderline
              }}
              id="username"
              onChange={(e: any) => {
                if (!e.target.value.length) {
                  setState({
                    ...state,
                    formText: {
                      ...state.formText,
                      username: e.target.value,
                      password: state.formText.password
                    },
                    formError: {
                      ...state.formError,
                      username: true,
                      password: state.formError.password
                    }
                  });
                } else {
                  setState({
                    ...state,
                    formText: {
                      ...state.formText,
                      username: e.target.value,
                      password: state.formText.password
                    },
                    formError: {
                      ...state.formError,
                      username: false,
                      password: state.formError.password
                    }
                  });
                }
              }}
              onBlur={(e: any) => {
                if (!e.target.value.length) {
                  setState({
                    ...state,
                    formText: {
                      ...state.formText,
                      username: e.target.value,
                      password: state.formText.password
                    },
                    formError: {
                      ...state.formError,
                      username: true,
                      password: state.formError.password
                    }
                  });
                } else {
                  setState({
                    ...state,
                    formText: {
                      ...state.formText,
                      username: e.target.value,
                      password: state.formText.password
                    },
                    formError: {
                      ...state.formError,
                      username: false,
                      password: state.formError.password
                    }
                  });
                }
              }}
            />
            <Collapse in={state.formError.username}>
              <FormHelperText>Username is required</FormHelperText>
            </Collapse>
          </FormControl>
        </div>
        <div
          style={{
            height: "80px",
            width: "335px"
          }}
        >
          <FormControl
            style={{ width: "100%", marginTop: "5px" }}
            error={state.formError.password}
          >
            <InputLabel
              classes={
                state.formError.password
                  ? {
                      root: classes.inputLabelError
                    }
                  : { root: classes.inputLabel }
              }
            >
              Password
            </InputLabel>
            <CustomInput
              type="password"
              required
              id="password"
              value={state.formText.password}
              classes={{
                root: classes.inputField,
                underline: classes.inputUnderline
              }}
              onChange={(e: any) => {
                if (!e.target.value.length) {
                  setState({
                    ...state,
                    formText: {
                      ...state.formText,
                      username: state.formText.username,
                      password: e.target.value
                    },
                    formError: {
                      ...state.formError,
                      username: state.formError.username,
                      password: true
                    }
                  });
                } else {
                  setState({
                    ...state,
                    formText: {
                      ...state.formText,
                      username: state.formText.username,
                      password: e.target.value
                    },
                    formError: {
                      ...state.formError,
                      username: state.formError.username,
                      password: false
                    }
                  });
                }
              }}
              onBlur={(e: any) => {
                if (!e.target.value.length) {
                  setState({
                    ...state,
                    formText: {
                      ...state.formText,
                      username: state.formText.username,
                      password: e.target.value
                    },
                    formError: {
                      ...state.formError,
                      username: state.formError.username,
                      password: true
                    }
                  });
                } else {
                  setState({
                    ...state,
                    formText: {
                      ...state.formText,
                      username: state.formText.username,
                      password: e.target.value
                    },
                    formError: {
                      ...state.formError,
                      username: state.formError.username,
                      password: false
                    }
                  });
                }
              }}
            />
            <Collapse in={state.formError.password}>
              <FormHelperText>Password is required</FormHelperText>
            </Collapse>
          </FormControl>
        </div>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#607c98",
            color: "#fff",
            width: "96%",
            marginTop: "30px",
            borderRadius: "3px",
            position: "relative",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 30,
            height: 40,
            boxShadow: "none"
          }}
          type="submit"
          data-cy="submit"
        >
          Sign In
        </Button>
      </form>
    </>
  );
}

export default SignInForm;
