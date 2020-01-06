const styles = {
  paper: {
    height: 873,
    display: "flex",
    justifyContent: "center",
    padding: "36px 30px 40px 30px",
    minWidth: "500px",
    borderRadius: "3px"
  },
  inputContainer: {
    paddingBottom: 0
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
    fontSize: "20px",
    marginTop: "-2.5px",
    marginRight: "3%"
  },
  delBtn: {
    textTransform: "capitalize",
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
