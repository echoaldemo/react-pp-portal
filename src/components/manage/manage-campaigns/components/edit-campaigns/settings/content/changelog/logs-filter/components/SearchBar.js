import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import GearIcon from "@material-ui/icons/Settings";

import {
  Paper,
  Grid,
  Collapse,
  List,
  ListItem,
  ListItemText,
  TableRow,
  Table,
  TableBody,
  Menu
} from "@material-ui/core";
import { ActiveCell } from "common-components";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

import { Link } from "react-router-dom";

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        borderBottom: "none"
      }
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  inputField: {
    fontSize: "1.2rem",
    "&&&&:hover:before": {
      borderBottom: "1px solid rgba(0,0,0,0.1)"
    },
    "&:before": {
      borderBottom: "1px solid rgba(0,0,0,0.1)"
    },
    "&:after": {
      borderBottom: "2px solid #1394f6"
    }
  }
}));
function isObject(val) {
  return typeof val === "object";
}
export default function SearchBar(props) {
  const classes = useStyles();
  const {
    title,
    userData,
    headers,
    pathnameData,
    link,
    settings,
    setActiveDataMethod,
    loading,
    active,
    modalFunc
  } = props;
  const [results, setResults] = useState(null);
  const [DummyResults, setDummyResults] = useState(userData);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [textSearch, setTextSearch] = React.useState("");

  const handleClick = (event, data) => {
    setAnchorEl(event.currentTarget);
    setActiveDataMethod(data);
  };
  const handClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (loading) {
      setTextSearch("");
      setResults(null);
      setAnchorEl(null);
    }
  }, [setTextSearch, loading, setResults, setAnchorEl]);
  var filtered = [];
  let timeout = null;
  const handleSearch = e => {
    setTextSearch(e.target.value);
    const regex = /[*()?+[\\]/gi;
    if (props.typed) {
      props.typed(e.target.value);
    }
    let event = e.target.value.replace(regex, "");
    if (event.length !== 0) {
      const arr = JSON.stringify(userData, function(key, value) {
        return value || false;
      });
      const campaigns = JSON.parse(arr);
      var filteredData = [];
      campaigns.map(data => {
        headers.filter(head => {
          if (isObject(data[head])) {
            let baseKey = data[head][Object.keys(data[head])];

            try {
              if (
                baseKey[Object.keys(baseKey)[0]]
                  .toLowerCase()
                  .includes(event.toLowerCase())
              ) {
                filteredData.push({
                  name: baseKey[Object.keys(baseKey)[0]],
                  ...data
                });
              }
            } catch {}
          }
        });
      });
      filtered.push([...new Set(filteredData)]);

      // clearTimeout(timeout);
      // timeout = setTimeout(() => {
      //   if (filtered !== null) {
      //     if (filtered[0].length !== 0) {
      //       setDummyResults(filtered[0]);
      //     }
      //       setDummyResults(filtered[0]);
      //   } else {
      //     setResults(null);
      //   }
      // }, 300);
      setDummyResults(filtered[0]);
      setResults(filtered[0]);
    } else {
      filtered = null;
      setResults(null);
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <Grid container style={{ width: "100%" }}>
          <Grid item xs={12} lg={12}>
            <TextField
              disabled={loading !== undefined ? loading : false}
              onChange={e => handleSearch(e)}
              id="standard-full-width"
              value={textSearch}
              placeholder={`Search for ${title}`}
              fullWidth
              margin="normal"
              autoComplete="off"
              style={{
                fontSize: 50,
                padding: "5px 15px 15px 15px",
                width: "100%"
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon style={{ color: "#bbb" }} fontSize="small" />
                  </InputAdornment>
                ),
                classes: {
                  underline: classes.inputField,
                  root: classes.inputField
                }
              }}
            />
          </Grid>
          {results !== null ? (
            results.length !== 0 ? null : (
              <Grid
                item
                xs={12}
                lg={12}
                style={{ paddingLeft: 10, paddingRight: 10, marginTop: -15 }}
              ></Grid>
            )
          ) : null}
          <Collapse
            in={
              results !== null ? (results.length !== 0 ? false : true) : false
            }
            timeout={1000}
            unmountOnExit
            style={{ width: "100%" }}
          >
            {" "}
            <Paper
              style={{
                width: "100%",
                fontSize: "18px",
                color: "#7c8a97",
                padding: 20,
                backgroundColor: "white",
                zIndex: 1
              }}
            >
              No results - Try searching for{" "}
              {headers === undefined ? "other fields" : `${headers}`}
            </Paper>
          </Collapse>

          <Collapse
            in={
              results !== null ? (results.length === 0 ? false : true) : false
            }
            timeout={1000}
            unmountOnExit
            style={{ width: "100%" }}
          >
            <List
              component="nav"
              aria-label="search results"
              style={{
                maxHeight: 300,
                height: 300,
                overflow: "auto",
                width: "100%"
              }}
            >
              {results === null
                ? DummyResults.map((result, i) => {
                    return (
                      <ListItem key={i}>
                        <Grid container>
                          <Grid item>
                            <ListItemText
                              primary={
                                title === "User"
                                  ? `${result.first_name} ${result.last_name}`
                                  : `${result.name}`
                              }
                            />
                          </Grid>
                          <Grid
                            item
                            style={{ marginLeft: "auto", paddingRight: 20 }}
                          >
                            <Grid container spacing={5}>
                              <Grid item>
                                {active !== undefined &&
                                  (active === true && (
                                    <Table>
                                      <TableBody>
                                        <TableRow>
                                          <ActiveCell>
                                            {title === "User"
                                              ? result.is_active
                                              : result.active}
                                          </ActiveCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  ))}
                              </Grid>
                              {settings !== undefined && (
                                <Grid item style={{ marginTop: 10 }}>
                                  <GearIcon style={{ color: "#777777" }} />
                                </Grid>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </ListItem>
                    );
                  })
                : results.length === 0
                ? DummyResults.map((result, i) => {
                    return (
                      <ListItem key={i}>
                        <Grid container>
                          <Grid item>
                            <ListItemText
                              primary={
                                title === "User"
                                  ? `${result.first_name} ${result.last_name}`
                                  : `${result.name}`
                              }
                            />
                          </Grid>
                          <Grid
                            item
                            style={{ marginLeft: "auto", paddingRight: 20 }}
                          >
                            <Grid container spacing={5}>
                              <Grid item>
                                {active !== undefined &&
                                  (active === true && (
                                    <Table>
                                      <TableBody>
                                        <TableRow>
                                          <ActiveCell>
                                            {title === "User"
                                              ? result.is_active
                                              : result.active}
                                          </ActiveCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  ))}
                              </Grid>
                              {settings !== undefined && (
                                <Grid item style={{ marginTop: 10 }}>
                                  <GearIcon
                                    style={{ color: "#777777" }}
                                    onClick={e => handleClick(e, result)}
                                  />
                                </Grid>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </ListItem>
                    );
                  })
                : results.map((result, i) => {
                    return (
                      <div key={i}>
                        {link !== undefined ? (
                          <Link
                            key={result.uuid}
                            style={{
                              textDecoration: "none",
                              color: "#000"
                            }}
                            to={{
                              pathname: `${pathnameData.firstLink}${
                                pathnameData.fetchData.length > 1
                                  ? pathnameData.fetchData[0] === "uuid"
                                    ? pathnameData.fetchData[1] === "slug"
                                      ? result.uuid + "/" + result.slug
                                      : null
                                    : pathnameData.fetchData[0] === "slug"
                                    ? pathnameData.fetchData[1] === "uuid"
                                      ? result.slug + "/" + result.uuid
                                      : null
                                    : null
                                  : pathnameData.fetchData[0] === "uuid"
                                  ? result.uuid
                                  : pathnameData.fetchData[0] === "slug"
                                  ? result.slug
                                  : null
                              }${pathnameData.lastLink}`,
                              state: {
                                company: result
                              }
                            }}
                          >
                            <ListItem
                              button
                              onClick={() => {
                                localStorage.setItem(
                                  `companyslug`,
                                  result.slug
                                );
                                localStorage.setItem(
                                  `campaignuuid`,
                                  result.uuid
                                );
                              }}
                            >
                              <Grid container>
                                <Grid item>
                                  <ListItemText
                                    primary={
                                      title === "User"
                                        ? `${result.first_name} ${result.last_name}`
                                        : `${result.name}`
                                    }
                                  />
                                </Grid>
                                <Grid
                                  item
                                  style={{
                                    marginLeft: "auto",
                                    paddingRight: 20
                                  }}
                                >
                                  <Grid container spacing={5}>
                                    <Grid item>
                                      {active !== undefined &&
                                        (active === true && (
                                          <Table>
                                            <TableBody>
                                              <TableRow>
                                                <ActiveCell>
                                                  {title === "User"
                                                    ? result.is_active
                                                    : result.active}
                                                </ActiveCell>
                                              </TableRow>
                                            </TableBody>
                                          </Table>
                                        ))}
                                    </Grid>
                                    {settings !== undefined && (
                                      <Grid item style={{ marginTop: 10 }}>
                                        <GearIcon
                                          style={{ color: "#777777" }}
                                          onClick={e => handleClick(e, result)}
                                        />
                                        <Menu
                                          onClose={handClose}
                                          style={{ marginTop: 40 }}
                                          id="simple-menu"
                                          anchorEl={anchorEl}
                                          open={Boolean(anchorEl)}
                                        >
                                          {settings}
                                        </Menu>
                                      </Grid>
                                    )}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </ListItem>
                          </Link>
                        ) : (
                          <>
                            <ListItem
                              button
                              onClick={
                                modalFunc !== undefined
                                  ? () => modalFunc(result)
                                  : () => null
                              }
                              key={result.uuid}
                            >
                              <Grid container>
                                <Grid item>
                                  <ListItemText
                                    primary={
                                      title === "User"
                                        ? `${result.first_name} ${result.last_name}`
                                        : `${result.name}`
                                    }
                                  />
                                </Grid>
                                <Grid
                                  item
                                  style={{
                                    marginLeft: "auto",
                                    paddingRight: 20
                                  }}
                                >
                                  <Grid container spacing={5}>
                                    <Grid item>
                                      {active !== undefined &&
                                        (active === true && (
                                          <Table>
                                            <TableBody>
                                              <TableRow>
                                                <ActiveCell>
                                                  {title === "User"
                                                    ? result.is_active
                                                    : result.active}
                                                </ActiveCell>
                                              </TableRow>
                                            </TableBody>
                                          </Table>
                                        ))}
                                    </Grid>

                                    <Grid item style={{ marginTop: 10 }}>
                                      {Object.keys(result.changed_fields).join(
                                        ", "
                                      )}
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </ListItem>
                          </>
                        )}
                      </div>
                    );
                  })}
              <Menu
                onClose={handClose}
                style={{ marginTop: 40 }}
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
              >
                {settings}
              </Menu>
            </List>
          </Collapse>
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}
