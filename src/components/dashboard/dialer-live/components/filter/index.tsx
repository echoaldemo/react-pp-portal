import React, { useState } from "react";

import { MenuItem } from "@material-ui/core";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { KeyboardArrowDown } from "@material-ui/icons";

import { InputField } from "common-components";

import { makeStyles } from "@material-ui/styles";

import styled from "styled-components";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#1194f6" }
  },
  overrides: {
    MuiInputLabel: {
      shrink: {
        "&&": {
          color: "#bbbbbb !important"
        }
      }
    },
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: `2px solid rgba(238, 238, 238, 0.99)`
        },
        "&:hover:not($disabled):before": {
          borderBottom: "2px solid #1194f6"
        },
        "&:hover:not($disabled):after": {
          borderBottom: "2px solid #1194f6"
        },
        "&:after": {
          borderBottom: "2px solid #1194f6"
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

const useStyles = makeStyles({});

const Filter = (props: any) => {
  let classes = useStyles();
  const [value, setValue] = useState("");

  function handleChange(value: any) {
    setValue(value);
    props.result(props.tag, value);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <InputField
        style={{ width: "300px", marginRight: "51px" }}
        select
        SelectProps={{
          IconComponent: () => <KeyboardArrowDown />,
          onChange: (e: any) => handleChange(e.target.value)
        }}
        label={props.tag}
        value={value ? value : props.filterData[0].name}
      >
        {props.filterData.map((key: any) => (
          <MenuItem key={key.name} value={key.name} data-cy="select-list">
            {key.name}
          </MenuItem>
        ))}
      </InputField>
    </MuiThemeProvider>
  );
};

export default Filter;
