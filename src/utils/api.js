import axios from "axios";
// const token = localStorage.getItem("ngStorage-ppToken");

axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
// if (token != null) {
//   axios.defaults.headers.common["Authorization"] = `token ${token}`;
// }

const baseUrl = "";
const CancelToken = axios.CancelToken;
let cancel = () => {};

const get = (endpoint, query) => {
  let test = "";
  let count = 0;
  if (query) {
    for (const key of Object.keys(query)) {
      if (count === 0) {
        test += `?${key}=${query[key]}`;
      } else {
        test += `&${key}=${query[key]}`;
      }
      count++;
    }
  }
  return axios.get(`${endpoint}${test}`);
};

const post = (endpoint, data) =>
  axios.post(`${baseUrl}${endpoint}`, data, {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
const patch = (endpoint, data) =>
  axios.patch(`${baseUrl}${endpoint}`, data, {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
const remove = endpoint =>
  axios.delete(`${baseUrl}${endpoint}`, {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });

export { get, post, patch, remove, cancel };
