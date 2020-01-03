import React from "react";
import { Paper } from "@material-ui/core";
import { TableNoResult, SaveButton, TableLoader } from "common-components";
import { Add } from "@material-ui/icons";

export default function CampaignTable({ data, loading }) {
  return (
    <Paper>
      {!data.length > 0 && !loading ? (
        renderNoData()
      ) : loading ? (
        <TableLoader />
      ) : (
        <div>asdfsaf</div>
      )}
    </Paper>
  );
}

function renderNoData() {
  return (
    <TableNoResult
      headerText="Campagaigns"
      mainMessage="No campaigns have been created"
      subMessage="Would you like to creat one? Just hit the “New Campaign button."
      renderButton={
        <SaveButton>
          {" "}
          <Add /> New Campaign
        </SaveButton>
      }
    />
  );
}
