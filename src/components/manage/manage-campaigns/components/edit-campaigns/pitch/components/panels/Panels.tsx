import React, { useContext } from "react";
import { TableNoResult, SaveButton, TableLoader } from "common-components";
import { Add } from "@material-ui/icons";
import { IdentityContext } from "contexts/IdentityProvider";
export default function Panels() {
  const { state } = useContext(IdentityContext);

  return (
    <div className="c-default">
      {state.panels.length > 0 ? (
        <React.Fragment>
          {state.loading ? <TableLoader /> : "Panels"}
        </React.Fragment>
      ) : (
        <NoResult />
      )}
    </div>
  );
}

const NoResult = () => {
  const { dispatch } = useContext(IdentityContext);

  return (
    <TableNoResult
      headerText="Pitch panels"
      mainMessage="No pitch panels have been created"
      subMessage="Would you like to create one? Just hit the “New Panel button."
      renderButton={
        <SaveButton
          onClick={(e: any) => {
            e.preventDefault();
            dispatch({
              type: "CREATE_PANEL",
              payload: { panel: [{ name: "xasdas" }] }
            });
          }}
        >
          <Add />
          New Panel
        </SaveButton>
      }
    />
  );
};