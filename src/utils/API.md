# API TOOL

This is the documentation for using the api util

<b>Dynamic data:</b>

<b>token</b>: { Your token } <br />
<b>baseUrl</b>: { Url of the api server }

## IMPORT A TOOL

### GET METHOD

```
get("{endpoint}", {query})
  .then((res) => {
    --data manipulation here--
  })
```

#### `EXAMPLE`

```
get("/identity/user/manage/list/", {
  limit: 10,
  order_by: "-datetime_modified"
}).then((res) => {
  --data manipulation here--
})
```

### POST METHOD

```
post("{endpoint}", {data})
  .then((res) => {
    --data manipulation here--
  })
```

#### `EXAMPLE`

```
post('/identity/user/manage/check_username/', { username: "user" })
  .then((res) => {
    --data manipulation here--
  })
```

### PATCH METHOD

```
patch("{endpoint}", {data})
  .then((res) => {
    --data manipulation here--
  })
```

#### `EXAMPLE`

```
patch("/identity/user/manage/list/", { username: "user" })
  .then((res) => {
    --data manipulation here--
  })
```

### PUT METHOD

```
put("{endpoint}", {data})
  .then((res) => {
    --data manipulation here--
  })
```

#### `EXAMPLE`

```
put("/identity/user/manage/list/", { username: "user" })
  .then((res) => {
    --data manipulation here--
  })
```

### REMOVE METHOD

```
remove("{endpoint}")
  .then((res) => {
    --data manipulation here--
  })
```

#### `EXAMPLE`

```
remove("/identity/user/manage/list/")
  .then((res) => {
    --data manipulation here--
  })
```
