import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import { MuiThemeProvider } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SaveButton } from "common-components";
import { theme, useStyles } from "../../styles/EditMetricsModal.style";

interface CheckBoxLabelProps {
  name: string;
  label: string;
}

export default function EditMetrics() {
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);
  const [selected, setSelected] = useState<Array<string>>([
    "checked1",
    "checked2"
  ]);
  const [selectDefault] = useState<Array<string>>(["checked1", "checked2"]);
  const [textAreaVal, setTextAreaVal] = useState<string>(
    `{
  "value":[
    "salesPerBillableHour"
  ]
}`
  );
  const [defaultTextAreaVal] = useState<string>(
    `{
  "value":[
    "salesPerBillableHour"
  ]
}`
  );
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };
  const handleSelect = (name: string) => {
    let temp = [...selected];
    if (selected.indexOf(name) === -1) {
      temp.push(name);
      setSelected(temp);
    } else {
      temp.splice(selected.indexOf(name), 1);
      setSelected(temp);
    }
  };
  const handleSelectAll = () => {
    setSelected([
      "checked1",
      "checked2",
      "checked3",
      "checked4",
      "checked5",
      "checked6",
      "checked7",
      "checked8",
      "checked9",
      "checked10",
      "checked11",
      "checked12",
      "checked12",
      "checked13",
      "checked14",
      "checked15",
      "checked16",
      "checked17",
      "checked18",
      "checked19"
    ]);
  };

  //component
  const CheckBoxLabel = ({ name, label }: CheckBoxLabelProps) => {
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <Grid
            item
            xs={1}
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <Checkbox
              onClick={() => handleSelect(name)}
              color="primary"
              checked={selected.indexOf(name) === -1 ? false : true}
            />
          </Grid>
          <Grid
            item
            xs={3}
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <p
              onClick={() => handleSelect(name)}
              className={
                selected.indexOf(name) === -1
                  ? classes.unCheckedText
                  : classes.CheckedText
              }
            >
              {label}
            </p>
          </Grid>
        </MuiThemeProvider>
      </>
    );
  };
  return (
    <React.Fragment>
      <Grid container className={classes.navBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          className={classes.Tabs}
          classes={{
            indicator: classes.indicator
          }}
        >
          <Tab
            label="Select Metrics"
            className={value === 0 ? classes.activeTab : classes.notActive}
          />
          <Tab
            label="Share Settings"
            className={value === 1 ? classes.activeTab : classes.notActive}
          />
        </Tabs>
      </Grid>
      <Grid container alignItems="center">
        {value === 0 ? null : (
          <Grid item xs={12}>
            <p className={classes.copyText}>
              Copy settings to share. Paste and save settings below.
            </p>
          </Grid>
        )}

        <Grid item xs style={{ display: "flex", justifyContent: "flex-start" }}>
          <p
            className={classes.SelectText}
            onClick={() => {
              if (value === 0) {
                setSelected(selectDefault);
              } else {
                setTextAreaVal(defaultTextAreaVal);
              }
            }}
          >
            {value === 0 ? "Select default" : "Reset"}
          </p>
        </Grid>
        <Grid item xs></Grid>
        <Grid item xs style={{ display: "flex", justifyContent: "flex-end" }}>
          {value === 0 ? (
            <p
              className={classes.SelectText}
              onClick={() => {
                if (value === 0) {
                  handleSelectAll();
                }
              }}
            >
              Select all
            </p>
          ) : (
            <CopyToClipboard text={textAreaVal}>
              <p
                className={classes.SelectText}
                onClick={() => {
                  if (value === 0) {
                    handleSelectAll();
                  }
                }}
              >
                Copy Settings
              </p>
            </CopyToClipboard>
          )}
        </Grid>
      </Grid>

      {value === 0 ? (
        <Grid container spacing={0}>
          <CheckBoxLabel name="checked1" label="Average talk time" />
          <CheckBoxLabel name="checked2" label="Average talk time / Transfer" />
          <CheckBoxLabel name="checked3" label="Calls / Billable hour" />
          <CheckBoxLabel name="checked4" label="Calls / Machine hour" />
          <CheckBoxLabel name="checked5" label="Completed transfers" />
          <CheckBoxLabel name="checked6" label="Contacted conversion rate" />
          <CheckBoxLabel name="checked7" label="Interupt / Call" />
          <CheckBoxLabel name="checked8" label="Invalid calls" />
          <CheckBoxLabel name="checked9" label="Revenue" />
          <CheckBoxLabel name="checked10" label="Revenue / Billable Hour" />
          <CheckBoxLabel name="checked11" label="Revenue Call" />
          <CheckBoxLabel name="checked12" label="Revenue / Machine hour" />
          <CheckBoxLabel name="checked13" label="Sales" />
          <CheckBoxLabel name="checked14" label="Sales / Billable hour" />
          <CheckBoxLabel name="checked15" label="Sales / Call" />
          <CheckBoxLabel name="checked16" label="Sales / Machine hour" />
          <CheckBoxLabel name="checked17" label="Transfer minutes" />
          <CheckBoxLabel name="checked18" label="Transfers / Billable hour" />
          <CheckBoxLabel name="checked19" label="Transfers / Machine hour" />
        </Grid>
      ) : (
        <TextareaAutosize
          rows={22}
          value={textAreaVal}
          style={{ width: "100%" }}
          onChange={e => {
            setTextAreaVal(e.target.value);
          }}
        />
      )}
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <SaveButton style={{ margin: "10px" }}>Save</SaveButton>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
