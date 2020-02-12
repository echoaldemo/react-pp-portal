import React, { useState, useEffect } from "react";

import {
  Checkbox,
  InputLabel,
  MenuItem,
  Input,
  FormControl,
  Select,
  TextField
} from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import styles from "./Styles/optionalFields.styles";

const useStyles = makeStyles(styles);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, realms, theme) {
  return {
    fontWeight:
      realms.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function OptionalFields(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [realms, setRealms] = useState([]);
  const [values, setValues] = useState("");

  const [comp, setComp] = useState(""); // eslint-disable-line
  const [realm, setRealm] = useState(null);

  function handleChange(event) {
    setRealms(event.target.value);
    props.newRealms(event.target.value.map(val => val.uuid));
  }

  function handleChangeCompany(event) {
    setValues(event.target.value);
    props.newCompany(event.target.value);
  }

  useEffect(() => {
    // const API_URL = "http://devswarm.perfectpitchtech.com/identity/";
    // const TOKEN = "Token 3af169b196e709c737c44862f14c4bf70466b544";
    // if (props.company && !props.error) {
    //   api
    //     .fetch(
    //       `${API_URL}company/${props.company}`,
    //       "get",
    //       null,
    //       "application/json",
    //       TOKEN
    //     )
    //     .then(res => {
    //       setComp(res.data.name);
    //       props.newCompany(res.data.name);
    //     })
    //     .catch(() => {
    //       alert("error loading");
    //     });
    // }
    // if (props.realms && !props.error) {
    //   if (props.realms) {
    //     let rlm = [];
    //     props.realms.map(realm => {
    //       api
    //         .fetch(
    //           `${API_URL}realm/${realm}`,
    //           "get",
    //           null,
    //           "application/json",
    //           TOKEN
    //         )
    //         .then(res => {
    //           rlm.push(res.data.name);
    //         })
    //         .then(() => {
    //           setRealm(rlm);
    //         })
    //         .catch(() => {
    //           alert("error loading");
    //         });
    //     });
    //   }
    // } else {
    //   setComp("");
    // }
    if (props.realms === undefined) {
      setRealm(null);
    }
  }, [props.realms]);

  return (
    props.open && (
      <React.Fragment>
        <FormControl fullWidth>
          {comp ? (
            <TextField
              required
              readOnly
              label="Company"
              value={comp}
              className={classes.select}
            />
          ) : (
            <TextField
              required
              select
              label="Company"
              value={values}
              onChange={handleChangeCompany}
              className={classes.select}
              inputProps={{ name: "name", id: "company" }}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
            >
              {props.companyList.map((list, i) => (
                <MenuItem key={i} value={list.uuid}>
                  {list.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        </FormControl>

        <FormControl fullWidth>
          {comp ? (
            <TextField
              required
              readOnly
              label="Realms(Optional)"
              value={realm ? realm : "None"}
              className={classes.select}
              style={{ marginBottom: 0 }}
            />
          ) : (
            <React.Fragment>
              <InputLabel
                htmlFor="select-multiple"
                FormLabelClasses={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }}
              >
                Realms(Optional)
              </InputLabel>

              <Select
                multiple
                value={realms}
                onChange={handleChange}
                renderValue={selected => {
                  return selected.map(sel => sel.name).join(", ");
                }}
                MenuProps={MenuProps}
                input={
                  <Input
                    classes={{
                      underline: classes.underline
                    }}
                  />
                }
              >
                {props.realmList.map((data, i) => (
                  <MenuItem
                    key={i}
                    value={data}
                    style={getStyles(data, realms, theme)}
                  >
                    <Checkbox
                      style={{ color: "#1194f6" }}
                      checked={
                        realms.map(val => val.name).indexOf(data.name) > -1
                      }
                    />{" "}
                    {data.name}
                  </MenuItem>
                ))}
              </Select>
            </React.Fragment>
          )}
        </FormControl>
      </React.Fragment>
    )
  );
}
