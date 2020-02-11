import React, { useState } from "react";
import { MenuItem, Checkbox } from "@material-ui/core";
import {
  Btn,
  CreateBtn,
  Cancel,
  Disabled,
  CreateText,
  BtnCont,
  Content
} from "./NewCampaignStyle";
import { InputField } from "common-components";
const NewCampaign = ({ closeFn, realms, companys, newFn }) => {
  const [name, setName] = useState("");
  const [addCompany, setAddCompany] = useState("");
  const [addRealms, setAddRealms] = useState([]);
  const [create, setCreate] = useState(false);
  const [errMsg, setErrMsg] = useState({});

  const handleSubmit = () => {
    const data = {
      name,
      company: addCompany,
      realms: addRealms
    };
    newFn(data, errMsg, setErrMsg);
  };
  const handleChange = (val, val2) => {
    if (val && val2) {
      setCreate(true);
    } else {
      setCreate(false);
    }
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        width: 250
      }
    }
  };

  return (
    <Content>
      <InputField
        label="Campaign name"
        id="campaign-name"
        fullWidth
        required
        margin="normal"
        value={name}
        onChange={e => {
          setName(e.target.value);
          handleChange(e.target.value, addCompany);
          setErrMsg({ ...errMsg, name: "" });
        }}
        error={errMsg.name ? true : false}
        helperText={errMsg.name ? errMsg.name : " "}
        onBlur={() => {
          if (name) {
            setErrMsg({ ...errMsg, name: "" });
          } else {
            setErrMsg({ ...errMsg, name: "A campaign name is required" });
          }
        }}
      />
      <InputField
        label="Company"
        data-cy="company"
        id="company"
        fullWidth
        required
        select
        SelectProps={{ MenuProps }}
        value={addCompany}
        error={errMsg.addCompany ? true : false}
        helperText={errMsg.addCompany ? errMsg.addCompany : " "}
        onChange={e => {
          setAddCompany(e.target.value);
          handleChange(e.target.value, name);
          setErrMsg({ ...errMsg, addCompany: "" });
        }}
        onBlur={() => {
          if (addCompany) {
            setErrMsg({ ...errMsg, addCompany: "" });
          } else {
            setErrMsg({ ...errMsg, addCompany: "A company is required" });
          }
        }}
      >
        {companys.map(company => (
          <MenuItem key={company.uuid} value={company.uuid}>
            {company.name}
          </MenuItem>
        ))}
      </InputField>
      <InputField
        label="Realms (optional)"
        data-cy="realms"
        fullWidth
        margin="normal"
        select
        SelectProps={{
          MenuProps,
          multiple: true,
          onChange: e => {
            setAddRealms(e.target.value);
          },
          value: addRealms,
          renderValue: selected =>
            selected.map(select => select.name).join(", ")
        }}
      >
        {realms.map(realm => (
          <MenuItem key={realm.uuid} value={realm}>
            <Checkbox color="primary" checked={addRealms.indexOf(realm) > -1} />
            {realm.name}
          </MenuItem>
        ))}
      </InputField>
      <BtnCont>
        <Btn>
          <Cancel onClick={closeFn}>Cancel</Cancel>
        </Btn>
        {create ? (
          <CreateBtn data-cy="create-button" onClick={handleSubmit}>
            <CreateText>Create Campaign</CreateText>
          </CreateBtn>
        ) : (
          <Btn data-cy="create-button" disabled>
            <Disabled>Create Campaign</Disabled>
          </Btn>
        )}
      </BtnCont>
    </Content>
  );
};

export default NewCampaign;
