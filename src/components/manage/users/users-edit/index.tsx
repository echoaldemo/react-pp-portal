import React from "react";
import { Grid } from "@material-ui/core";
import { Modal } from "common-components";
import { Avatar } from "./components";
import { useStyles } from "./styles";
import defaultAvatar from "./avatar.svg";
type EditProps = {
  open: boolean;
  setOpen: any;
};

function Edit({ open, setOpen }: EditProps) {
  const classes = useStyles();
  const renderEdit = () => (
    <Modal open={true || open} onClose={() => setOpen(false)} title="Edit user">
      <Grid container spacing={1}>
        <Grid item xs>
          <Avatar image={defaultAvatar} />
        </Grid>

        <Grid item xs>
          Toggler
        </Grid>

        <Grid item xs>
          <button className={classes.impersonateBtn}>Impersonate</button>
        </Grid>
      </Grid>
    </Modal>
  );
  return renderEdit();
}

export { Edit };
