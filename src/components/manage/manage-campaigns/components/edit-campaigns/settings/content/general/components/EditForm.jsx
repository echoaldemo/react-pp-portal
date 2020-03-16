<<<<<<< HEAD
import React, { useState, useContext } from "react";
=======
import React, { useState, useContext, useEffect } from "react"
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
import {
  Collapse,
  Grid,
  InputAdornment,
  Switch,
  Typography,
  MenuItem,
  Checkbox
<<<<<<< HEAD
} from "@material-ui/core";
import { InputField, CustomButton, SaveButton } from "common-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { LightTooltip } from "../../../../../../../globalConstsVar";
=======
} from "@material-ui/core"
import { InputField, CustomButton, SaveButton } from "common-components"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { LightTooltip } from "../../../../../../../globalConstsVar"
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
import {
  Delete as DeleteIcon,
  FileCopyOutlined as CopyIcon,
  KeyboardArrowDown
<<<<<<< HEAD
} from "@material-ui/icons/";
import { IdentityContext } from "contexts/IdentityProvider";
=======
} from "@material-ui/icons/"
import { IdentityContext } from "contexts/IdentityProvider"

>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 250
    }
  }
};

const DropdownIcon = () => {
<<<<<<< HEAD
  return <KeyboardArrowDown style={{ color: "#444851" }} />;
};
=======
  return <KeyboardArrowDown style={{ color: "#444851" }} />
}
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38

const EditForm = () => {
  const { state, handleSaveCampaignDetails, setOpenModal } = useContext(
    IdentityContext
  );
  const { campaignRealms, campaignDetails, realms, companies } = state;

  const [formState, setFormState] = useState(campaignDetails);
  const [errMsg, setErrMsg] = useState({});
  const [addRealms, setAddRealms] = useState(campaignRealms);

  useEffect(() => {
    if ("uuid" in campaignDetails) setFormState(campaignDetails)
  }, [campaignDetails])

  useEffect(() => {
    if (campaignRealms.length > 0) setAddRealms(campaignRealms)
  }, [campaignRealms])

  const handlerChangeRealm = value => {
    setAddRealms(value)
    formState.realms = []
    value.forEach(element => {
      formState.realms.push(element.uuid)
    })
  }

  const SwitchAd = () => {
    return (
      <Switch
        color="default"
        checked={formState.active}
        onChange={e => setFormState({ ...formState, active: e.target.checked })}
      />
    );
  };

  const realmChanged = () => {
<<<<<<< HEAD
    // return campaignDetails.realms.length !== addRealms.length;
    return false;
  };
=======
    return campaignDetails.realms.length !== addRealms.length
  }
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSaveCampaignDetails(formState);
      }}
    >
<<<<<<< HEAD
      <Grid container spacing={5}>
        {console.log("formState", formState)}
        {console.log("re", campaignRealms)}

        <Grid item lg={6} xs={12} sm={12} xl={6}>
          <InputField
            label="Campaign name"
            id="campaign-name"
            fullWidth
            margin="normal"
            required
            value={formState.name}
            onChange={e => {
              setFormState({
                ...formState,
                name: e.target.value
              });
            }}
            error={errMsg.name ? true : false}
            helperText={errMsg.name ? errMsg.name : " "}
            onBlur={e => {
              if (e.target.value) {
                setErrMsg({
                  ...errMsg,
                  name: ""
                });
              } else {
                setErrMsg({
                  ...errMsg,
                  name: "A campaign name is required"
                });
              }
            }}
            onFocus={() => {
              setErrMsg({ ...errMsg, name: "" });
            }}
          />
        </Grid>
        <Grid item lg={6} xs={12} sm={12} xl={6}>
          <InputField
            label="UUID"
            id="UUID"
            fullWidth
            required
            margin="normal"
            value={formState.uuid}
            disabled
            InputProps={{
              endAdornment: <CopyUUID uuid={formState.uuid} />
            }}
          />
        </Grid>

        <Grid item lg={6} xs={12} sm={12} xl={6}>
          <InputField
            label="Company"
            data-cy="company"
            id="company"
            fullWidth
            required
            style={{ paddingTop: 22 }}
            select
            SelectProps={{
              IconComponent: () => <DropdownIcon />,
              ...MenuProps
            }}
            value={formState.company}
            error={errMsg.addCompany ? true : false}
            helperText={errMsg.addCompany ? errMsg.addCompany : " "}
            onChange={e => {
              setFormState({ ...formState, company: e.target.value });
              setErrMsg({ ...errMsg, addCompany: "" });
            }}
            onBlur={() => {
              if (formState.company) {
                setErrMsg({ ...errMsg, addCompany: "" });
              } else {
                setErrMsg({
                  ...errMsg,
                  addCompany: "A company is required"
                });
              }
            }}
            onFocus={() => {
              setErrMsg({ ...errMsg, addCompany: "" });
            }}
          >
            {companies.map(company => (
              <MenuItem key={company.uuid} value={company.uuid}>
                {company.name}
              </MenuItem>
            ))}
          </InputField>
        </Grid>

        <Grid item lg={6} xs={12} sm={12} xl={6}>
          <InputField
            label="Campaign Status"
            id="status"
            fullWidth
            required
            margin="normal"
            value={state.active ? "Active" : "Inactive"}
            InputProps={{
              endAdornment: <SwitchAd />
            }}
          />
        </Grid>

        <Grid item lg={6} xs={12} sm={12} xl={6}>
          <InputField
            label="Realms (optional)"
            fullWidth
            select
            margin="normal"
            SelectProps={{
              IconComponent: () => <DropdownIcon />,
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
                <Checkbox
                  color="primary"
                  checked={addRealms.indexOf(realm) > -1}
                />
                {realm.name}
              </MenuItem>
            ))}
          </InputField>
        </Grid>
=======
      {"uuid" in formState && (
        <div>
          <Grid container spacing={5}>
            <Grid item lg={6} xs={12} sm={12} xl={6}>
              <InputField
                label="Campaign name"
                id="campaign-name"
                fullWidth
                margin="normal"
                required
                value={formState.name}
                onChange={e => {
                  setFormState({
                    ...formState,
                    name: e.target.value
                  })
                }}
                error={errMsg.name ? true : false}
                helperText={errMsg.name ? errMsg.name : " "}
                onBlur={e => {
                  if (e.target.value) {
                    setErrMsg({
                      ...errMsg,
                      name: ""
                    })
                  } else {
                    setErrMsg({
                      ...errMsg,
                      name: "A campaign name is required"
                    })
                  }
                }}
                onFocus={() => {
                  setErrMsg({ ...errMsg, name: "" })
                }}
              />
            </Grid>
            <Grid item lg={6} xs={12} sm={12} xl={6}>
              <InputField
                label="UUID"
                id="UUID"
                fullWidth
                required
                margin="normal"
                value={formState.uuid}
                disabled
                InputProps={{
                  endAdornment: <CopyUUID uuid={formState.uuid} />
                }}
              />
            </Grid>

            <Grid item lg={6} xs={12} sm={12} xl={6}>
              <InputField
                label="Company"
                data-cy="company"
                id="company"
                fullWidth
                required
                style={{ paddingTop: 22 }}
                select
                SelectProps={{
                  IconComponent: () => <DropdownIcon />,
                  ...MenuProps
                }}
                value={formState.company}
                error={errMsg.addCompany ? true : false}
                helperText={errMsg.addCompany ? errMsg.addCompany : " "}
                onChange={e => {
                  setFormState({ ...formState, company: e.target.value })
                  setErrMsg({ ...errMsg, addCompany: "" })
                }}
                onBlur={() => {
                  if (formState.company) {
                    setErrMsg({ ...errMsg, addCompany: "" })
                  } else {
                    setErrMsg({
                      ...errMsg,
                      addCompany: "A company is required"
                    })
                  }
                }}
                onFocus={() => {
                  setErrMsg({ ...errMsg, addCompany: "" })
                }}
              >
                {companies.map(company => (
                  <MenuItem key={company.uuid} value={company.uuid}>
                    {company.name}
                  </MenuItem>
                ))}
              </InputField>
            </Grid>

            <Grid item lg={6} xs={12} sm={12} xl={6}>
              <InputField
                label="Campaign Status"
                id="status"
                fullWidth
                required
                margin="normal"
                value={state.active ? "Active" : "Inactive"}
                InputProps={{
                  endAdornment: <SwitchAd />
                }}
              />
            </Grid>

            <Grid item lg={6} xs={12} sm={12} xl={6}>
              <InputField
                label="Realms (optional)"
                fullWidth
                select
                margin="normal"
                SelectProps={{
                  IconComponent: () => <DropdownIcon />,
                  MenuProps,
                  multiple: true,
                  onChange: e => {
                    handlerChangeRealm(e.target.value)
                  },
                  value: addRealms,
                  renderValue: selected =>
                    selected.map(select => select.name).join(", ")
                }}
              >
                {realms.map(realm => (
                  <MenuItem key={realm.uuid} value={realm}>
                    <Checkbox
                      color="primary"
                      checked={addRealms.indexOf(realm) > -1}
                    />
                    {realm.name}
                  </MenuItem>
                ))}
              </InputField>
            </Grid>

            <Grid item lg={6} xs={12} sm={12} xl={6}>
              <Grid container>
                <Grid item lg={6} xs={12} sm={12} md={6}>
                  <Typography>Delete Campaign</Typography>
                </Grid>
                <Grid item lg={6} xs={12} sm={12} md={6}>
                  <CustomButton
                    handleClick={() => {
                      setOpenModal(true)
                      setFormState({ ...formState })
                    }}
                    style={{
                      width: "130px",
                      background: "#ff504d",
                      color: "white",
                      float: "right"
                    }}
                  >
                    <DeleteIcon fontSize="small" style={{ marginRight: 5 }} />{" "}
                    DELETE
                  </CustomButton>
                </Grid>
              </Grid>
            </Grid>

            <Grid item lg={6} xs={12} sm={12} xl={6}>
              <InputField
                label="Campaign Slug"
                fullWidth
                disabled
                margin="normal"
                value={formState.slug}
                onChange={e => {
                  setFormState({
                    ...formState,
                    slug: e.target.value
                  })
                }}
              />
            </Grid>
          </Grid>
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38

          <Grid container style={{ marginTop: 32 }}>
            <Grid item lg={6} xs={12} sm={12} xl={6}>
              <span className="form-required-label">*Required Fields</span>
            </Grid>
          </Grid>

          <Collapse
            in={
              (formState.name !== campaignDetails.name &&
                formState.name.length !== 0) ||
              formState.active !== campaignDetails.active ||
              !realmChanged() ||
              formState.company !== campaignDetails.company ||
              formState.slug !== campaignDetails.slug
            }
          >
            <div className="display-normal pt-normal">
              <SaveButton type="submit">
                {/* // disabled={formState.name.length == 0} */}
                SAVE
              </SaveButton>
              &emsp;
              <CustomButton
                handleClick={() => {
<<<<<<< HEAD
                  setOpenModal(true);
                  setFormState({ ...formState });
                }}
                style={{
                  width: "130px",
                  background: "#ff504d",
                  color: "white",
                  float: "right"
                }}
              >
                <DeleteIcon fontSize="small" style={{ marginRight: 5 }} />{" "}
                DELETE
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={6} xs={12} sm={12} xl={6}>
          <InputField
            label="Campaign Slug"
            fullWidth
            required
            margin="normal"
            value={formState.slug}
            onChange={e => {
              setFormState({
                ...formState,
                slug: e.target.value
              });
            }}
          />
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: 32 }}>
        <Grid item lg={6} xs={12} sm={12} xl={6}>
          <span className="form-required-label">*Required Fields</span>
        </Grid>
      </Grid>
      <Collapse
        in={
          (formState.name !== campaignDetails.name &&
            formState.name.length !== 0) ||
          formState.active !== campaignDetails.active ||
          realmChanged() ||
          formState.company !== campaignDetails.company ||
          formState.slug !== campaignDetails.slug
        }
      >
        <div className="display-normal pt-normal">
          <SaveButton type="submit">
            {/* // disabled={formState.name.length == 0} */}
            SAVE
          </SaveButton>
          &emsp;
          <CustomButton
            handleClick={() => {
              setFormState({ ...campaignDetails });
              setAddRealms(campaignRealms);
            }}
            style={{
              backgroundColor: "#eeeeee"
            }}
            textStyle={{
              color: "#444851"
            }}
          >
            CANCEL
          </CustomButton>
=======
                  setFormState({ ...campaignDetails })
                  setAddRealms(campaignRealms)
                }}
                style={{
                  backgroundColor: "#eeeeee"
                }}
                textStyle={{
                  color: "#444851"
                }}
              >
                CANCEL
              </CustomButton>
            </div>
          </Collapse>
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
        </div>
      )}
    </form>
  );
};

const CopyUUID = ({ uuid }) => {
  const [copy, setCopy] = useState(false);

  return (
    <InputAdornment position="end">
      <CopyToClipboard
        text={uuid}
        onCopy={() => setCopy(true)}
        onPointerLeave={() => setCopy(false)}
      >
        {copy ? (
          <LightTooltip title="UUID Copied!" placement="top">
            <CopyIcon
              fontSize="small"
              style={{ float: "right", cursor: "pointer" }}
            />
          </LightTooltip>
        ) : (
          <LightTooltip title="Copy UUID" placement="top">
            <CopyIcon
              fontSize="small"
              style={{ float: "right", cursor: "pointer" }}
            />
          </LightTooltip>
        )}
      </CopyToClipboard>
    </InputAdornment>
  );
};

export default EditForm;
