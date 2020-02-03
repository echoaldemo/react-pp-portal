# API TOOL

This is the documentation for using the api util

Dynamic data:

token: "Your token"
baseUrl: "Url of the api server"

# IMPORT A TOOL

  ## GET METHOD
  get("{endpoint}", {query})
    .then((res) => {
      --data manipulation here--
    })

  ### EXAMPLE
  get("/identity/user/manage/list/", {query})
    .then((res) => {
    --data manipulation here--
    })

  ## POST METHOD
  post("{endpoint}", {data})
    .then((res) => {
      --data manipulation here--
    })

  ### EXAMPLE
  post("/identity/user/manage/list/", {data})
    .then((res) => {
      --data manipulation here--
    })

  ## PATCH METHOD
  patch("{endpoint}", {data})
    .then((res) => {
      --data manipulation here--
    })

  ### EXAMPLE
  patch("/identity/user/manage/list/", {data})
    .then((res) => {
      --data manipulation here--
    })

  ## PUT METHOD
  put("{endpoint}", {data})
    .then((res) => {
      --data manipulation here--
    })

  ### EXAMPLE
  put("/identity/user/manage/list/", {data})
    .then((res) => {
      --data manipulation here--
    })

  ## REMOVE METHOD
  get("{endpoint}")
    .then((res) => {
      --data manipulation here--
    })

  ### EXAMPLE
  get("/identity/user/manage/list/", {query})
    .then((res) => {
      --data manipulation here--
    })


