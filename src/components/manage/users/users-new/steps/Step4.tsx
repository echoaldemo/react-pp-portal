import React, { useState } from "react";
import { MenuItem, Checkbox } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import { TitleTag, CustomText } from "../styles";
import { InputField as SelectField } from "common-components";

type Props = {
  disabled?: any;
  setDisabled?: any;
  selectTitle: any;
  selectFn: any;
  label: any;
  selected: any;
  selectedCompany: any;
  campaign: any;
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 250
    }
  }
};

const Step4 = ({
  disabled,
  setDisabled,
  selectTitle,
  selectFn,
  label,
  selected,
  selectedCompany,
  campaign
}: Props) => {
  const selectProps = {
    SelectProps: {
      IconComponent: () => <KeyboardArrowDown />,
      MenuProps,
      multiple: true,
      onChange: (e: any) => selectFn(e.target.value),
      value: selected ? selected : [],
      renderValue: (selected: any) =>
        selected
          .map((select: any) => {
            return campaign
              .filter((rls: any) => rls.uuid === select)
              .map((data: any) => data.name);
          })
          .join(", ")
    }
  };

  return (
    <div
      style={{
        maxWidth: "100%",
        minHeight: "auto",
        margin: 0
      }}
    >
      <TitleTag>Campaign Info</TitleTag>

      <SelectField
        data-cy="campaign"
        style={{ margin: "14px 0 26px 0", width: "360px" }}
        label={selectTitle}
        select
        {...selectProps}
        margin="normal"
      >
        {selectedCompany
          ? campaign
              .filter((c: any) => c.company === selectedCompany)
              .map((key: any, i: number) => {
                return (
                  <MenuItem key={i} value={key.uuid} data-cy="campaign-list">
                    <Checkbox
                      color="primary"
                      checked={selected.indexOf(key.uuid) > -1}
                    />
                    <CustomText>{key.name}</CustomText>
                  </MenuItem>
                );
              })
          : campaign.map((key: any, i: number) => {
              return (
                <MenuItem key={i} value={key.uuid} data-cy="campaign-list">
                  <Checkbox
                    color="primary"
                    checked={selected.indexOf(key.uuid) > -1}
                  />
                  <CustomText>{key.name}</CustomText>
                </MenuItem>
              );
            })}
        {selectedCompany
          ? campaign.filter((c: any) => c.company === selectedCompany)
              .length === 0 && (
              <p style={{ paddingLeft: 15 }}>
                No campaigns for the selected company
              </p>
            )
          : null}
      </SelectField>
    </div>
  );
};
export { Step4 };
