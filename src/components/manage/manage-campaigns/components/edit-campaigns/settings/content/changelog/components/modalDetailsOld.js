import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import CustomButton from "../../../../.../../../../../common-components/buttons/CustomButton";
const classes = {
  gridWrapper: {},
  container: { fontSize: 16, paddingTop: 15 },

  labelContainer: { color: "#444851", paddingBottom: 15 },
  descriptionContainer: { color: "#777777", paddingBottom: 15 }
};

export default class ModalDetails extends Component {
  render() {
    return (
      <div style={classes.gridWrapper}>
        <Grid container style={classes.container}>
          <Grid item xs={4} lg={4} md={4} style={classes.labelContainer}>
            User:
          </Grid>
          <Grid item xs={8} lg={8} md={8} style={classes.descriptionContainer}>
            {this.props.data.user}
          </Grid>

          <Grid item xs={4} lg={4} md={4} style={classes.labelContainer}>
            Create:
          </Grid>
          <Grid item xs={8} lg={8} md={8} style={classes.descriptionContainer}>
            {this.props.data.created}
          </Grid>

          <Grid item xs={4} lg={4} md={4} style={classes.labelContainer}>
            Time:
          </Grid>
          <Grid item xs={8} lg={8} md={8} style={classes.descriptionContainer}>
            {this.props.data.time}
          </Grid>

          <Grid item xs={4} lg={4} md={4} style={classes.labelContainer}>
            Changes:
          </Grid>
          <Grid item xs={8} lg={8} md={8} style={classes.descriptionContainer}>
            <Grid container>
              <Grid item xs={4} lg={4} md={4}>
                <b>
                  New{" "}
                  {JSON.parse(
                    JSON.stringify(
                      Object.keys(this.props.data.changed_fields)[0]
                    )
                  )}
                  :{" "}
                </b>
              </Grid>
              <Grid item xs={12} lg={8} md={8} style={{ paddingBottom: 15 }}>
                {//Getting the value of changed_field property
                JSON.stringify(
                  this.props.data.changed_fields[
                    Object.keys(this.props.data.changed_fields)[0]
                  ][
                    Object.keys(
                      this.props.data.changed_fields[
                        Object.keys(this.props.data.changed_fields)[0]
                      ]
                    )[0]
                  ]
                )}
              </Grid>

              <Grid item xs={4} lg={4} md={4}>
                <b>
                  Old{" "}
                  {JSON.parse(
                    JSON.stringify(
                      Object.keys(this.props.data.changed_fields)[0]
                    )
                  )}
                  :{" "}
                </b>
              </Grid>
              <Grid item xs={12} lg={8} md={8}>
                {//Getting the value of changed_field property
                JSON.stringify(
                  this.props.data.original_fields[
                    Object.keys(this.props.data.original_fields)[0]
                  ][
                    Object.keys(
                      this.props.data.original_fields[
                        Object.keys(this.props.data.original_fields)[0]
                      ]
                    )[0]
                  ]
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          lg={12}
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 45
          }}
        >
          <CustomButton
            style={{ backgroundColor: "#7C8A97", color: "#eeeeee" }}
            onClick={() => {
              this.props.onClose();
            }}
          >
            Close
          </CustomButton>
        </Grid>
      </div>
    );
  }
}
