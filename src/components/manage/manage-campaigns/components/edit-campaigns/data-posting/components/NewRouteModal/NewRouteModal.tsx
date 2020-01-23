/*eslint-disable */
import React, { useState } from "react";
import { MenuItem, Checkbox } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import styled from "styled-components";
import {
  CustomButton,
  Modal,
  InputField,
  SuccessModal,
  LoadingModal
} from "common-components";
import { materialTheme } from "../../styles/NewRouteModal.style";

const CustomInputField = styled(InputField)`
  padding-bottom: 15;
`;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 250
    }
  }
};
const defaultState = {
  routeName: "",
  routeNameError: false,
  routeNameErrorMessage: "Invalid route name",

  routeDistType: 0,
  routeDistTypeValid: false,
  routeDistTypeError: false,

  routeUUID: null,
  routeUUIDValid: false,
  routeUUIDError: false,

  routeCode: [500],
  routeCodeValid: false,
  routeCodeError: false,

  creationSuccess: false,
  creationError: false,
  errorMessage: ""
};

export default function NewRoute({ open, openFn, onClose, handleCreate }: any) {
  const [routeDetails, setRouteDetails] = useState<any>({ ...defaultState });
  const [add, setAdd] = useState<any>({
    creating: false,
    created: false
  });

  const formSubmit = () => {
    const id = Math.floor(Math.random() * 100);
    const uuid = "7ae9eb7e-34a4-4d67-9eeb-7753506b0aa" + id;
    handleCreate({
      id: "" + id,
      name: routeDetails.routeName,
      uuid: uuid,
      slug: routeDetails.routeName.replace(" ", "-"),
      company: "company",
      campaign: "campaign",
      active: false,
      route_continue: "500",
      distribution_type: 1,
      upload_url:
        routeDetails.routeUrl ||
        `https://api.perfectpitchtech.com/prospect/upload/hope/slug${id}/uuid${id}/`
    });
  };
  function validateUUID(uuid: any) {
    return /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(
      uuid
    );
  }

  return (
    <div>
      <ThemeProvider theme={materialTheme}>
        <Modal open={open} title={<b>Add New Route</b>} onClose={onClose}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
              setAdd({
                ...add,
                creating: true
              });
              setTimeout(() => {
                formSubmit();
                setAdd({
                  ...add,
                  creating: false,
                  created: true
                });
              }, 1000);
            }}
          >
            <CustomInputField
              value={routeDetails.routeName}
              label="Route name"
              onChange={(e: any) => {
                if (e.target.value.length > 0) {
                  setRouteDetails({
                    ...routeDetails,
                    routeName: e.target.value,
                    routeNameError: false
                  });
                } else {
                  setRouteDetails({
                    ...routeDetails,
                    routeNameError: true,
                    routeName: e.target.value
                  });
                }
              }}
              onBlur={(e: any) => {
                if (e.target.value.length === 0) {
                  setRouteDetails({ ...routeDetails, routeNameError: true });
                }
              }}
              InputProps={{
                onFocus: () => {
                  setRouteDetails({ ...routeDetails, routeNameError: false });
                }
              }}
              fullWidth
              error={routeDetails.routeNameError}
              helperText={
                routeDetails.routeNameError
                  ? routeDetails.routeNameErrorMessage
                  : " "
              }
            />
            <CustomInputField
              value={routeDetails.routeDistType}
              label="Route Distribution type"
              fullWidth
              margin="normal"
              select
              onChange={(e: any) => {
                setRouteDetails({
                  ...routeDetails,
                  routeDistType: e.target.value
                });
              }}
              onBlur={() => {
                if (routeDetails.routeDistType == null) {
                  setRouteDetails({
                    ...routeDetails,
                    routeDistTypeError: true
                  });
                }
              }}
              InputProps={{
                onFocus: () => {
                  setRouteDetails({
                    ...routeDetails,
                    routeDistTypeError: false
                  });
                }
              }}
              error={routeDetails.routeDistTypeError}
              helperText={
                routeDetails.routeDistTypeError
                  ? "Invalid route distribution type"
                  : " "
              }
            >
              <MenuItem value={0}>Round Robin (Most common)</MenuItem>
              <MenuItem value={1}>Broadcast</MenuItem>
            </CustomInputField>

            <CustomInputField
              value={
                routeDetails.routeUUID === null ? "" : routeDetails.routeUUID
              }
              label={
                <span>
                  Route UUID <small>(optional)</small>
                </span>
              }
              fullWidth
              margin="normal"
              onChange={(e: any) => {
                if (e.target.value.length > 0) {
                  if (!validateUUID(e.target.value)) {
                    setRouteDetails({
                      ...routeDetails,
                      routeUUID: e.target.value,
                      routeUUIDError: true
                    });
                  } else {
                    setRouteDetails({
                      ...routeDetails,
                      routeUUID: e.target.value,
                      routeUUIDError: false
                    });
                  }
                } else {
                  setRouteDetails({
                    ...routeDetails,
                    routeUUID: e.target.value,
                    routeUUIDError: false
                  });
                }
              }}
              InputProps={{
                onFocus: () => {
                  setRouteDetails({ ...routeDetails, routeUUIDError: false });
                }
              }}
              error={routeDetails.routeUUIDError}
              helperText={
                routeDetails.routeUUIDError
                  ? `"${routeDetails.routeUUID}" is not a valid UUID`
                  : " "
              }
            />

            <CustomInputField
              value={routeDetails.routeCode}
              label="Route Code"
              fullWidth
              margin="normal"
              select
              InputProps={{
                inputProps: {
                  MenuProps,
                  multiple: true,
                  onChange: (e: any) => {
                    setRouteDetails({
                      ...routeDetails,
                      routeCode: [...e.target.value]
                    });
                  },
                  value: routeDetails.routeCode,
                  renderValue: (selected: any) =>
                    selected.map((item: any) => item).join(", ")
                }
              }}
              error={routeDetails.routeCodeError}
              helperText={
                routeDetails.routeCodeError ? "Invalid route code" : " "
              }
            >
              {[
                { id: 500, code: 500 },
                { id: 101, code: 101 },
                { id: 102, code: 102 }
              ].map((item: any) => (
                <MenuItem key={item.id} value={item.code}>
                  <Checkbox
                    color="primary"
                    checked={routeDetails.routeCode.indexOf(item.code) > -1}
                  />
                  {item.code}
                </MenuItem>
              ))}
            </CustomInputField>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <CustomButton
                type="button"
                handleClick={() => {}}
                style={{ backgroundColor: "#eee" }}
                textStyle={{
                  color: "#444"
                }}
              >
                CANCEL
              </CustomButton>
              <CustomButton
                type="submit"
                disabled={
                  routeDetails.routeNameError ||
                  routeDetails.routeName.length === 0 ||
                  routeDetails.routeUUIDError
                }
                handleClick={() => {}}
              >
                CREATE
              </CustomButton>
            </div>
          </form>
        </Modal>
        <SuccessModal
          open={add.created}
          text={`You have created "${routeDetails.routeName} successfully"`}
          closeFn={() => {
            setAdd({ ...add, created: false });
            setRouteDetails({ ...defaultState });
          }}
          btnFn={() => {
            openFn();
            setAdd({
              ...add,
              created: false
            });
            setRouteDetails({ ...defaultState });
          }}
          btnText={`CREATE ANOTHER`}
        />
        <LoadingModal
          open={add.creating}
          text={`One moment, We're creating the route`}
          cancelFn={() => {
            setRouteDetails({ ...routeDetails });
          }}
        />
      </ThemeProvider>
    </div>
  );
}
