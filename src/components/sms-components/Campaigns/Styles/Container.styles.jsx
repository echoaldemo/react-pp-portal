export default theme => ({
  paperPadding: {
    "@media(max-width:1024px)": {}
    // "@media(min-width:1024px)": {
    //   paddingLeft: "0 5%"
    // }
  },
  root: {
    paddingTop: theme.spacing(3),
    margin: "auto",
    height: "auto",
    "@media(max-width:768px)": {
      width: "100%",
      display: "flex",
      flexDirection: "column"
    },
    "& .MuiPaper-elevation1": {
      boxShadow: "0 0 6px 1px rgba(155, 155, 155, 0.18)"
    }
  },
  datatable: {
    margin: "auto",
    marginTop: 20,
    height: "auto",
    "@media(max-width:768px)": {
      width: "100%",
      display: "flex",
      flexDirection: "column"
    },
    "& .MuiPaper-elevation1": {
      boxShadow: "0 0 0 0"
    }
  },
  innerDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 24,
    marginRight: 27,
    backgroundColor: "#fcfcfc",
    height: 62,
    "@media(max-width:768px)": {
      margin: 0,
      padding: 15,
      flexDirection: "column",
      justifyContent: "center"
    }
  },
  title: {
    marginLeft: 24,
    fontSize: 18,
    float: "left",
    fontWeight: 500,
    "@media(max-width:768px)": {
      float: "none",
      textAlign: "center",
      marginLeft: "-5px",
      padding: 3
    }
  },
  addText: {
    marginLeft: 20,
    float: "left",
    fontSize: 14,
    color: "#444851"
  },
  addBtnWrapper: {
    margin: "11px 10px 11px 0",
    float: "right"
  },
  divider: {
    marginTop: 19,
    marginBottom: 5,
    border: "solid 1px #eeeeee"
  },
  searchWrapper: {
    padding: "0 26px"
  }
});
