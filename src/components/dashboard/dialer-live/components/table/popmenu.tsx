import React, { useRef } from "react";
import { Menu, MenuItem } from "@material-ui/core";

export default (props: any) => {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={props.anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      onClose={e => props.onClose()}
      open={props.open}
    >
      <MenuItem
        onClick={() => {
          props.toggleDial();
          props.close();
        }}
      >
        Dialer parameters
      </MenuItem>
      <MenuItem>Other option</MenuItem>
    </Menu>
  );
};
