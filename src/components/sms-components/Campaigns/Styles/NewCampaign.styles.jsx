export default theme => ({
  root: {},
  dialogTitle: {
    background: "#5f7d98",
    fontSize: "25px"
  },
  dialogText: {
    fontSize: 20,
    color: "#fff",
    margin: 0,
    textAlign: "center"
  },
  textContent: {
    position: "relative",
    width: "100%",
    height: "auto",
    paddingBottom: 0,
    textAlign: "center"
  },
  loaderWrapper: {
    position: "relative",
    width: "100%",
    height: "auto",
    paddingTop: 10,
    display: "flex",
    justifyContent: "center"
  },
  buttonDiv: {
    marginTop: 39,
    display: "flex",
    justifyContent: "space-around",
    paddingBottom: 30
  },
  cancelBtn: {
    border: "none",
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontWeight: 600,
    fontSize: "14px",
    color: "#444851",
    width: 165,
    height: 40,
    borderRadius: 3,
    backgroundColor: "#eeeeee",
    "&:hover": {
      backgroundColor: "#bbbbbb",
      cursor: "pointer"
    },
    "@media(min-width:320px)": {
      marginRight: 10
    }
  },
  saveBtn: {
    border: "none",
    fontWeight: 600,
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: "14px",
    color: "#ffffff",
    width: 165,
    height: 40,
    borderRadius: 3,
    backgroundColor: "#b6d36b",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#a6c556"
    }
  },
  disabledBtn: {
    border: "none",
    fontWeight: 600,
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: "14px",
    color: "#ffffff",
    width: 165,
    height: 40,
    borderRadius: 3,
    backgroundColor: "#b6d36b",
    "&:hover": {
      cursor: "not-allowed"
    }
  },
  saveTxt: {
    fontSize: "14px",
    color: "#fff",
    fontWeight: 500
  },
  dialogCloseIcon: {
    float: "right",
    "&:hover": {
      cursor: "pointer"
    }
  }
});
