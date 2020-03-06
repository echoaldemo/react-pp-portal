import React from "react"
import { Grid } from "@material-ui/core"
import { CustomButton } from "common-components"

const classes = {
  gridWrapper: {},
  container: { fontSize: 16, paddingTop: 15 },
  labelContainer: { color: "#444851", paddingBottom: 15 },
  descriptionContainer: { color: "#777777", paddingBottom: 15 }
}

interface Props {
  data: any;
  onClose: () => void;
}

const ModalDetails: React.FC<Props> = ({ data, onClose }) => {
  const displayChanges = () => {
    let baseField = data.changed_fields
    let originalBaseField = data.original_fields
    return (
      <React.Fragment>
        {Object.keys(baseField).map((element: any, i: number) => (
          <Grid
            container
            key={i}
            style={{ borderBottom: "solid 1px #eee", paddingTop: 15 }}
          >
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
                      {baseField[element][
                        Object.keys(baseField[element])[0]
                      ].map((e: any) => (
                        <Grid container style={{ paddingBottom: 10 }}>
                          {JSON.parse(JSON.stringify(e[Object.keys(e)[0]]))}
                        </Grid>
                      ))}
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
              <Grid
                item
                xs={12}
                lg={12}
                md={12}
                style={{ paddingBottom: 15, marginTop: -15 }}
              >
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
      </React.Fragment>
    )
  }
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
          handleClick={onClose}
        >
          Close
        </CustomButton>
      </Grid>
    </div>
  )
}

export default ModalDetails
