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
import { ActiveCell } from "common-components/table-cells";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

import { Link } from "react-router-dom";

/**
 * ==============================================================================
 * <SearchBar />
 * ------------------------------------------------------------------------------
 * @param {string}        title     Title of the search
 * @param {Array}         userData  user data array
 * @param {Array}         headers   headers to be search for
 * @return {ReactElement}
 * ==============================================================================
 */

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        borderBottom: "none"
      }
    }
  }
});

const useStyles = makeStyles((theme) => ({
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
function isObject(val: string) {
  return typeof val === "object";
}

interface Props {
  typed?: any;
  title: string;
  userData: any;
  headers: any;
  pathnameData?: any;
  link?: any;
  settings?: any;
  setActiveDataMethod?: any;
  loading?: any;
  active?: any;
  modalFunc?: any;
}

interface Result {
  uuid: string;
  slug: string;
  first_name: string;
  last_name: string;
  name: string;
  is_active: any;
  active: any;
  changed_fields: any;
}

const SearchBar: React.FC<Props> = ({
  typed,
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
}) => {
  const classes = useStyles();
  const [results, setResults] = useState([]);
  const [DummyResults, setDummyResults] = useState(userData);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [textSearch, setTextSearch] = React.useState("");
  let filtered = [] as any;
  let timeout = null;

  const handleClick: Function = (event: any, data: any) => {
    setAnchorEl(event.currentTarget);
    setActiveDataMethod(data);
  };
  const handleClose: Function = () => {
    console.log("Handle Close");
    setAnchorEl(null);
  };

  useEffect(() => {
    if (loading) {
      setTextSearch("");
      setResults([]);
      setAnchorEl(null);
    }
  }, [setTextSearch, loading, setResults, setAnchorEl]);

  const handleSearch: Function = (e: any) => {
    setTextSearch(e.target.value);
    const regex = /[*()?+[\\]/gi;
    if (typed) {
      typed(e.target.value);
    }
    let event = e.target.value.replace(regex, "");
    if (event.length !== 0) {
      const arr = JSON.stringify(userData, function(key, value) {
        return value || false;
      });
      const campaigns = JSON.parse(arr);
      let filteredData = [] as any;
      campaigns.map((data: any) => {
        headers.filter((head: any) => {
          if (isObject(data[head])) {
            let baseKey = data[head][Object.keys(data[head]) as any];

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
      filtered.push([...(new Set(filteredData) as any)]);

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
      setResults([]);
    }
  };

  // #region renderSearchField

  const renderSearchField: Function = () => (
    <Grid item xs={12} lg={12}>
      <TextField
        disabled={loading !== undefined ? loading : false}
        onChange={(e) => handleSearch(e)}
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
  );

  // #endregion

  // #region renderPreSpan

  const renderPreSpan: Function = () => {
    if (results !== null) {
      let resultsLength = results !== null ? results.length : 0;
      if (resultsLength !== 0) {
        return null;
      } else {
        return (
          <Grid
            item
            xs={12}
            lg={12}
            style={{ paddingLeft: 10, paddingRight: 10, marginTop: -15 }}
          ></Grid>
        );
      }
    }
  };

  // #endregion

  // #region renderNoResult

  const renderNoResult: Function = () => {
    return (
      <>
        <Collapse
          in={textSearch.length > 0 && results.length < 1 ? true : false}
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
      </>
    );
  };

  // #endregion

  // #region renderUserResult

  const renderUserResult: Function = (result: any, i: number) => {
    return (
      <>
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
            <Grid item style={{ marginLeft: "auto", paddingRight: 20 }}>
              <Grid container spacing={5}>
                <Grid item>
                  {active !== undefined && active === true && (
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
                  )}
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
      </>
    );
  };

  // #endregion

  // #region renderCustomResult

  const renderCustomResult: Function = (result: any, i: number) => {
    return (
      <>
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
                  localStorage.setItem(`companyslug`, result.slug);
                  localStorage.setItem(`campaignuuid`, result.uuid);
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
                        {active !== undefined && active === true && (
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
                        )}
                      </Grid>
                      {settings !== undefined && (
                        <Grid item style={{ marginTop: 10 }}>
                          <GearIcon
                            style={{ color: "#777777" }}
                            onClick={(e) => handleClick(e, result)}
                          />
                          <Menu
                            {...menuProps}
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
                  modalFunc !== undefined ? () => modalFunc(result) : () => null
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
                        {active !== undefined && active === true && (
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
                        )}
                      </Grid>

                      <Grid item style={{ marginTop: 10 }}>
                        {Object.keys(result.changed_fields).join(", ")}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
            </>
          )}
        </div>
      </>
    );
  };

  // #endregion

  // #region renderResult
  const renderResult: Function = () => {
    return (
      <>
        <Collapse
          in={results !== null && results.length > 0 ? true : false}
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
            {results.length === null
              ? DummyResults.map((result: Result, i: number) => {
                  renderUserResult(result, i);
                })
              : results.length === 0
              ? DummyResults.map((result: Result, i: number) => {
                  renderUserResult(result, i);
                })
              : results.map((result: Result, i: number) => {
                  renderCustomResult(result, i);
                })}
            <Menu
              {...menuProps}
              style={{ marginTop: 40 } as React.CSSProperties}
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
            >
              {settings}
            </Menu>
          </List>
        </Collapse>
      </>
    );
  };

  // #endregion

  const menuProps = {
    onClose: () => handleClose()
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <Grid container style={{ width: "100%" }}>
          {renderSearchField()}
          {renderPreSpan()}
          {renderNoResult()}
          {renderResult()}
        </Grid>
      </div>
    </MuiThemeProvider>
  );
};

export { SearchBar };
