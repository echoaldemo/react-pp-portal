import React, { useState, useContext } from "react";
import SEO from "utils/seo";
import "./style/style.css";
import {
  HeaderLink,
  HeaderButton,
  TableNoResult,
  SaveButton,
  TableLoader
} from "common-components";
import { Paper, Divider } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import SearchBar from "components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/logs-filter/components/SearchBar";
import StationsTable from "./StationsTable";

function Stations(props: any) {
  const [states, setState] = useState({
    loading: false,
    open: false,
    stations: []
  });
  return (
    <div>
      <SEO title="Stations" />
      <div className="header-container">
        <HeaderLink menu={[]} title="Stations" />
        <div style={{ display: "flex" }}>
          <HeaderButton
            openFunction={() => null}
            buttonText="New Station"
            style={{ marginRight: 24 }}
          />
        </div>
      </div>
      <Paper style={{ height: "auto" }}>
        <div className="header-container">
          <div style={{ width: "100%" }}>
            <SearchBar
              title="Station"
              userData={states.stations}
              headers={["name", "uuid"]}
              active={true}
              link={true}
              loading={states.loading}
            />
            <Divider />
            {states.loading ? (
              <TableLoader />
            ) : (
              <StationsTable
                headers={["UUID", "SLUG", "STATUS", ""]}
                history={props.history}
                state={states}
              />
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Stations;
