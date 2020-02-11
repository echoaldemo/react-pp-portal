import React, { useState, useEffect } from "react";
import SnackNotif from "./snackbar/snackbar";
import Card from "@material-ui/core/Card";
import Logo from "../../assets/images/pp_logo_transparent_bkgrd.png";
import SignInForm from "./Signin.form";
import { login } from "auth/controllers/controller";
import SignInLoader from "./SignIn.loader";
import { loginChecker } from "auth/services/authService";

interface StateType {
  loading: boolean;
  siteLoading: boolean;
  snackbar: boolean;
  loggedIn: boolean;
  recorder: boolean;
  message: string;
}
const SigninComponent: React.FC<{ history: any }> = ({ history }) => {
  const [state, setState] = useState<StateType>({
    loading: false,
    siteLoading: true,
    snackbar: false,
    message: "",
    loggedIn: false,
    recorder: false
  });

  useEffect(() => {
    if (loginChecker()) {
      window.location.href = "/gateway";
    }
  }, []);

  const handleClose = () => {
    setState({ ...state, snackbar: false });
  };

  const handleLoadingLogin = (bool: boolean) => {
    setState({ ...state, loading: bool });
  };

  const handleSnackbar = (bool: boolean, mess: string) => {
    setState({ ...state, snackbar: bool, message: mess });
  };

  const logger = async (data: any) => {
    login(data.username, data.password).then((res: any) => {
      if (res) {
        if (localStorage.getItem("type") === "10") {
          setState({ ...state, recorder: true });
          window.location.href = "/manage/audio/pitch";
        } else {
          setState({ ...state, loggedIn: true, loading: false });
          window.location.href = "/gateway";
        }
      } else {
        handleSnackbar(true, "Incorrect Login Credentials");
      }
    });

    // if (login(data.username, data.password)) {
    //   setState({ ...state, loggedIn: true });
    //   history.push("/gateway");
    // } else {
    //   setState({ ...state, loggedIn: false });
    // }
  };

  return (
    <React.Fragment>
      <div
        style={{
          backgroundColor: "#ececec",
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <SnackNotif
          snackbar={state.snackbar}
          handleClose={handleClose}
          message={state.message}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "350px",
            marginTop: "120px"
          }}
        >
          {state.loading && <SignInLoader />}
          <Card
            style={{
              paddingTop: "45px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "15px",
              width: 400,
              height: "auto",
              borderRadius: "4px"
            }}
          >
            <img
              alt=" "
              src={Logo}
              style={{ width: "251px", height: "57px", marginBottom: 30 }}
            />
            <SignInForm
              handleLoadingLogin={handleLoadingLogin}
              handleSnackbar={handleSnackbar}
              logger={logger}
            />
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SigninComponent;
