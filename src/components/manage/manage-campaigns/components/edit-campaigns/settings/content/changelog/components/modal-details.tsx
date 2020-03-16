<<<<<<< HEAD:src/components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/components/modal-details.js
import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { CustomButton } from "common-components";
=======
import React from 'react'
import { Grid } from '@material-ui/core'
import { CustomButton } from 'common-components'

>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38:src/components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/components/modal-details.tsx
const classes = {
  gridWrapper: {},
  container: { fontSize: 16, paddingTop: 15 },

  labelContainer: { color: "#444851", paddingBottom: 15 },
  descriptionContainer: { color: "#777777", paddingBottom: 15 }
};

<<<<<<< HEAD:src/components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/components/modal-details.js
export default class ModalDetails extends Component {
  displayChanges = () => {
    let baseField = this.props.data.changed_fields;
    let originalBaseField = this.props.data.original_fields;
    // let fields = baseField[element][Object.keys(baseField[element])[0]];
=======
interface Props {
  data : any,
  onClose: () => void
}

const ModalDetails: React.FC <Props> = ({ data, onClose}) => {

  const displayChanges = () => {
    let baseField = data.changed_fields
    let originalBaseField = data.original_fields
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38:src/components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/components/modal-details.tsx

    return (
      <React.Fragment>
        {Object.keys(baseField).map((element: any, i: number) => (
          <Grid
            container
            key={i}
<<<<<<< HEAD:src/components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/components/modal-details.js
            style={{ borderBottom: "solid 1px #eee", paddingTop: 15 }}
          >
=======
            style={{ borderBottom: 'solid 1px #eee', paddingTop: 15 }}>
            
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38:src/components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/components/modal-details.tsx
            {Object.keys(originalBaseField).length > 0 ? (
              <>
                <Grid item xs={4} lg={4} md={4}>
                  <b>New {element}:</b>
                </Grid>
                <Grid item xs={12} lg={8} md={8} style={{ paddingBottom: 15 }}>
                  {Array.isArray(
                    baseField[element][Object.keys(baseField[element])[0]]
                  ) ? (
                    <>
                      { baseField[element][ Object.keys(baseField[element])[0] ].map( (e: any) => (
                        <Grid
                          container
                          style={{ paddingBottom: 10 }} >
                            {JSON.parse(JSON.stringify(e[Object.keys(e)[0]]))}
                        </Grid>
                        ))
                      }
                    </>
                  ) : (
                    <>
                      {JSON.stringify(
                        baseField[element][Object.keys(baseField[element])[0]]
                      )}
                    </>
                  )}
                </Grid>
              </>
            ) : (
              <Grid item xs={12} lg={12} md={12} style={{ paddingBottom: 15, marginTop: -15 }}>
                {JSON.parse(
                  JSON.stringify(
                    baseField[element][Object.keys(baseField[element])[0]]
                  )
                )}
              </Grid>
            )}

            {Object.keys(originalBaseField).length > 0 && (
              <>
                <Grid item xs={4} lg={4} md={4}>
                  <b>Old {element}:</b>
                </Grid>
                <Grid item xs={12} lg={8} md={8} style={{ paddingBottom: 15 }}>
                  {Array.isArray(
                    originalBaseField[element][
                      Object.keys(originalBaseField[element])[0]
                    ]
                  ) ? (
                    <>
                      {originalBaseField[element][
                        Object.keys(originalBaseField[element])[0]
                      ].map((e: any) => (
                        <Grid style={{ paddingBottom: 10 }} container>
                          {JSON.parse(JSON.stringify(e[Object.keys(e)[0]]))}
                        </Grid>
                      ))}
                    </>
                  ) : (
                    <>
                      {JSON.stringify(
                        originalBaseField[element][
                          Object.keys(originalBaseField[element])[0]
                        ]
                      )}
                    </>
                  )}
                </Grid>
              </>
            )}
          </Grid>
        ))}
<<<<<<< HEAD:src/components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/components/modal-details.js
      </>
    );
  };
  render() {
=======
      </React.Fragment>
    )
  }
  
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38:src/components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/components/modal-details.tsx
    return (
      <div style={classes.gridWrapper}>
        <Grid container style={classes.container}>
          <Grid item xs={4} lg={4} md={4} style={classes.labelContainer}>
            User:
          </Grid>
          <Grid item xs={8} lg={8} md={8} style={classes.descriptionContainer}>
            {data.user}
          </Grid>

          <Grid item xs={4} lg={4} md={4} style={classes.labelContainer}>
            Create:
          </Grid>
          <Grid item xs={8} lg={8} md={8} style={classes.descriptionContainer}>
            {data.created}
          </Grid>

          <Grid item xs={4} lg={4} md={4} style={classes.labelContainer}>
            Time:
          </Grid>
          <Grid item xs={8} lg={8} md={8} style={classes.descriptionContainer}>
            {data.time}
          </Grid>

          <Grid item xs={4} lg={4} md={4} style={classes.labelContainer}>
            Changes:
          </Grid>
          <Grid item xs={8} lg={8} md={8} style={classes.descriptionContainer}>
            {displayChanges()}
          </Grid>
        </Grid>
<<<<<<< HEAD:src/components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/components/modal-details.js
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
=======

        <Grid item xs={12} lg={12} md={12} style={{ display: 'flex', justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 45 }} >
          <CustomButton style={{ backgroundColor: '#7C8A97', color: '#eeeeee' }} handleClick={onClose}>
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38:src/components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/components/modal-details.tsx
            Close
          </CustomButton>
        </Grid>
      </div>
<<<<<<< HEAD:src/components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/components/modal-details.js
    );
  }
=======
    )
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38:src/components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/components/modal-details.tsx
}

export default ModalDetails