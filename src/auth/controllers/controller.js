import {
  post,
  withToken
} from "../../utils/api";

function login(username, password) {
  return post("/identity/user/login/", {
      username,
      password
    })
    .then(res => {
      localStorage.setItem("ngStorage-ppToken", res.data.auth_token);
      return withToken(`/identity/user/profile/`, res.data.auth_token)
<<<<<<< HEAD
        .then(({ data }) => {
=======
        .then(({
          data
        }) => {
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
          localStorage.setItem("user", data.first_name);
          localStorage.setItem("uuid", data.uuid);
          localStorage.setItem("type", data.groups[0]);
          return true;
        })
        .catch(err => console.log(err));
    })
    .catch(() => false);
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

<<<<<<< HEAD
export { login, logout, typeChecker };
=======
export {
  login,
  logout
};
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
