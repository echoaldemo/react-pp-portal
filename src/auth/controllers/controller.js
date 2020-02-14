import { post, withToken } from "../../utils/api";
function login(username, password) {
  return post("/identity/user/login/", {
    username,
    password
  })
    .then(res => {
      localStorage.setItem("ngStorage-ppToken", res.data.auth_token);
      return withToken(`/identity/user/profile/`, res.data.auth_token)
        .then(({ data }) => {
          localStorage.setItem("user", data.first_name);
          localStorage.setItem("uuid", data.uuid);
          localStorage.setItem("type", data.groups[0]);
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
function typeChecker() {
  if (localStorage.getItem("type") === "10") {
    return true;
  } else {
    return false;
  }
}

export { login, logout, typeChecker };
