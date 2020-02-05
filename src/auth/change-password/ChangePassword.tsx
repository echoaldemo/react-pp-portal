import React, { useEffect, useState } from "react";
import SEO from "../../utils/seo";
// import { post, cancel } from "../../utils/api";
import styled from "styled-components";
// import getData, { userData } from "./controllers/getUserData";
// import logout from "./controllers/logout";

import {
  SuccessModal,
  LoadingModal,
  TableLoader,
  InputField,
  BackButton,
  SaveButton
} from "common-components";
import handleInput from "./handleChange";

const userData = {
  name: "Sample Name",
  password: "Sample Password"
};
const Header = styled.p`
  font-size: 24px;
  color: #444851;
`;
const Container = styled.div`
  border-radius: 3px;
  box-shadow: 0 0 6px 1px rgba(155, 155, 155, 0.18);
  background-color: #ffffff;
  width: 100%;
  height: 75vh;
  padding: 28px 22px;
`;
const Pass = styled.strong`
  font-size: 18px;
  color: #444851;
`;
const Content = styled.div`
  width: 45%;
  height: 60%;
  margin: 55px auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const ChangePassword = ({ history }: any) => {
  const [state, setState] = useState({
    loading: true,
    user: {},
    load: false,
    done: false,
    current_password: "",
    new_password: "",
    re_new_password: "",
    error: {
      new: "",
      re: "",
      current: ""
    }
  });

  useEffect(() => {
    if (userData) {
      setState({
        ...state,
        user: userData,
        loading: false
      });
    } else {
      // getUser();
    }
    // eslint-disable-next-line
  }, []);

  // const getUser = async () => {
  //   const user = await getData();
  //   setState({
  //     ...state,
  //     user,
  //     loading: false
  //   });
  // }; // https://dev-api.perfectpitchtech.com/identity/user/set_password/

  const handleChange = (e: any) => {
    handleInput(e, state, setState);
  };
  const handleChangePass = () => {
    setState({ ...state, load: true });
    // post("/identity/user/set_password/", {
    //   current_password: state.current_password,
    //   new_password: state.new_password,
    //   re_new_password: state.re_new_password
    // })
    //   .then(() => setState({ ...state, load: false, done: true }))
    //   .catch((err: any) => {
    //     try {
    setState({
      ...state,
      done: false
      // error: {
      //   ...state.error,
      //   current: err.response.data.current_password[0]
      // }
    });
    //     } catch {
    //       console.log(err);
    //     }
    //   });
  };
  const handleCancel = () => {
    // cancel();
    setState({ ...state, load: false });
  };

  return (
    <>
      <SEO title="Change Password" />
      <BackButton
        to="/settings"
        text="Back to Settings"
        backFn={() => history.goBack()}
      />
      {state.loading ? (
        <TableLoader />
      ) : (
        <>
          <Header>Edit password</Header>
          <Container>
            <Pass>Password settings</Pass>

            <Content>
              <InputField
                id="new_password"
                fullWidth
                label="New password"
                required
                value={state.new_password}
                onChange={handleChange}
                type="password"
                error={state.error.new ? true : false}
                helperText={state.error.new ? state.error.new : " "}
                onBlur={handleChange}
              />
              <InputField
                id="re_new_password"
                fullWidth
                label="Re-enter password"
                required
                value={state.re_new_password}
                onChange={handleChange}
                type="password"
                error={state.error.re ? true : false}
                helperText={state.error.re ? state.error.re : " "}
                onBlur={handleChange}
              />
              <InputField
                id="current_password"
                fullWidth
                label="Current password"
                required
                value={state.current_password}
                onChange={handleChange}
                type="password"
                error={state.error.current ? true : false}
                helperText={state.error.current ? state.error.current : " "}
                onBlur={handleChange}
              />
              <SaveButton
                disabled={Boolean(
                  state.error.re ||
                    state.error.new ||
                    state.error.current ||
                    !state.current_password ||
                    !state.new_password ||
                    !state.re_new_password
                )}
                onClick={handleChangePass}
              >
                Save changes
              </SaveButton>
            </Content>
          </Container>
        </>
      )}
      <LoadingModal
        open={state.load}
        text={"One moment. We’re changing the password…"}
        cancelFn={handleCancel}
      />
      <SuccessModal
        open={state.done}
        text={"Password Changed Successfully"}
        closeFn={() => {
          // logout();
        }}
      />
    </>
  );
};

export default ChangePassword;
