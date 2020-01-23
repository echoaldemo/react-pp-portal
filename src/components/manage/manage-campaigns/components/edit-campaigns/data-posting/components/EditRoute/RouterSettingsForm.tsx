import React, { useState } from "react";
import {
  Grid,
  MenuItem,
  Checkbox,
  Collapse,
  InputAdornment,
  IconButton,
  Switch,
  Button,
  Snackbar
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import styled from "styled-components";
import ContinueCodes from "./ContinueCodes.json";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { GoTrashcan } from "react-icons/go";
import {
  LoadingModal,
  DeleteModal,
  InputField,
  CustomButton
} from "common-components";
import { materialTheme } from "../../styles/NewRouteModal.style";
const CustomGrid = styled(Grid)`
  padding-top: 10px;
`;
const CustomLabel = styled.span`
  font-weight: 600;
  font-size: 16px !important;
`;
const CustomInputField = styled(InputField)`
  width: 95%;
  .MuiInputBase-input {
    font-size: 18px;
    color: #444851;
  }
  .MuiInputLabel-shrink {
    color: #bbb !important;
  }
  .Mui-focused {
    color: #1194f6 !important;
  }
  .Mui-disabled {
    color: #bbb !important;
  }
  .MuiFormLabel-root.Mui-error {
    color: #f44336 !important;
  }
`;
const CustomIconButton = styled(IconButton)`
  :hover {
    background: transparent;
  }
`;

const CustomSwitch = styled(Switch)`
  .MuiSwitch-switchBase {
    color: #1194f6;
  }
  .MuiSwitch-track {
    background-color: #ccc;
  }
`;

interface Props {
  RouterDetails: Obj;
  history: any;
  style: Obj;
  slug: string;
  uuid: string;
}
interface Obj {
  [index: string]: any;
}

const RouterSettingsForm = ({
  RouterDetails,
  history,
  style,
  slug,
  uuid
}: Props) => {
  const routerDefault: Obj = {
    routeName: RouterDetails.name,
    routeNameError: false,
    routeNameErrorMessage: "Invalid route name",

    routeDistType: 0,
    routeDistTypeValid: false,
    routeDistTypeError: false,

    routeUUID: null,
    routeUUIDValid: false,
    routeUUIDError: false,

    routeCode: RouterDetails.route_continue.split(",").map((item: string) => {
      return parseInt(item);
    }),
    routeCodeValid: false,
    routeCodeError: false,

    routeActive: RouterDetails.active
  };

  const [routerState, setRouterState] = useState<Obj>({ ...routerDefault });
  const [showButton, setShowButton] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [openSnackBar, setopenSnackBar] = useState<boolean>(false);
  const [snackBarMessage] = useState<string>("");

  const deleteRouter = () => {
    setOpenDeleteModal(false);
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      setShowButton(false);
      history.push(`/manage/campaign/edit/${slug}/${uuid}/dataposting`);
    }, 1000);
  };
  const updateRoute = () => {
    setLoadingState(true);
    setTimeout(() => {
      setRouterState({ ...routerState });
      setLoadingState(false);
      setShowButton(false);
    }, 2000);
  };

  return (
    <div style={{ ...style }}>
      <LoadingModal
        open={loadingState}
        text={"One moment. We're updating the routes"}
        cancelFn={() => {
          setLoadingState(false);
        }}
      />
      <LoadingModal
        open={deleting}
        text={"One moment. We're deleting the route"}
        cancelFn={() => {
          setDeleting(false);
        }}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateRoute();
        }}
      >
        <ThemeProvider theme={materialTheme}>
          <Grid container style={{ paddingBottom: 30, paddingTop: 15 }}>
            <CustomGrid item lg={6} md={6} xs={12}>
              <CustomInputField
                label={<CustomLabel>Router name</CustomLabel>}
                required
                InputProps={{
                  autoComplete: "off"
                }}
                name="routeName"
                value={routerState.routeName}
                onChange={(e: any) => {
                  if (e.target.value.length > 0) {
                    setRouterState({
                      ...routerState,
                      routeName: e.target.value,
                      routeNameError: false
                    });
                    if (e.target.value === RouterDetails.name) {
                      setShowButton(false);
                    } else {
                      setShowButton(true);
                    }
                  } else {
                    setShowButton(false);
                    setRouterState({
                      ...routerState,
                      routeNameError: true,
                      routeName: e.target.value
                    });
                  }
                }}
                error={routerState.routeNameError}
                helperText={
                  routerState.routeNameError ? (
                    <span style={{ color: "#f44336" }}>Invalid route name</span>
                  ) : (
                    " "
                  )
                }
              />
            </CustomGrid>
            <CustomGrid item lg={6} md={6} xs={12}>
              <CustomInputField
                label={<CustomLabel>Router UUID</CustomLabel>}
                required
                value={RouterDetails.uuid}
                disabled
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{ width: 150, color: "#444" }}
                    >
                      <CustomIconButton
                        onClick={() => alert("Copy")}
                        disableRipple={true}
                        disableFocusRipple={true}
                      >
                        <FileCopyOutlinedIcon
                          style={{ fontSize: 18, color: "#444" }}
                        />
                      </CustomIconButton>
                      <span style={{ fontSize: 14 }}>Copy text</span>
                    </InputAdornment>
                  )
                }}
              />
            </CustomGrid>
            <CustomGrid item lg={6} md={6} xs={12}>
              <CustomInputField
                label={
                  <CustomLabel>Route continue codes (optional)</CustomLabel>
                }
                margin="normal"
                select
                SelectProps={{
                  multiple: true,
                  onChange: (e: any) => {
                    setRouterState({
                      ...routerState,
                      routeCode: [...e.target.value]
                    });
                    setShowButton(true);
                  },
                  value: routerState.routeCode,
                  renderValue: (selected: any) =>
                    selected.map((item: any) => item).join(", ")
                }}
                error={routerState.routeCodeError}
                helperText={
                  routerState.routeCodeError ? "Invalid route code" : " "
                }
              >
                {ContinueCodes.map((item: Obj) => (
                  <MenuItem key={item.id} value={item.code}>
                    <Checkbox
                      color="primary"
                      checked={routerState.routeCode.indexOf(item.code) > -1}
                    />
                    {item.code}
                  </MenuItem>
                ))}
              </CustomInputField>
            </CustomGrid>
            <CustomGrid item lg={6} md={6} xs={12} style={{ marginTop: 15 }}>
              <CustomInputField
                label={<CustomLabel>Router status</CustomLabel>}
                required
                value={routerState.routeActive ? "Active" : "Inactive"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CustomSwitch
                        checked={routerState.routeActive}
                        onChange={(e) => {
                          setRouterState({
                            ...routerState,
                            routeActive: e.target.checked
                          });
                          setShowButton(true);
                        }}
                        value={routerState.routeActive}
                        color="default"
                      />
                    </InputAdornment>
                  )
                }}
              />
            </CustomGrid>
            <CustomGrid item lg={6} md={6} xs={12}>
              <CustomInputField
                label={<CustomLabel>Slug</CustomLabel>}
                value={RouterDetails.slug}
                disabled
              />
            </CustomGrid>
            <CustomGrid
              item
              lg={6}
              md={6}
              xs={12}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <span style={{ fontWeight: 600, color: "#bbb", fontSize: 13 }}>
                  Delete Router
                </span>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ backgroundColor: "#ff504d" }}
                  onClick={() => {
                    setOpenDeleteModal(true);
                  }}
                >
                  <GoTrashcan style={{ fontSize: 18 }} />
                  &nbsp;
                  <span
                    style={{
                      fontWeight: 600,
                      color: "#fff",
                      fontSize: 13,
                      textTransform: "none"
                    }}
                  >
                    Delete
                  </span>
                </Button>
              </div>
            </CustomGrid>
          </Grid>
        </ThemeProvider>
        <Collapse in={showButton} timeout={1000}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%"
            }}
          >
            <CustomButton type="input" handleClick={() => {}}>
              Save
            </CustomButton>
            &emsp;
            <CustomButton
              style={{ background: "#eee" }}
              textStyle={{ color: "#444" }}
              handleClick={() => {
                setRouterState({ ...routerDefault });
                setShowButton(false);
              }}
            >
              Cancel
            </CustomButton>
          </div>
        </Collapse>
      </form>
      <DeleteModal
        open={openDeleteModal}
        header="Delete Route"
        msg="route"
        name={RouterDetails.name}
        closeFn={() => {
          setOpenDeleteModal(false);
        }}
        delFn={() => {
          deleteRouter();
        }}
      />
      <Snackbar
        open={openSnackBar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        autoHideDuration={3000}
        onClose={() => {
          setopenSnackBar(false);
        }}
        message={snackBarMessage}
      />
    </div>
  );
};

export default RouterSettingsForm;
