import { post } from "../../utils/api";
function login(username, password) {
  return post("/identity/user/login/", {
    username,
    password
  })
    .then(res => {
      localStorage.setItem("ngStorage-ppToken", res.data.auth_token);
      return true;
    })
    .catch(() => false);
  // const response2 = await withToken(
  //   `/identity/user/profile/`,
  //   response.data.auth_token
  // );

  // localStorage.setItem("ngStorage-ppToken", response.data.auth_token);

  // return true;
}
function logout() {
  localStorage.clear();
  window.location.href = "/";
}

export { login, logout };
