import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Setup } from "../users-new/steps/SetupPassword";
import { useStyles } from "./styles";
import { SaveButton as CustomButton } from "common-components";
const SetupPassword = ({
  open,
  setOpen,
  password,
  handlePassword,
  handleSave,
  setSave
}: {
  open: any;
  setOpen: any;
  password: any;
  handlePassword: any;
  handleSave: any;
  setSave: any;
}) => {
  const classes = useStyles(0);
  return (
    <>
      <Setup
        custom="edit"
        password={password}
        handlePassword={handlePassword}
      />

      <Grid container spacing={1} style={{ marginTop: 29 }}>
        <Grid item xs>
          <CustomButton
            style={{
              width: 165,
              height: 40,
              borderRadius: 3,
              backgroundColor: "#eee"
            }}
            disabled={false}
            handleClick={() => setOpen(false)}
          >
            <Typography className={classes.cancelText}>CANCEL</Typography>
          </CustomButton>
        </Grid>
        <Grid item xs>
          <CustomButton
            style={{ marginLeft: 16 }}
            disabled={setSave}
            handleClick={() => handleSave()}
          >
            SAVE
          </CustomButton>
        </Grid>
      </Grid>
    </>
  );
};

export { SetupPassword };
