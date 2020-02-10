import { makeStyles, createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1194f6"
    }
  }
});

export const useStyles = makeStyles(() => ({
  root: {
    overflowX: "auto",
    overflowY: "hidden",
    minHeight: 500,
    width: "100%",
    position: "relative"
  },
  table: {
    backgroundColor: "#FFF"
  },
  header: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#444851",
    backgroundColor: "rgba(124, 138, 151, 0.05)",
    padding: "14px 0 14px 14px"
  },
  headerRow: {
    height: 50,
    fontWeight: 900,
    borderTop: "solid 1px #eee"
  },
  row: {
    minHeight: 55,
    "&:nth-of-type(even)": {
      backgroundColor: "#f8f9fa"
    }
  },
  userCell: {
    borderBottom: "none",
    color: "#777777",
    "& a": {
      color: "inherit"
    },
    margin: 0,
    width: "14%"
  },
  cell: {
    borderBottom: "none",
    padding: "14px 0 14px 14px",
    color: "#777777",
    "& a": {
      color: "inherit"
    },
    margin: 0,
    "& p": {
      "@media (max-width: 1700px)": {
        width: 100,
        overflowWrap: "break-word"
      },
      "@media (max-width: 1630px)": {
        width: 70,
        overflowWrap: "break-word"
      },
      "@media (max-width: 1440px)": {
        width: "70px",
        overflowWrap: "break-word"
      }
    },
    "&:last-child": {
      paddingRight: "16px !important"
    }
  },
  emailCell: {
    borderBottom: "none",
    padding: "14px 0 14px 14px",
    color: "#777777",
    "& a": {
      color: "inherit"
    },
    margin: 0,
    "& p": {
      "@media (max-width: 1700px)": {
        width: "100%",
        overflowWrap: "break-word"
      },
      "@media (max-width: 1630px)": {
        width: "120px",
        overflowWrap: "break-word"
      },
      "@media (max-width: 1440px)": {
        width: "120px",
        overflowWrap: "break-word"
      }
    }
  },
  fixedCell: {
    borderBottom: "none",
    padding: "14px 0 14px 14px",
    color: "#777777",
    "& a": {
      color: "inherit"
    },
    margin: 0,
    "& p": {
      "@media (max-width: 1700px)": {
        width: "100%",
        overflowWrap: "break-word"
      },
      "@media (max-width: 1630px)": {
        width: "120px",
        overflowWrap: "break-word"
      },
      "@media (max-width: 1440px)": {
        width: "100%",
        overflowWrap: "break-word"
      }
    }
  },
  uuid: {
    paddingTop: '26px',
    color: "#777777",
    height: "100%",
    whiteSpace: "nowrap",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "none",
    "& p": {
      width: 220,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      padding: 0,
      "@media (max-width: 1840px)": {
        width: 100
      }
    }
  },
  icon: {
    width: "14px !important",
    height: "16px !important",
    cursor: "pointer"
  },
  overflow: {
    lineHeight: "1em",
    maxHeight: "2em",
    display: "box",
    boxOrient: "vertical",
    lineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
}));
