import React, { useState, useEffect } from "react";
import { MenuItem, Checkbox, Grid, Typography } from "@material-ui/core";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";
import { InputField as SelectField } from "common-components";
import { getRoleInfo } from "../RoleInfo";
import { DescribeRole } from "../components";
import { CustomText, theme } from "../styles";
import { useStyles, TitleTag } from "../styles";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 250
    }
  }
};

type Props = {
  disabled?: any;
  setDisabled?: any;
  selectFn: any;
  label: any;
  roles: any;
  selected: any;
};

const divStyle = {
  margin: "0 4px"
};

const Step2 = ({
  disabled,
  setDisabled,
  selectFn,
  label,
  roles,
  selected
}: Props) => {
  const [up, setUp] = useState(!false);
  const classes = useStyles();
  const selectStyle = { margin: "14px 0 26px 0", width: "360px" };
  const selectProps = {
    SelectProps: {
      IconComponent: () => <KeyboardArrowDown />,
      MenuProps,
      multiple: true,
      onChange: selectFn("role"),
      value: selected,
      renderValue: (selected: any) =>
        selected
          .map((select: any) => {
            return roles
              .filter((rls: any) => rls.pk === select)
              .map((data: any) => data.name);
          })
          .join(", ")
    }
  };

  let description = getRoleInfo(selected[selected.length - 1]);

  return (
    <>
      <TitleTag>Roles</TitleTag>

      <SelectField
        data-cy="roles"
        style={selectStyle}
        label="User role*"
        select={true}
        margin="normal"
        {...selectProps}
      >
        {roles.map((key: any) => {
          return (
            <MenuItem key={key.id} value={key.pk} data-cy="roles-list">
              <Checkbox
                color="primary"
                checked={selected.indexOf(key.pk) > -1}
              />
              <CustomText>{key.name}</CustomText>
            </MenuItem>
          );
        })}
      </SelectField>
      {roles && Boolean(selected.length) && (
        <>
          <div
            onClick={() => setUp(!up)}
            style={{
              display: "flex",
              flexDirection: "row",
              cursor: "pointer",
              marginBottom: "13px"
            }}
          >
            <CustomText>{up ? "Close" : "Info"}</CustomText>
            {up ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </div>
        </>
      )}

      {up && (
        <Grid container spacing={1}>
          <Grid item style={divStyle}>
            <DescribeRole description={description} />
          </Grid>
        </Grid>
      )}
    </>
  );
};
export { Step2 };
