/* eslint-disable */
import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { PeopleAlt, Person } from "@material-ui/icons";
import { CustomText, CustomButton } from "common-components";
import PersonaInfo from "./PersonaInfo";
// import Context from "../../provider/Context";

const Impersonate = props => {
  const [personaModal, setPersonaModal] = useState(false);
  let { person, stopImpersonating } = props;

  function closeModal() {
    setPersonaModal(false);
  }

  return (
    <>
      {/* <Context.Consumer>
        {value => {
          return (
            <>
              <PersonaInfo
                data={value}
                person={person}
                open={personaModal}
                onClose={closeModal}
              />
            </>
          );
        }}
      </Context.Consumer> */}

      <div
        style={{
          position: "fixed",
          width: "100vw",
          height: "40px !important",
          backgroundColor: "var(--error)",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Grid
          style={{
            padding: "0 0.5rem 0 1rem",
            backgroundColor: "#FF504D",
            color: "#FFFFFF"
          }}
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <CustomText color="light" size="1.2rem">
              Impersonation
            </CustomText>
          </Grid>

          <Grid item>
            <Button
              onClick={() => setPersonaModal(true)}
              style={{
                borderRadius: "0",
                backgroundColor: "white",
                marginLeft: "-10rem",
                width: "200px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <PeopleAlt
                style={{ marginRight: "10px", color: "var(--gray)" }}
              />
              <div style={{ flex: 1 }}>
                <CustomText>{person.username}</CustomText>
              </div>
            </Button>
          </Grid>

          <Grid item>
            <Button
              style={{
                borderRadius: "0",
                color: "#ffffff",
                backgroundColor: "#a90000"
              }}
              onClick={() => stopImpersonating()}
            >
              <CustomText>STOP</CustomText>
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Impersonate;
