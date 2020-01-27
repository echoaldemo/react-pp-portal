import axios from "axios";
let instance = axios.create();
const token = localStorage.getItem("ngStorage-ppToken");
const baseUrl = "http://devswarm.perfectpitchtech.com";
/*   process.env.REACT_APP_API_BASE_URL || `https://dev-api.perfectpitchtech.com`;
 */ instance.defaults.headers.common.Accept = "application/json";
instance.defaults.headers.post["Content-Type"] = "application/json";
if (token != null) {
  instance.defaults.headers.common["Authorization"] = `token ${token}`;
}

const CancelToken = axios.CancelToken;
let cancel;

// instance.defaults.timeout = 5000;

// instance.interceptors.response.use(
//   function(response) {
//     // awesome responded
//     localStorage.removeItem("fetching");
//     return Promise.resolve(response);
//   },
//   function(error) {
//     console.log("Connection timed out, retrying....");
//     localStorage.setItem("fetching", true);
//     // console.log("Error: ", error, "Config", error.config, error.response);
//     if (!error.config) {
//       return Promise.reject(error);
//     }
//     if (error.response) {
//       if (error.response.status < 500) {
//         return Promise.reject(error);
//       }
//     }
//     return instance(error.config);
//   }
// );

// function sleeper() {
//   console.log('Adding a delay... (^_^)')
//   return new Promise(resolve => setTimeout(resolve, 1000))
// }

const get = (endpoint, query) => {
  let test = "";
  let count = 0;
  endpoint = endpointChecker(endpoint);
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
  return instance.get(`${baseUrl}${endpoint}${test}`, {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
};

const getGroups = endpoint => {
  return instance.get(`${baseUrl}${endpoint}`, {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
};

const withToken = (endpoint, token) => {
  return instance.get(`${baseUrl}${endpoint}`, {
    headers: { Authorization: `Token ${token}` }
  });
};

const post = (endpoint, data) => {
  endpoint = endpointChecker(endpoint);
  return instance.post(`${baseUrl}${endpoint}`, data, {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
};
const patch = (endpoint, data) => {
  endpoint = endpointChecker(endpoint);
  return instance.patch(`${baseUrl}${endpoint}`, data, {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
};
const remove = endpoint => {
  endpoint = endpointChecker(endpoint);
  return instance.delete(`${baseUrl}${endpoint}`, {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
};

const endpointChecker = endpoint => {
  const regex = new RegExp(/\?/, "g");
  if (endpoint.match(regex)) {
    return endpoint;
  }
  if (endpoint[0] !== "/") {
    endpoint = `/${endpoint}`;
  }
  if (endpoint[endpoint.length - 1] !== "/") {
    endpoint = `${endpoint}/`;
  }
  return endpoint;
};

export { get, post, patch, remove, cancel, getGroups, withToken };
