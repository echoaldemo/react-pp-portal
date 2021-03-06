/* eslint-disable import/first */
import React, { useState } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { Face as FaceIcon } from "@material-ui/icons";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { logout } from "auth/controllers/controller";
// import getData from '../../../auth/controllers/getUserData'
import { SideNav, DashboardSidenav } from "common-components";
import logo from "assets/images/pp_logo_white_font.png";
import { useStyles, StyledLink, Img, NotifIcon, WelcomeName } from "./style";
import { loginChecker } from "auth/services/authService";

interface HeadMenuProps {
  location: Obj;
  history: any;
}

interface Obj {
  [index: string]: any;
}

const HeadMenu: React.FC<HeadMenuProps> = ({ location, history }) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [wholeName, setWholeName] = useState<string>("Loading...");
  const [name, setName] = useState<string>("");

  React.useEffect(() => {
    if (!loginChecker()) {
      history.push("/");
    }
    result();
  }, []); // eslint-disable-line

  const result = async () => {
    const name = localStorage.getItem("user");
    if (name) {
      setWholeName(`${name}`);
      setName(name);
    }
  };

  const drawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const [_open, _setOpen] = React.useState(false);
  const anchorRef = React.useRef<any>(null);

  function handleToggle() {
    _setOpen(prevOpen => !prevOpen);
  }

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    _setOpen(false);
  };

  function jsUcfirst(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" onClick={drawerOpen}>
            <MenuIcon />
          </IconButton>
          <Img src={logo} alt="logo" />
          {name ? (
            <WelcomeName>
              {jsUcfirst(name)}, welcome to your dashboard!
            </WelcomeName>
          ) : null}
          <NotifIcon />
          <AccountCircleIcon fontSize="large" />
          <Typography> {wholeName}</Typography>
          <IconButton
            ref={anchorRef}
            onClick={handleToggle}
            style={{
              color: "white"
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
          <Popper
            open={_open}
            anchorEl={anchorRef.current}
            placement={"bottom"}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                in={_open}
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper id="menu-list-grow">
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                      <StyledLink to="/change-password">
                        <MenuItem onClick={handleClose}>
                          <ListItemIcon>
                            <FaceIcon />
                          </ListItemIcon>
                          <ListItemText>
                            <Typography
                              style={{
                                fontSize: "15px"
                              }}
                            >
                              Change Password
                            </Typography>
                          </ListItemText>
                        </MenuItem>
                      </StyledLink>
                      <MenuItem
                        onClick={() => {
                          logout();
                        }}
                      >
                        <ListItemIcon>
                          <PowerSettingsNewIcon />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography
                            style={{
                              fontSize: "15px"
                            }}
                          >
                            Logout
                          </Typography>
                        </ListItemText>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </AppBar>

      {(location.pathname.includes("/manage") ||
        location.pathname.includes("/change")) && (
        <SideNav handleDrawerClose={handleDrawerClose} open={open} />
      )}

      {location.pathname.includes("/dashboard") && (
        <DashboardSidenav handleDrawerClose={handleDrawerClose} open={open} />
      )}
    </div>
  );
};

HeadMenu.defaultProps = {
  location: { pathname: "/manage/user" },

  logout: () => {
    alert("Logout");
  }
} as Partial<HeadMenuProps>;

export { HeadMenu };
