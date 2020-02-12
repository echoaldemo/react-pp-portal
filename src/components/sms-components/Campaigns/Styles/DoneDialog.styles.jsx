export default theme => ({
  progress: {
    margin: theme.spacing(2)
  },
  dialogText: {
    fontSize: 20,
    color: "#fff",
    margin: 0,
    textAlign: "right"
  },
  dialogTitle: {
    fontSize: "25px",
    color: "#fff"
  },
  flex: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  span: {
    fontSize: 20
  },
  textContent: {
    paddingTop: 35,
    paddingBottom: 30
  },
  error: {
    fontSize: "18px",
    fontWeight: 500,
    color: "#7c8a97"
  },
  dialogCloseIcon: {
    float: "right",
    "&:hover": {
      cursor: "pointer"
    }
  }
});
