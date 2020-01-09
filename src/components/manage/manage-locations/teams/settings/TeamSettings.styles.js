const styles = {
  root: {
    width: "100%",
    display: "flex"
  },
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
  paper: {
    paddingTop: 15,
    height: 665,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    minWidth: 500,
    paddingBottom: 30
  },
  inputContainer: {
    paddingBottom: 20,
    marginBottom: "5%"
  },
  inputLabel: {
    color: "#bbbbbb",
    fontSize: 16,
    fontWeight: 600
  },
  removeLeader: {
    color: "#bbbbbb",
    fontSize: 16,
    fontWeight: 600,
    marginTop: 15
  },
  shrink: {
    transform: "translate(0,1.5px) scale(1)"
  },
  focused: {
    color: "#1194f6 !important"
  },
  input: {
    fontSize: 18,
    color: "#444851"
  },
  textField: {
    "&:before": {
      borderBottom: "1px solid rgba(0,0,0,0.12)"
    },
    "&:after": {
      borderBottom: "2px solid #1394f6"
    },
    "&&&&:hover:not($disabled):before": {
      borderBottom: "1px solid #1194f6"
    }
  },
  switchButton: {
    "&.Mui-checked": {
      color: "#1194f6"
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#1194f6 !important"
    },
    color: "#ffffff"
  },
  switchTrack: {
    backgroundColor: "#b1b1b1"
  },
  delIcon: {
    fontSize: 20,
    marginTop: -2.5,
    marginRight: "3%"
  },
  delBtn: {
    fontSize: 16,
    fontWeight: 600,
    width: 130,
    height: 40,
    backgroundColor: "#ff504d",
    color: "rgba(255,255,255,0.87)",
    "&:hover": {
      backgroundColor: "rgb(255,55,51)"
    }
  },
  collapseWrapper: {
    width: "100%"
  },
  button: {
    minHeight: 36,
    minWidth: "48%",
    fontWeight: 600,
    cursor: "pointer",
    borderRadius: 2,
    border: 0,
    outline: "none"
  },
  cancel: {
    "&:hover": {
      backgroundColor: "#dadada"
    }
  },
  active: {
    color: "#ffffffde",
    backgroundColor: "#b6d36b",
    "&:hover": {
      backgroundColor: "#add447"
    }
  },
  disabled: {
    color: "rgba(0,0,0,0.38)",
    backgroundColor: "rgba(0,0,0,0.12)",
    cursor: "default"
  },
  inputText: {
    color: "#444851"
  },
  selectInput: {
    "&:before": {
      borderBottom: "1px solid #e0e0e0"
    },
    "&:after": {
      borderBottom: "2px solid #1194f6"
    }
  },
  userSettings: {
    color: "#444851",
    fontSize: "18px"
  },
  cardCon: {
    marginTop: "1%",
    "@media (min-width: 492px) and (max-width: 959px)": {}
  },
  cardItem: {
    "@media (min-width: 492px) and (max-width: 959px)": {
      marginBottom: "5%"
    }
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginTop: 2,
    color: "#959a95"
  }
};

export default styles;
