import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Switch,
  FormHelperText,
  Select,
  Grid,
  CircularProgress
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Close from "@material-ui/icons/Close";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import { useStyles, materialTheme } from "../../styles/EditDIDModal.style";

const EditDIDModal = () => {
  const classes = useStyles({});

  return (
    <div>
      <ThemeProvider theme={materialTheme}>
        <Dialog
          open={true}
          maxWidth="sm"
          classes={{ paperWidthSm: classes.container }}
        >
          <DialogTitle className={classes.title}>
            <Typography
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <span style={{ fontWeight: 600, fontSize: 20 }}></span>
              <span style={{ fontWeight: 600, fontSize: 20 }}>Edit DID</span>
              <Close
                style={{ cursor: "pointer" }}
                // onClick={() => props.handleCloseEdit()}
              />
            </Typography>
          </DialogTitle>
          <DialogContent className={classes.content}>
            {true ? (
              <Typography className={classes.loading}>
                <span>Loading DID...</span>
                <CircularProgress classes={{ svg: classes.svgColor }} />
              </Typography>
            ) : (
              <form style={{ margin: "15px 0", overflow: "hidden" }}>
                <FormControl fullWidth>
                  <InputLabel
                    htmlFor="status"
                    classes={{
                      root: classes.inputLabel,
                      focused: classes.focused
                    }}
                  >
                    DID pool
                  </InputLabel>
                  <Select
                    className={classes.textField}
                    data-cy="did-pools"
                    style={{ margin: "14px 0 26px 0", width: "360px" }}
                    inputProps={{
                      IconComponent: () => <KeyboardArrowDown />
                    }}
                    // value={selectedDIDPools || ""}
                    // onChange={e => handleChange(e.target.value, "pool")}
                  >
                    {/* {!didPoolsLoading ? (
                      didPools.map(p => (
                        <MenuItem key={p.uuid} value={p.uuid}>
                          {p.name}
                        </MenuItem>
                      ))
                    ) : (
                      <span className={classes.span}>
                        <CircularProgress size={20} />
                      </span>
                    )} */}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel
                    htmlFor="status"
                    classes={{
                      root: classes.inputLabel,
                      focused: classes.focused
                    }}
                  >
                    DID status
                  </InputLabel>
                  <Input
                    id="status"
                    value={"Inactive"}
                    readOnly
                    endAdornment={
                      <InputAdornment position="end">
                        <Switch
                          checked={true}
                          //   onChange={e =>
                          //     handleChange(e.target.checked, "active")
                          //   }
                          color="primary"
                        />
                      </InputAdornment>
                    }
                  />
                  <FormHelperText id="status"></FormHelperText>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel
                    htmlFor="status"
                    classes={{
                      root: classes.inputLabel,
                      focused: classes.focused
                    }}
                  >
                    Owned
                  </InputLabel>
                  <Input
                    id="status"
                    readOnly
                    value={"No"}
                    endAdornment={
                      <InputAdornment position="end">
                        <Switch
                          checked={true}
                          color="primary"
                          //   onChange={e =>
                          //     handleChange(e.target.checked, "owned")
                          //   }
                        />
                      </InputAdornment>
                    }
                  />
                  <FormHelperText id="status"></FormHelperText>
                </FormControl>
                <FormControl fullWidth disabled>
                  <InputLabel
                    classes={{
                      root: classes.inputLabel,
                      focused: classes.focused
                    }}
                    htmlFor="number"
                    required
                  >
                    Number
                  </InputLabel>
                  <Input
                    autoComplete="off"
                    classes={{
                      underline: classes.textField
                    }}
                    id="number"
                    value={""}
                    required
                  />
                  <FormHelperText></FormHelperText>
                </FormControl>
                <FormControl fullWidth disabled>
                  <InputLabel
                    classes={{
                      root: classes.inputLabel,
                      focused: classes.focused
                    }}
                    htmlFor="timezone"
                    required
                  >
                    Timezone
                  </InputLabel>
                  <Input
                    autoComplete="off"
                    classes={{
                      underline: classes.textField
                    }}
                    id="timezone"
                    value={"Field Not Set"}
                    required
                  />
                  <FormHelperText></FormHelperText>
                </FormControl>
                <Grid
                  container
                  justify="space-between"
                  spacing={3}
                  style={{ marginTop: 5 }}
                >
                  <Grid item>
                    <button
                      type="button"
                      className={classes.delBtn}
                      //   onClick={() => handleOpenDelete()}
                    >
                      Delete
                    </button>
                  </Grid>
                  <Grid item>
                    <button
                      type="button"
                      className={classes.saveBtn}
                      //   onClick={() => handleUpdate()}
                    >
                      SAVE CHANGES
                    </button>
                  </Grid>
                </Grid>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};

export default EditDIDModal;
