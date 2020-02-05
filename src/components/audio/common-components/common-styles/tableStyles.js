const useStyles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto",
    "@media (max-width: 768px) and (min-width: 600px)": {
      maxHeight: "680px"
    }
  },
  table: {
    // minWidth: 500,
    tableLayout: "fixed",
    "@media (max-width: 425px)": {
      width: "100%"
    }
  },
  tableName: {},
  tablePaginationActions: {
    marginLeft: "-4px"
  },
  tablePaginationCaptions: {
    marginLeft: "-10px"
  },
  textField: {
    marginLeft: "1%",
    width: "100%",
    "& label": {
      fontSize: "16px",
      flexGrow: 1,
      width: "100%",
      color: "#a3a3a3"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#299ff7"
    },
    "@media (max-width: 425px)": {
      width: "100%"
    }
  },
  searchIcon: {
    fontSize: "18px",
    marginLeft: "-30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  textFieldRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "1%",
    "@media (max-width: 425px)": {
      width: "100%"
    }
  },
  tblTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  play: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  },
  playIcon: {
    marginRight: 10,
    fontSize: 25,
    color: "grey",
    "@media (max-width: 425px)": {
      fontSize: 19
    }
  },
  hideLoader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  },
  linearLoader: {
    width: 225,
    margin: "0 auto"
  },
  resFont: {
    "@media (max-width: 425px)": {
      textOverflow: "ellipsis",
      fontSize: 14,
      whiteSpace: "nowrap",
      width: "100px",
      overflow: "hidden"
    }
  },
  resIcon: {
    "@media (max-width: 425px)": {
      fontSize: 18
    }
  },
  resTextMenu: {
    "@media (max-width: 425px)": {
      fontSize: 13
    }
  },
  resHideTblName: {
    "@media (max-width: 425px)": {
      display: "none"
    }
  },
  resHide: {
    display: "flex",
    alignItems: "center",
    "@media (max-width: 425px)": {
      display: "none"
    }
  },
  resPlay: {
    display: "none",
    "@media (max-width: 425px)": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  },
  resPlayer: {
    height: "47px",
    "@media (max-width: 425px)": {
      width: "249px",
      height: "37px",
      marginLeft: "-119px"
    },
    "@media (max-width: 340px)": {
      width: "141px !important"
    },
    "@media (max-width: 768px) and (min-width: 600px)": {
      width: "250px",
      height: "40px"
    }
  },
  resLoader: {
    "@media (max-width: 425px)": {
      width: "25px !important",
      height: "25px !important"
    }
  }
});

export default useStyles;
