const useStyles: any = (theme: any) => ({
  root: {
    width: "100%",
    display: "flex"
  },
  toolbar: {
    paddingRight: 24
  },
  appBar: {
    backgroundColor: "#444851",
    color: "#e7e8e9",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  title: {
    flexGrow: 1
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "auto",
    width: "100%"
  },
  container: {
    width: "100%",
    padding: "0",
    margin: "0",
    "@media (max-width: 425px)": {
      width: "100%"
    },
    "@media (min-width: 959px) and (max-width: 1300px)": {
      width: "100%"
    },
    "@media (max-width: 1440px)": {
      paddingBottom: "111px"
    },
    "@media (max-width: 1024px)": {
      paddingBottom: "111px"
    },
    "@media (max-width: 599px)": {
      paddingBottom: "111px"
    }
  },
  tableWrapper: {
    backgroundColor: "#fafafa",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: "675px",
    "@media (max-width: 425px)": {
      width: "100%",
      overflow: "scroll",
      maxHeight: "515px"
    },
    "@media (max-width: 960px)": {
      height: "auto"
    },
    "@media (min-width: 492px) and (max-width: 959px)": {
      textAlign: "-webkit-center"
    }
  },
  filterWrapper: {
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: "1px solid #f7f7f7",
    "@media (max-width: 425px)": {
      width: "100%"
    },
    "@media (max-width: 599px)": {
      width: "100%"
    }
  },
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    marginTop: 28,
    marginLeft: "12px",
    "@media (max-width: 425px)": {
      marginTop: 15
    }
  },
  accountIcon: {
    fontSize: 40
  },
  largeTitle: {
    backgroundColor: "#7c8a97",
    height: "20vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    // marginTop: 20,
    "@media (max-width: 425px)": {
      height: "14vh"
    }
  },
  pitchTable: {
    padding: "30px 0px 30px 21px",
    flexDirection: "row",
    "@media (max-width: 425px)": {
      height: "22vh",
      padding: "6px"
    }
  },
  emptyPitch: {
    backgroundColor: "#fafafa",
    height: "30vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "#83909c",
    textAlign: "center",
    fontSize: "15px"
  },
  searchMargin: {
    marginTop: "15px"
  },
  header: {
    width: "100%",
    alignItems: "center",
    padding: "10px",
    marginLeft: "5px",
    "@media (max-width: 425px)": {
      margin: "11px 0px 14px -18px"
    },
    "@media (max-width: 599px)": {
      marginLeft: "-19px",
      marginRight: "41px"
    }
  },
  headerTitle: {
    fontSize: 40,
    "@media (max-width: 528px)": {
      fontSize: 28
    },
    "@media (max-width: 425px)": {
      fontSize: 24
    },
    "@media (max-width: 320px)": {
      fontSize: 20
    }
  },
  addBtn: {
    backgroundColor: "#a6c556",
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
    "&:hover": {
      backgroundColor: "#95b051"
    },
    "@media (max-width: 425px)": {
      width: 50,
      height: 50,
      display: "none"
    }
  },
  resIcon: {
    "@media (max-width: 425px)": {
      fontSize: 30
    }
  },
  mobileCon: {
    display: "none",
    "@media (max-width: 1000px)": {
      display: "inline-block"
    }
  },
  mobileConDropdown: {
    display: "none",
    "@media (max-width: 1000px)": {
      display: "flex"
    }
  },
  desktopCon: {
    display: "inline-block",
    "@media (max-width: 1000px)": {
      display: "none"
    }
  }
});

export default useStyles;