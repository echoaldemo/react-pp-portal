import React, { useState } from "react";
import { InputField } from "common-components";
import { Grid, MenuItem } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 250
    }
  }
};
const DropdownIcon = () => {
  return <KeyboardArrowDown style={{ color: "#444851" }} />;
};

function DialerForm() {
  const initialState = {
    interval: "Number of seconds between calling the dialer algorithm",
    requested_call:
      "Max number of calls/logged in stations on a single dial request. 0 is no limit",
    call_ratio:
      "The autodialer will call a new prospect whenever the ratio of outgoing calls to ready rep relogins falls below the value",
    damper_threshold: "Number of seconds between calling the dialer algorithm"
  };

  const [errMsg, setErrMsg] = useState(initialState); // eslint-disable-line

  return (
    <form>
      <Grid container spacing={5}>
        <Grid item lg={6} xs={12} sm={12} xl={6}>
          <InputField
            label="Dialer Interval"
            data-cy="dialer-interval"
            fullWidth
            required
            select
            style={{ marginTop: 16 }}
            SelectProps={{
              IconComponent: () => <DropdownIcon />,
              ...MenuProps
            }}
            value={3}
            helperText={errMsg.interval}
          >
            {[1, 2, 3].map(item => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </InputField>
        </Grid>
        <Grid item lg={6} xs={12} sm={12} xl={6}>
          <InputField
            label="Max Requested calls per agent"
            fullWidth
            margin="normal"
            value="1.00"
            helperText={errMsg.requested_call}
          />
        </Grid>

        <Grid item lg={6} xs={12} sm={12} xl={6}>
          <InputField
            label="Calls Ratio"
            fullWidth
            margin="normal"
            value="7.00"
            required
            helperText={errMsg.call_ratio}
          />
        </Grid>

        <Grid item lg={6} xs={12} sm={12} xl={6}>
          <InputField
            label="Min Requested calls per agent"
            fullWidth
            margin="normal"
            value="0.40"
          />
        </Grid>

        <Grid item lg={6} xs={12} sm={12} xl={6}>
          <InputField
            label="Damper Threshold"
            fullWidth
            margin="normal"
            value="60.00"
            required
            helperText={errMsg.damper_threshold}
          />
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: 32 }}>
        <Grid item lg={6} xs={12} sm={12} xl={6}>
          <span className="form-required-label">*Required Fields</span>
        </Grid>
      </Grid>
    </form>
  );
}

export default DialerForm;
