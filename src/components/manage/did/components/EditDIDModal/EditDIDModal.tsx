import React, { useState, useEffect } from "react";
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
import { LoadingModal, SuccessModal, DeleteModal } from "common-components";
import { useStyles, materialTheme } from "../../styles/EditDIDModal.style";

interface Props {
  open: boolean;
  closeFn: () => void;
  editData: any;
  fetchDIDs: () => void;
}
interface Obj {
  [index: string]: any;
}

const EditDIDModal = ({ open, closeFn, editData, fetchDIDs }: Props) => {
  const classes = useStyles({});
  const [did, setDID] = useState<Obj | null>(editData);
  const [didPools, setPools] = useState<any>(null);
  const [didPoolsLoading, setPoolsLoading] = useState<boolean>(true);
  const [selectedDIDPools, setSelectedPools] = useState<string>("");
  const [del, setDel] = useState<Obj>({
    open: false,
    deleting: false,
    deleted: false
  });
  const [update, setUpdate] = useState<Obj>({
    open: false,
    updating: false,
    updated: false
  });

  useEffect(() => {
    fetchDIDPools();
    setDID(editData);
    if (editData !== null) {
      setSelectedPools(editData.pool.uuid);
    }
  }, [editData]);

  const fetchDIDPools = () => {
    fetch(`http://5e00169a1fb99500141403ae.mockapi.io/api/v1/pools`)
      .then((response: any) => response.json())
      .then((response: any) => {
        console.log("pools", response);
        setPools(response);
        setPoolsLoading(false);
      });
  };

  const handleChange = (val: any, label: string) => {
    console.log("changing", val, label);
    if (label === "pool") {
      setSelectedPools(val);
      return;
    }
    setDID({
      ...did,
      [label]: val
    });
  };

  const handleUpdateDID = () => {
    if (did !== null) {
      closeFn();
      handleOpenUpdatingModal();
      const data: Obj = {
        active: did.active,
        owned: did.owned,
        pool:
          didPools.find((pool: Obj) => pool.uuid === selectedDIDPools) ||
          did.pool
      };
      fetch(
        `http://5e0015181fb99500141403a4.mockapi.io/mock/v1/dids/${did.uuid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      )
        .then(response => response.json())
        .then(data => {
          console.log("Success:", data);
          setUpdate({
            ...update,
            updating: false,
            updated: true
          });
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  };
  const handleDeleteDID = () => {
    if (did !== null) {
      setDel({
        ...del,
        open: false,
        deleting: true
      });
      fetch(
        `http://5e0015181fb99500141403a4.mockapi.io/mock/v1/dids/${did.uuid}`,
        {
          method: "DELETE"
        }
      )
        .then(response => response.json())
        .then(data => {
          console.log("Success:", data);
          setDel({
            ...del,
            open: false,
            deleting: false,
            deleted: true
          });
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  };

  const handleOpenUpdatingModal = () => {
    setUpdate({
      ...update,
      updating: true
    });
  };

  const handleCloseUpdatingModal = () => {
    setUpdate({
      ...update,
      updating: false
    });
  };
  const handleCloseDeletingModal = () => {
    setDel({
      ...del,
      deleting: false
    });
  };

  return (
    <div>
      <ThemeProvider theme={materialTheme}>
        <Dialog
          open={open}
          onClose={closeFn}
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
              <Close style={{ cursor: "pointer" }} onClick={closeFn} />
            </Typography>
          </DialogTitle>
          <DialogContent className={classes.content}>
            {did === null ? (
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
                    value={selectedDIDPools || ""}
                    onChange={e => handleChange(e.target.value, "pool")}
                  >
                    {!didPoolsLoading ? (
                      didPools.map((p: any) => (
                        <MenuItem key={p.uuid} value={p.uuid}>
                          {p.name}
                        </MenuItem>
                      ))
                    ) : (
                      <span className={classes.span}>
                        <CircularProgress size={20} />
                      </span>
                    )}
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
                    value={did.active ? "Active" : "Inactive"}
                    readOnly
                    endAdornment={
                      <InputAdornment position="end">
                        <Switch
                          checked={did.active}
                          onChange={e =>
                            handleChange(e.target.checked, "active")
                          }
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
                    id="owned"
                    readOnly
                    value={did.owned ? "Yes" : "No"}
                    endAdornment={
                      <InputAdornment position="end">
                        <Switch
                          checked={did.owned}
                          color="primary"
                          onChange={e =>
                            handleChange(e.target.checked, "owned")
                          }
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
                    value={did.number || ""}
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
                    value={did.timezone || "Field Not Set"}
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
                      onClick={() => {
                        closeFn();
                        setDel({ ...del, open: true });
                      }}
                    >
                      Delete
                    </button>
                  </Grid>
                  <Grid item>
                    <button
                      type="button"
                      className={classes.saveBtn}
                      onClick={() => handleUpdateDID()}
                    >
                      SAVE CHANGES
                    </button>
                  </Grid>
                </Grid>
              </form>
            )}
          </DialogContent>
        </Dialog>
        {did !== null && (
          <>
            <LoadingModal
              open={update.updating}
              text={"Updating DID..."}
              cancelFn={() => handleCloseUpdatingModal()}
            />
            <LoadingModal
              open={del.deleting}
              text={"Deleting DID..."}
              cancelFn={() => handleCloseDeletingModal()}
            />
            <SuccessModal
              open={update.updated}
              text={"DID was updated"}
              btnText="OK"
              closeFn={() => {
                fetchDIDs();
                setUpdate({
                  ...update,
                  updated: false
                });
              }}
              btnFn={() => {
                fetchDIDs();
                setUpdate({
                  ...update,
                  updated: false
                });
              }}
            />
            <SuccessModal
              open={del.deleted}
              text={"DID was deleted"}
              btnText="OK"
              closeFn={() => {
                fetchDIDs();
                setDel({
                  ...del,
                  deleted: false
                });
              }}
              btnFn={() => {
                fetchDIDs();
                setDel({
                  ...del,
                  deleted: false
                });
              }}
            />
            <DeleteModal
              open={del.open}
              name={did.number}
              closeFn={() => setDel({ ...del, open: false })}
              delFn={() => handleDeleteDID()}
            />
          </>
        )}
      </ThemeProvider>
    </div>
  );
};

export default EditDIDModal;
