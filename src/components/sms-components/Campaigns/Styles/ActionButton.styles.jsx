export default theme => ({
  root: {
    padding: theme.spacing(3, 2),
    width: 1107,
    margin: "auto"
  },
  btn: {
    float: "right",
    width: "196px",
    height: "40px",
    borderRadius: "3px",
    backgroundColor: "#b6d36b",
    display: "inline-flex",
    alignItems: "center",
    border: "none",
    justifyContent: "space-around",
    "&:hover": {
      backgroundColor: "#a6c556",
      cursor: "pointer"
    },
    "@media(max-width:768px)": {
      height: 40,
      fontSize: 12,
      padding: 10
    }
  },
  addCamp: {
    color: "#fff",
    height: "19px",
    fontWeight: 500,
    fontSize: "16px"
  }
});
