import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    // justifyContent: 'space-between',
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    background: "#444851",
    boxShadow: "none"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  iconSection: {
    marginTop: `${localStorage.getItem("is_impersonate") ? "100px" : "63px"}`
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "26px",
    letterSpacing: "0.1px",
    opacity: "0.85"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: "66px",
    boxShadow: "0 0 6px 1px rgba(155, 155, 155, 0.22)",
    zIndex: 0
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  active: {
    background: "#f89523",
    height: "60px",
    color: "white",
    textAlign: "center",
    verticalAlign: "middle",
    padding: "16px 0"
  },
  navButton: {
    height: "60px",
    textAlign: "center",
    verticalAlign: "middle",
    padding: "16px 0",
    cursor: "pointer",
    color: "gray",
    "&:hover": {
      background: "#f89523",
      color: "white"
    },
    list: {
      width: "250px"
    }
  },
  customLink: {
    textDecoration: "none",
    color: "#5f5f5f"
  },
  nested: {
    paddingBottom: "3px",
    paddingTop: "3px"
  },
  activeListItem: {
    color: "white",
    background: "#7c8a97",
    "&:hover": {
      background: "#b5b5b5",
      color: "white"
    }
  },
  activeListIcon: {
    color: "white"
  },
  collapseItemActive: {
    background: "#ececec",
    "&:hover": {
      background: "#b5b5b5",
      color: "white"
    }
  }
}));
