/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Switch,
  Typography,
  MenuItem,
  Checkbox,
  Divider,
  Button
} from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  Modal,
  InputField,
  SaveButton as CustomButton,
  LoadingModal,
  SuccessModal,
  DeleteModal
} from "common-components";
import { Avatar } from "./components";
import { DatePicker } from "../users-new/styles";
import { TextField } from "../components";
import defaultAvatar from "./avatar.svg";
import styled from "styled-components";
import { SetupPassword } from "./SetupPassword";
import { useStyles, theme, CustomText } from "./styles";
import SnackNotif from "auth/component/snackbar/snackbar";

//API UTIL
import { get, post, patch, remove, put } from "utils/api";
import { logout } from "auth/controllers/controller";
import { store } from "contexts/ManageComponent";

const SelectField = styled(InputField)`
  .MuiInputLabel-shrink {
    color: #bbb !important;
  }
`;

type EditProps = {
  open: boolean;
  setOpen: any;
  data: any;
  update: Function;
};

type Indexable = { [key: string]: any };
interface IState {
  uuid: any;
  first_name: any;
  last_name: any;
  username: any;
  email: any;
  team: any;
  company: any;
  campaigns: any;
  groups: any;
  is_active: any;
  password: {
    original: any;
    confirm: any;
  };
  hire_date: any;
}

function Edit({ open, setOpen, data, update }: EditProps) {
  const classes = useStyles();
  const { state } = useContext(store);
  const [user, setUser] = useState<IState>({
    uuid: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    team: "",
    company: "",
    campaigns: [],
    groups: [],
    is_active: "",
    password: {
      original: "",
      confirm: ""
    },
    hire_date: ""
  });

  const initialErrorState = {
    first_name_error: "",
    last_name_error: "",
    username_error: "",
    email_error: ""
  };
  const [loading, setLoading] = useState(false);
  const [setup, setSetup] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [teams, setTeams] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(initialErrorState);
  const [openDelete, setOpenDelete] = useState(false);
  const [companyDisabled, setCompanyDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  useEffect(() => {
    setUser({
      uuid: data.uuid,
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      email: data.email,
      team: data.team,
      company: data.company,
      campaigns: data.campaigns,
      groups: data.groups,
      is_active: data.is_active,
      password: {
        original: "",
        confirm: ""
      },
      hire_date: data.hire_date
    });
  }, [data]);
  useEffect(() => {
    const newRoles = state.roles.filter(
      (role: any) => role.pk !== 11 && role.pk !== 12
    );
    setTeams(state.teams);
    setCompanies(state.companies);
    setCampaigns(state.campaigns);
    setGroups(newRoles);
  }, [data]);

  //LOCAL STORAGE
  const ngStoragePpToken = localStorage.getItem("ngStorage-ppToken");
  const uuid = localStorage.getItem("uuid");
  const type = localStorage.getItem("type");
  const first_name = localStorage.getItem("user");

  //HANDLERS
  const handleActiveToggle = () => {
    setUser({ ...user, is_active: !user.is_active });
  };

  const hasContent = (str: any) => {
    return str.match(/(?=.{1,}$)/);
  };

  const handleInput = (type: any) => (label: any) => ({
    target: { value }
  }: any) => {
    if (!hasContent(value) && type !== "email") {
      if (hasContent((user as Indexable)[`${type}`])) {
        setError(
          Object.assign(error, { [`${type}_error`]: `${label} is required.` })
        );
      }
    } else if (type === "email") {
      if (hasContent(value)) {
        if (
          value.match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ) {
          setError(Object.assign(error, { [`${type}_error`]: "" }));
        } else {
          setError(
            Object.assign(error, { [`${type}_error`]: `Invalid Email` })
          );
        }
      }
      if (!hasContent(value)) {
        setError(Object.assign(error, { [`${type}_error`]: "" }));
      }
    } else {
      setError(Object.assign(error, { [`${type}_error`]: "" }));
    }

    setUser({ ...user, [type]: value });
  };

  const handleRoleSelection = ({ target: { value } }: any) => {
    setCompanyDisabled(false);
    value.map((role: any) => {
      if (role === 1 || role === 2 || role === 3) {
        setCompanyDisabled(true);
      }
    });
    setUser({ ...user, groups: value, team: "", company: "", campaigns: [] });
  };

  const handlePassword = (type: any, value: any) => {
    if (type === "original") {
      setUser({ ...user, password: { ...user.password, original: value } });
    } else {
      setUser({ ...user, password: { ...user.password, confirm: value } });
    }
  };

  const handleDelete = () => {
    setMessage(`One moment. We're removing user ${user.username}`);
    setLoading(true);
    remove(`/identity/user/manage/${user.uuid}`).then((res: any) => {
      setMessage(`You have deleted user ${user.username}`);
      setLoading(false);
      setSuccess(true);
      setOpenDelete(false);
    });
  };
  // END OF HANDLERS

  const impersonate = async (groups: any, token: any, type: any, user: any) => {
    if (!localStorage.getItem("is_impersonate")) {
      localStorage.setItem("is_impersonate", "true");
      localStorage.setItem("type/previous", type);
      localStorage.setItem("ngStorage-ppToken/previous", token);
      localStorage.setItem("user/previous", user);

      get(`/identity/user/manage/impersonate/${user.uuid}/`).then(
        ({ data }: any) => {
          localStorage.setItem("ngStorage-ppToken", data.auth_token);
          get(`/identity/user/manage/${user.uuid}`).then((res: any) => {
            localStorage.setItem("type", user.groups[0]);
            localStorage.setItem("user", user.first_name);
            if (res.data.groups.includes(10)) {
              window.location.href = "/manage/audio/pitch";
            } else {
              window.location.href = "/gateway";
            }
          });
        }
      );
    }
  };

  const verifyInput = (type: any) => {
    if (type === "update") {
      return (
        hasContent(user.first_name) &&
        hasContent(user.last_name) &&
        hasContent(user.username) &&
        !hasContent(error.first_name_error) &&
        !hasContent(error.last_name_error) &&
        !hasContent(error.username_error) &&
        !hasContent(error.email_error) &&
        user.groups.length > 0
      );
    }
  };

  const saveEdit = () => {
    const data = {
      groups: user.groups,
      company: user.company,
      campaigns: user.campaigns,
      team: user.team,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      is_active: user.is_active,
      email: user.email,
      hire_date: user.hire_date
    };
    if (verifyInput("update")) {
      setMessage("One moment. We’re updating the user...");
      setLoading(true);
      put(`/identity/user/manage/${user.uuid}/`, data)
        .then((res: any) => {
          setMessage(`You have updated user ${user.username}`);
          localStorage.setItem("user", res.data.first_name);
          setLoading(false);
          setSuccess(true);
        })
        .catch((err: any) => {
          setLoading(false);
          setOpenErrorMessage(true);
          if (err.response.data.groups) {
            return setErrorMessage(err.response.data.groups[0]);
          } else if (err.response.data.company) {
            return setErrorMessage(err.response.data.company[0]);
          } else if (err.response.data.username) {
            return setErrorMessage(err.response.data.username[0]);
          }
        });
    }
  };

  //CHECKERS
  const checkRoles = (obj: any) => {
    return user.groups.every((elem: any) => obj.indexOf(elem) > -1);
  };

  //RENDER
  const renderInput = () => (
    <React.Fragment>
      <Grid item xs>
        <TextField
          error={error.first_name_error}
          htmlFor="first_name"
          label="Firstname"
          name="First Name"
          value={user.first_name}
          onBlur={handleInput("first_name")("Firstname")}
          onChange={handleInput("first_name")("Firstname")}
          required={true}
        />
      </Grid>

      <Grid item xs>
        <TextField
          error={error.last_name_error}
          htmlFor="last_name"
          label="Lastname"
          name="Last Name"
          value={user.last_name}
          onBlur={handleInput("last_name")("Lastname")}
          onChange={handleInput("last_name")("Lastname")}
          required={true}
        />
      </Grid>

      <Grid item xs={12} style={{ marginTop: -11 }}>
        <TextField
          error={error.username_error}
          htmlFor="username"
          label="Username"
          name="Username"
          value={user.username}
          onBlur={handleInput("username")("Username")}
          onChange={handleInput("username")("Username")}
          required={true}
        />
      </Grid>

      <Grid item xs={12} style={{ marginTop: -4 }}>
        <TextField
          error={error.email_error}
          htmlFor="email"
          label="Email"
          name="Email"
          value={user.email}
          onBlur={handleInput("email")("Email")}
          onChange={handleInput("email")("Email")}
        />
      </Grid>
    </React.Fragment>
  );

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        width: 250
      }
    }
  };

  const teamSelectProps = {
    SelectProps: {
      MenuProps,
      IconComponent: () => <KeyboardArrowDown />,
      onChange: (e: any) => setUser({ ...user, team: e.target.value })
    }
  };

  const renderTeamSelector = () => (
    <Grid item xs={12}>
      <SelectField
        data-cy="select-3-5"
        style={{ marginTop: -12, width: 360 }}
        label="Team"
        select
        SelectProps={{ id: "team-select" }}
        {...teamSelectProps}
        margin="normal"
        value={user.team}
        disabled={localStorage.getItem("uuid") === user.uuid}
      >
        <MenuItem style={{ minHeight: "36px" }} key="none" value="">
          <CustomText>None</CustomText>
        </MenuItem>
        {teams.map((key: any) => {
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
    </Grid>
  );

  const companySelectProps = {
    SelectProps: {
      MenuProps,
      IconComponent: () => <KeyboardArrowDown />,
      onChange: (e: any) => setUser({ ...user, company: e.target.value })
    }
  };

  const renderCompanySelector = () => (
    <Grid item xs={12}>
      <SelectField
        id="company-select"
        data-cy="select-3-5"
        style={{ marginTop: 1, width: 360 }}
        label="Company"
        select
        {...companySelectProps}
        margin="normal"
        value={user.company}
        disabled={
          companyDisabled || uuid === user.uuid || checkRoles([1, 2, 3])
            ? true
            : false
        }
      >
        <MenuItem style={{ minHeight: "36px" }} key="none" value="">
          <CustomText>None</CustomText>
        </MenuItem>
        {companies.map((key: any) => {
          return (
            <MenuItem
              style={{ minHeight: "36px" }}
              key={key.uuid}
              value={key.uuid}
              data-cy="select-list"
            >
              <CustomText>{key.name}</CustomText>
            </MenuItem>
          );
        })}
      </SelectField>
    </Grid>
  );

  const campaignSelectProps = {
    SelectProps: {
      MenuProps,
      IconComponent: () => <KeyboardArrowDown />,
      multiple: true,
      onChange: (e: any) => setUser({ ...user, campaigns: e.target.value }),
      value: user.campaigns,
      renderValue: (selected: any) => {
        let output = selected
          .map((select: any) => {
            return campaigns
              .filter((rls: any) => {
                return rls.uuid === select;
              })
              .map((data: any) => data.name);
          })
          .join(", ");
        return output;
      }
    }
  };

  const renderCampaignSelector = () => (
    <Grid item xs={12}>
      <SelectField
        id="campaign-select"
        data-cy="campaign"
        style={{ marginTop: 1, width: 360 }}
        label="Campaigns"
        select
        {...campaignSelectProps}
        margin="normal"
        disabled={
          companyDisabled || uuid === user.uuid || checkRoles([1, 2, 3])
            ? true
            : false
        }
      >
        {user.company
          ? campaigns
              .filter((c: any) => c.company === user.company)
              .map((key: any, i: number) => {
                return (
                  <MenuItem key={i} value={key.uuid} data-cy="campaign-list">
                    <Checkbox
                      color="primary"
                      checked={
                        user.campaigns.findIndex(
                          (camp: any) => camp === key.uuid
                        ) > -1
                      }
                    />
                    <CustomText>{key.name}</CustomText>
                  </MenuItem>
                );
              })
          : campaigns.map((key: any, i: number) => {
              return (
                <MenuItem key={i} value={key.uuid} data-cy="campaign-list">
                  <Checkbox
                    color="primary"
                    checked={
                      user.campaigns.findIndex(
                        (camp: any) => camp === key.uuid
                      ) > -1
                    }
                  />
                  <CustomText>{key.name}</CustomText>
                </MenuItem>
              );
            })}
        {user.company
          ? campaigns.filter((c: any) => c.company === user.company).length ===
              0 && (
              <p style={{ paddingLeft: 15 }}>
                No campaigns for the selected company
              </p>
            )
          : null}
      </SelectField>
    </Grid>
  );

  const customProp = {
    error: user.groups.length <= 0,
    helperText: user.groups.length <= 0 ? "A role is required." : ""
  };

  const roleSelectProps = {
    SelectProps: {
      MenuProps,
      IconComponent: () => <KeyboardArrowDown />,
      multiple: true,
      onChange: handleRoleSelection,
      value: user.groups,
      renderValue: (selected: any) =>
        selected
          .map((select: any) => {
            return groups
              .filter((rls: any) => rls.pk === select)
              .map((data: any) => data.name);
          })
          .join(", ")
    }
  };

  const renderRoleSelector = () => (
    <Grid item xs={12}>
      <SelectField
        data-cy="roles"
        style={{ marginTop: 1, width: 360 }}
        label="Role"
        select={true}
        margin="normal"
        {...customProp}
        {...roleSelectProps}
        disabled={uuid === user.uuid}
      >
        {groups.map((key: any, i: number) => {
          return (
            <MenuItem key={i} value={key.pk} data-cy="roles-list">
              <Checkbox
                color="primary"
                checked={
                  user.groups.findIndex((uuid: any) => uuid === key.pk) > -1
                }
              />
              <CustomText>{key.name}</CustomText>
            </MenuItem>
          );
        })}
      </SelectField>
    </Grid>
  );

  const renderLoading = () => {
    return (
      <LoadingModal
        open={loading}
        text={message}
        cancelFn={() => setLoading(false)}
      />
    );
  };

  const updateData = () => {
    setOpen(false);
    setSuccess(false);
    update(user);
  };

  const renderSuccess = () => {
    return (
      <SuccessModal
        open={success}
        text={message}
        closeFn={() => updateData()}
      />
    );
  };

  const renderDelete = () => (
    <DeleteModal
      open={openDelete}
      header="Delete user"
      msg="user"
      name={user.username}
      closeFn={() => setOpenDelete(false)}
      delFn={() => handleDelete()}
    />
  );

  const setupPassword = () => {
    const changePassword = {
      new_password: user.password.original,
      re_new_password: user.password.confirm
    };
    setMessage("One moment. We’re updating the user...");
    setLoading(true);
    post(
      `/identity/user/manage/set_password/${user.uuid}/`,
      changePassword
    ).then((res: any) => {
      if (user.uuid === localStorage.getItem("uuid")) {
        return logout();
      }
      setMessage(`You have updated user ${user.username}'s password.`);
      setLoading(false);
      setSuccess(true);
      setSetup(false);
      user.password.original = "";
      user.password.confirm = "";
    });
  };

  const renderSetup = () => (
    <SetupPassword
      open={setup}
      setOpen={setSetup}
      password={user.password}
      handlePassword={handlePassword}
      handleSave={() => setupPassword()}
      setSave={
        user.password.original.length !== 0 &&
        user.password.original === user.password.confirm
          ? false
          : true
      }
    />
  );

  const renderEdit = () => (
    <ThemeProvider theme={theme}>
      <Grid
        container
        style={{
          marginTop: 7,
          marginLeft: 5
        }}
        spacing={1}
      >
        <SnackNotif
          snackbar={openErrorMessage}
          handleClose={() => setOpenErrorMessage(false)}
          message={errorMessage}
        />
        <Grid item xs={12}>
          <Grid container alignItems="center">
            <Grid item>
              <Avatar image={defaultAvatar} />
            </Grid>

            <Grid item xs>
              <div className={classes.toggleContainer}>
                <Typography className={classes.activeText}>Active:</Typography>
                <Switch
                  color="primary"
                  onChange={() => handleActiveToggle()}
                  checked={user.is_active}
                />
              </div>
            </Grid>

            <Grid item xs>
              <Button
                className={classes.impersonateBtn}
                classes={{ root: classes.impersonateBtnRoot }}
                onClick={() =>
                  impersonate(groups, ngStoragePpToken, type, first_name)
                }
                disabled={localStorage.getItem("uuid") === user.uuid}
              >
                Impersonate
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid>
          <Grid container style={{ marginTop: 13 }} direction="row">
            <Typography
              className={classes.activeText}
              style={{ marginRight: 9, fontWeight: 600 }}
            >
              UUID:
            </Typography>
            <Typography className={classes.uuidText}>{user.uuid}</Typography>
          </Grid>
        </Grid>

        <Grid container style={{ marginTop: 15, marginRight: 18 }} spacing={1}>
          {/* RENDERS */}
          {renderInput()}
          {renderTeamSelector()}
          {renderCompanySelector()}
          {renderCampaignSelector()}
          {renderRoleSelector()}

          <Grid container style={{ marginTop: 15 }} alignItems="center">
            <Grid item xs>
              <Typography className={classes.fadedLabel}>Password</Typography>
            </Grid>

            <Grid
              item
              xs
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end"
              }}
            >
              <button
                onClick={() => setSetup(true)}
                className={classes.changePasswordStyle}
              >
                <Typography className={classes.changePasswordTextStyle}>
                  Change password
                </Typography>
              </button>
            </Grid>
          </Grid>

          <Divider className={classes.dividerStyle} />

          <Grid container style={{ marginTop: 19 }} alignItems="center">
            <Grid item xs>
              <Typography className={classes.fadedLabel}>
                Delete user
              </Typography>
            </Grid>

            <Grid
              item
              xs
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end"
              }}
            >
              <button className={classes.deleteUserStyle}>
                <Typography
                  className={classes.changePasswordTextStyle}
                  onClick={e => setOpenDelete(true)}
                >
                  <strong>Delete</strong>
                </Typography>
              </button>
            </Grid>
          </Grid>

          <Divider className={classes.dividerStyle} />
        </Grid>

        <Grid container spacing={1} style={{ marginTop: 29 }}>
          <Grid item xs style={{ marginLeft: -8 }}>
            <CustomButton
              style={{
                width: 165,
                height: 40,
                borderRadius: 3,
                backgroundColor: "#eee"
              }}
              disabled={false}
              handleClick={() => setOpen(false)}
            >
              <Typography className={classes.cancelText}>CANCEL</Typography>
            </CustomButton>
          </Grid>
          <Grid item xs>
            <CustomButton
              style={{ marginLeft: 10 }}
              disabled={false}
              handleClick={() => saveEdit()}
            >
              SAVE
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );

  if (loading) {
    return renderLoading();
  } else if (success) {
    return renderSuccess();
  } else if (openDelete) {
    return renderDelete();
  } else {
    return setup ? (
      <Modal open={setup} onClose={() => setSetup(false)} title="Edit password">
        {renderSetup()}
      </Modal>
    ) : (
      <Modal
        open={open && !loading && !success}
        onClose={() => setOpen(false)}
        title="Edit user"
      >
        {renderEdit()}
      </Modal>
    );
  }
}

export { Edit };
