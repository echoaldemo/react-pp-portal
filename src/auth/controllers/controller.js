import { post, withToken } from "../../utils/api";
function login(username, password) {
  return post("/identity/user/login/", {
    username,
    password
  })
    .then(res => {
      localStorage.setItem("ngStorage-ppToken", res.data.auth_token);
      return withToken(`/identity/user/profile/`, res.data.auth_token)
        .then(res => {
          localStorage.setItem("user", res.data.first_name);
          return true;
        })
        .catch(err => console.log(err));
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
