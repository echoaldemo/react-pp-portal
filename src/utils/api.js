import axios from 'axios'
//sam token
// const token = localStorage.getItem("ngStorage-ppToken");
const token = '6076491441e22edab73be6bde2793b138fb6de7e' // TOKEN
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json' //CONTENT TYPE
if (token != null) {
  axios.defaults.headers.common['Authorization'] = `token ${token}` // AUTHORIZATION
}

const baseUrl = 'http://devswarm.perfectpitchtech.com' // BASE URL OF THE API SERVER
const CancelToken = axios.CancelToken
let cancel = () => {}


// EXPORTED TOOLS

// method("endpoints", {"options"})
//   .then((res) => {
//   --data manipulation here--
//   })

// *** EXAMPLE FOR USING *** 
// get("/identity/user/manage/list/", {
//   limit: 10,
//   order_by: "-datetime_modified"
// }).then((res) => {
//   --data manipulation here--
// })

//get method
const get = (endpoint, query) => {
  let test = ''
  let count = 0
  if (query) {
    for (const key of Object.keys(query)) {
      if (count === 0) {
        test += `?${key}=${query[key]}`
      } else {
        test += `&${key}=${query[key]}`
      }
      count++
    }
  }
  return axios.get(`${baseUrl}${endpoint}${test}`)
}

//post method
const post = (endpoint, data) =>
  axios.post(`${baseUrl}${endpoint}`, data, {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c
    })
  })

//patch method
const patch = (endpoint, data) =>
  axios.patch(`${baseUrl}${endpoint}`, data, {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c
    })
  })

//put method
const put = (endpoint, data) =>
  axios.put(`${baseUrl}${endpoint}`, data, {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c
    })
  })

//remove method
const remove = endpoint =>
  axios.delete(`${baseUrl}${endpoint}`, {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c
    })
  })

// list of exported tools
export { get, post, patch, put, remove, cancel }
