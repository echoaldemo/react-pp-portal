const styles = {
  paper: {
    height: 665,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "30px",
    minWidth: "500px",
    paddingBottom: "30px"
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
  delBtn: {
    textTransform: "capitalize",
    fontSize: 16,
    fontWeight: 600,
    width: 130,
    height: 40,
    backgroundColor: "#7c8a97",
    color: "rgba(255,255,255,0.87)",
    "&:hover": {
      backgroundColor: "#717d88"
    }
  },
  collapseWrapper: {
    width: "100%"
  },
  button: {
    minHeight: "36px",
    minWidth: "48%",
    fontWeight: 600,
    cursor: "pointer",
    borderRadius: "2px",
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
  }
};

export default styles;
