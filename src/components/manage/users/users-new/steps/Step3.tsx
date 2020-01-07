import React from "react";
import { MenuItem, Grid, Typography } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CustomText, useStyles, TitleTag } from "../styles";
import { InputField as SelectField } from "common-components";

type Props = {
  disabled?: any;
  setDisabled?: any;
  label?: string;
  title?: any;
  selected?: any;
  selectTitle?: any;
  resultSelection?: any;
  values?: any;
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 250
    }
  }
};

const Step3 = ({
  disabled,
  setDisabled,
  label,
  title,
  selected,
  selectTitle,
  resultSelection,
  values
}: Props) => {
  const classes = useStyles();

  function sendSelection(value: any) {
    resultSelection(label)(value);
  }

  const selectProps = {
    SelectProps: {
      MenuProps,
      IconComponent: () => <KeyboardArrowDown />,
      onChange: (e: any) => sendSelection(e.target.value)
    }
  };

  const valueProp = {
    value: selected ? selected : -1
  };

  return (
    <div
      style={{
        maxWidth: "100%",
        minHeight: "auto",
        margin: 0
      }}
    >
      <TitleTag>{title}</TitleTag>

      <SelectField
        data-cy="select-3-5"
        style={{ margin: "14px 0 26px 0", width: "360px" }}
        label={selectTitle}
        select
        {...selectProps}
        margin="normal"
        {...valueProp}
      >
        <MenuItem style={{ minHeight: "36px" }} key="none" value={-1}>
          <CustomText>None</CustomText>
        </MenuItem>
        {values.map((key: any) => {
          return (
            <MenuItem
              style={{ minHeight: "36px" }}
              key={key.id}
              value={key.uuid}
              data-cy="select-list"
            >
              <CustomText>{key.name}</CustomText>
            </MenuItem>
          );
        })}
      </SelectField>
    </div>
  );
};
export { Step3 };
