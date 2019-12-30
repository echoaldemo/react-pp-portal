import React, { useState } from "react";
import SnackNotif from "./snackbar/snackbar";
import Card from "@material-ui/core/Card";
import Logo from "../../assets/images/pp_logo_transparent_bkgrd.png";
import SignInForm from "./Signin.form";

interface StateType {
  loading: boolean;
  siteLoading: boolean;
  snackbar: boolean;
  loggedIn: boolean;
  recorder: boolean;
  message: string;
}
function SigninComponent() {
  const [state, setState] = useState<StateType>({
    loading: false,
    siteLoading: true,
    snackbar: false,
    message: "",
    loggedIn: false,
    recorder: false
  });

  const handleClose = () => {
    setState({ ...state, snackbar: false });
  };

  const handleLoadingLogin = (bool: boolean) => {
    setState({ ...state, loading: bool });
  };

  const handleSnackbar = (bool: boolean, mess: string) => {
    setState({ ...state, snackbar: bool, message: mess });
  };

  const logger = async () => {
    if (localStorage.getItem("type") === "10") {
      setState({ ...state, recorder: true });
    }
    setState({ ...state, loggedIn: true });
  };

  return (
    <>
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
            marginTop: "64px"
          }}
        >
          {/* {this.state.loading && <SignInLoader />} */}
          <img alt=" " src={Logo} style={{ width: "251px", height: "57px" }} />
          <Card
            style={{
              paddingTop: "20px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "15px",
              width: "100%",
              height: "230px",
              borderRadius: "0px"
            }}
          >
            <SignInForm
              handleLoadingLogin={handleLoadingLogin}
              handleSnackbar={handleSnackbar}
              logger={logger}
            />
          </Card>
        </div>
      </div>
    </>
  );
}

export default SigninComponent;