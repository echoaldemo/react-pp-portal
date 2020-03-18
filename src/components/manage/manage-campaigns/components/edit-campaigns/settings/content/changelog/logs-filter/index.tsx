import { KeyboardArrowDown } from "@material-ui/icons";
import React, { useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  withStyles
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { SaveButton, SearchBar } from "common-components";
import Styles from "./indexStyle";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#1194f6" }
  },
  overrides: {
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: `1px solid rgba(238, 238, 238, 0.99)`
        },
        "&:hover:not($disabled):before": {
          borderBottom: "1px solid #1194f6"
        },
        "&:after": {
          borderBottom: "1px solid #1194f6"
        }
      }
    },
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "#ffffff"
        }
      }
    },
    MuiListItem: {
      button: {
        "&:hover": {
          backgroundColor: "#ffffff"
        }
      },
      root: {
        "&$selected": {
          backgroundColor: "#ffffff",
          "&&:hover": {
            backgroundColor: "#ffffff"
          },
          "&&:active:after": {
            backgroundColor: "#ffffff"
          }
        }
      }
    }
  }
});

interface Props {
  data: Array<Object>;
  originalData: Array<Object>;
  handleFilterUpdate: (data: any) => void;
  modalFunc: any;
  classes: any;
}

const LogsFilter: React.FC<Props> = ({
  data,
  originalData,
  handleFilterUpdate,
  modalFunc,
  classes
}) => {
  const [userValue, setUserValue] = useState(0);
  const [createValue, setCreateValue] = useState(0);

  const selectProps = {
    selectprops: { IconComponent: () => <KeyboardArrowDown /> }
  };

  const removeDuplicates = (originalArray: any, prop: any) => {
    var newArray = [];
    var lookupObject = [];

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }

    return newArray;
  };

  const filterData = () => {
    let userVal = userValue;
    let createVal = createValue;

    var newArray = originalData.filter((el: any) => {
      return createVal === 0 && userVal !== 0
        ? el.username === userVal
        : createVal !== 0 && userVal === 0
        ? el.created === createVal
        : el.username === userVal && el.created === createVal;
    });

    if (userVal === 0 && createVal === 0) {
      handleFilterUpdate(originalData);
    } else {
      handleFilterUpdate(newArray);
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.itemContainer}>
        <SearchBar
          title="Changes"
          userData={originalData}
          headers={["original_fields", "changed_fields"]}
          modalFunc={modalFunc}
        />

        <Grid container className={classes.gridContainer}>
          <Grid item xs={3} md={3} lg={3} className={classes.gridItem}>
            <FormControl className={classes.formControl}>
              <InputLabel>
                <span style={{ fontSize: 18, color: "#bbbbbb" }}>User</span>
              </InputLabel>
              <Select
                className={classes.root}
                id="demo-simple-select"
                value={userValue}
                onChange={(e: any) => setUserValue(e.target.value)}
                {...selectProps}
              >
                <MenuItem value={0}>All</MenuItem>
                {removeDuplicates(originalData, "username").map(
                  (item: any, i: number) => (
                    <MenuItem value={item.username} key={i}>
                      {item.user}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={3} lg={3} className={classes.gridItem}>
            <FormControl className={classes.formControl}>
              <InputLabel>
                <span style={{ fontSize: 18, color: "#bbbbbb" }}>Created</span>
              </InputLabel>
              <Select
                id="demo-simple-select"
                value={createValue}
                onChange={(e: any) => setCreateValue(e.target.value)}
                {...selectProps}
              >
                <MenuItem value={0}>All</MenuItem>
                {removeDuplicates(originalData, "created").map(
                  (item: any, i: number) => (
                    <MenuItem value={item.created} key={i}>
                      {item.created}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
            md={6}
            lg={6}
            className={classes.gridItem}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <SaveButton
              style={{ backgroundColor: "#7C8A97", color: "#eeeeee" }}
              onClick={() => {
                filterData();
              }}
            >
              Apply
            </SaveButton>
          </Grid>
        </Grid>
      </div>
    </MuiThemeProvider>
  );
};

export default withStyles(Styles)(LogsFilter);
