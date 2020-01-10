import React, { useContext } from "react";
import { Popover, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { store } from "../store";
const useStyles = makeStyles((theme) => ({
  popover: {
    boxShadow: "0 1px 7px 0 rgba(0, 0, 0, 0.12)"
  },
  menuItem: {
    "&:hover": {
      backgroundColor: "#fafafa"
    }
  }
}));

const PopupMenu: React.FC = (props: any) => {
  const { state, dispatch } = useContext(store) as any;
  const classes = useStyles();
  return (
    <Popover
      id="menu-appbar"
      classes={{ paper: classes.popover }}
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={(e) => props.onClose()}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      keepMounted
    >
      <MenuItem
        className={classes.menuItem}
        key={1}
        onClick={(e) => {
          props.onClose();
          props.openSummary();
        }}
      >
        List summary
      </MenuItem>
      <MenuItem
        className={classes.menuItem}
        key={2}
        onClick={(e) => {
          props.onClose();
          props.openEditList();
        }}
      >
        Edit lists settings
      </MenuItem>
      <MenuItem
        className={classes.menuItem}
        key={3}
        onClick={(e) => props.onClose()}
      >
        List details report
      </MenuItem>
      <MenuItem
        className={classes.menuItem}
        key={4}
        onClick={() => dispatch({ type: "UPLOAD" })}
      >
        Upload new leads
      </MenuItem>
    </Popover>
  );
};

export default PopupMenu;
