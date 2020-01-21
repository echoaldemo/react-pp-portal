export const styles: any = {
  header: {
    height: "auto",
    margin: "27px auto",
    fontSize: 24,
    color: "#444851",
    "@media(max-width:768px)": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      margin: "25px 0"
    }
  },
  paper: {
    height: "auto",
    borderRadius: 3,
    boxShadow: "0 0 6px 1px rgba(155, 155, 155, 0.18)",
    backgroundColor: "#ffffff",
    padding: "16px 0",
    margin: "25px auto",
    "@media(max-width:768px)": {
      width: "100%",
      display: "flex",
      flexDirection: "column"
    }
  },
  fieldsContainer: {
    width: "100%",
    "@media(max-width:768px)": {
      width: "auto"
    }
  },
  headerWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  icon: {
    marginRight: 15,
    marginBottom: -5,
    width: 40,
    height: 40,
    fontSize: 40,
    fontWeight: "bolder",
    color: "#f89523"
  },
  title: {
    fontSize: 24,
    color: "#444851"
  }
};
