import React from "react";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

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
    }
  }
});

interface Props {
  date: Date;
  changeFn: any;
}

const Filter = (props: Props) => {
  const { date, changeFn } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          style={{ width: "300px", marginRight: "51px" }}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          label="Date range"
          value={date}
          onChange={changeFn}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};

export default Filter;
