import React from "react";
import { storiesOf } from "@storybook/react";
import { CustomCard, CardHeader } from "common-components";
import { Grid } from "@material-ui/core";
import notes from "./notes.md";
storiesOf("Card", module).add(
  "default",
  () => {
    return (
      <>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item lg={4} xs={12}>
            <CustomCard title="Title">
              <CardHeader title={`sample header`}>Header</CardHeader>
            </CustomCard>
          </Grid>
        </Grid>
      </>
    );
  },
  { notes: { markdown: notes } }
);
