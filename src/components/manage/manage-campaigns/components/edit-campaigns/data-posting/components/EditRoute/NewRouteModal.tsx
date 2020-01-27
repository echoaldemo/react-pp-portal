import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import styled from "styled-components";
import {
  CustomButton,
  InputField,
  Modal,
  SuccessModal,
  LoadingModal
} from "common-components";
import { materialTheme } from "../../styles/NewRouteModal.style";
const CustomGrid = styled(Grid)`
  padding-bottom: 30px;
`;

const validateURL = (url: string) => {
  const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/; // eslint-disable-line

  return pattern.test(url);
};
interface Props {
  onClose: () => void;
  openFn: () => void;
  handleAddNewRoute: (data: any) => void;
  open: boolean;
}
interface Obj {
  [index: string]: any;
}

const NewRoute = ({ onClose, open, openFn, handleAddNewRoute }: Props) => {
  const defaultState = {
    routeName: "",
    routeNameError: false,

    routeUrl: "",
    routeUrlError: false,

    routeWeight: 1,
    routeWeightError: false
  };

  const [routeDetails, setRouteDetails] = useState<any>({ ...defaultState });
  const [add, setAdd] = useState<Obj>({
    creating: false,
    created: false
  });

  const formSubmit = (e: any) => {
    e.preventDefault();
    onClose();
    setAdd({
      ...add,
      creating: true
    });
    const id = Math.floor(Math.random() * 100);
    const uuid = "7ae9eb7e-34a4-4d67-9eeb-7753576b0aa" + id;
    setTimeout(() => {
      handleAddNewRoute({
        id: "" + id,
        name: routeDetails.routeName,
        uuid: uuid,
        slug: routeDetails.routeName.replace(" ", "-"),
        company: "company",
        campaign: "campaign",
        active: false,
        route_continue: routeDetails.routeWeight.toString() || "500",
        distribution_type: 1,
        upload_url:
          routeDetails.routeUrl ||
          `https://api.perfectpitchtech.com/prospect/upload/hope/slug${id}/uuid${id}/`
      });
      setAdd({
        ...add,
        creating: false,
        created: true
      });
    }, 1000);
  };

  return (
    <div>
      <Modal open={open} title={<b>Add New Route</b>} onClose={onClose}>
        <form
          onSubmit={(e: any) => {
            formSubmit(e);
          }}
        >
          <ThemeProvider theme={materialTheme}>
            <Grid container>
              <CustomGrid item xs={12} lg={12} md={12}>
                <InputField
                  required
                  label="Route name"
                  fullWidth
                  onChange={(e: any) => {
                    setRouteDetails({
                      ...routeDetails,
                      routeName: e.target.value
                    });
                  }}
                />
              </CustomGrid>
              <CustomGrid item xs={12} lg={12} md={12}>
                <InputField
                  required
                  label="Route URL"
                  fullWidth
                  onChange={(e: any) => {
                    if (e.target.value.length > 0) {
                      if (validateURL(e.target.value)) {
                        setRouteDetails({
                          ...routeDetails,
                          routeUrl: e.target.value,
                          routeUrlError: false
                        });
                      } else {
                        setRouteDetails({
                          ...routeDetails,
                          routeUrl: e.target.value,
                          routeUrlError: true
                        });
                      }
                    } else {
                      setRouteDetails({
                        ...routeDetails,
                        routeUrl: e.target.value,
                        routeUrlError: false
                      });
                    }
                  }}
                  error={routeDetails.routeUrlError}
                  helperText={routeDetails.routeUrlError ? "Invalid URL" : " "}
                />
              </CustomGrid>
              <CustomGrid item xs={12} lg={12} md={12}>
                <InputField
                  label="Route Weight (optional)"
                  fullWidth
                  InputProps={{
                    type: "number"
                  }}
                  onChange={(e: any) => {
                    setRouteDetails({
                      ...routeDetails,
                      routeWeight: e.target.value
                    });
                  }}
                />
              </CustomGrid>
            </Grid>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <CustomButton
                style={{ backgroundColor: "#eee" }}
                handleClick={() => {
                  onClose();
                }}
              >
                <span style={{ color: "#777" }}>Cancel</span>
              </CustomButton>
              <CustomButton
                type="submit"
                disabled={
                  routeDetails.routeUrlError ||
                  routeDetails.routeUrl.length === 0 ||
                  routeDetails.routeName.length === 0
                }
                handleClick={() => { }}
              >
                Save
              </CustomButton>
            </div>
          </ThemeProvider>
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
    </div>
  );
};

export default NewRoute;
