export const styles = (theme: any) => ({
  link: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: 18,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#1194f6"
  },
  campaignTitle: {
    marginTop: theme.spacing(4),
    fontFamily: "Roboto, Helvetica, sans-serif;",
    fontSize: 24,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#444851"
  },
  root: {
    margin: theme.spacing(4, 0),
    borderRadius: 3,
    boxShadow: "0 0 6px 1px rgba(155, 155, 155, 0.18)",
    padding: 26
  },
  header: {
    marginBottom: theme.spacing(2),
    fontFamily: "Roboto, Helvetica, sans-serif;",
    fontSize: 16,
    fontWeight: 600,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#444851",
    padding: "0 4px"
  },
  text: {
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: 16,
    fontWeight: 900,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#7b8a96"
  },
  tab: {
    backgroundColor: "transparent",
    color: "#7b8a96",
    marginBottom: theme.spacing(2),
    "& .MuiTab-textColorInherit.Mui-selected": {
      backgroundColor: "white",
      color: "#7b8a96"
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#f89523"
    },
    boxShadow: "none"
  },
  main: {
    "@media(max-width:768px)": {
      padding: "0 5%"
    },
    "@media(max-width:1377px)": {
      padding: "0 5%"
    }
  },
  formControl: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: theme.spacing(3),
    width: "100%"
  },
  helperText: {
    color: "#999999",
    marginTop: -3,
    fontSize: 12
  },
  subHelperText: {
    color: "#999999",
    marginTop: 15,
    fontSize: 12
  },
  label: {
    "& .MuiFormControlLabel-label": {
      color: "#444851"
    }
  }
});

export const checkBoxStyles = () => ({
  root: {
    "&$checked": {
      color: "#1194f6"
    }
  },
  checked: {}
});

export const Confirmation = (theme: any) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: "#5F7D98",
    color: "#ffffff"
  },
  content: {
    padding: "25px",
    "@media(max-width:768px)": {
      padding: "20px 15px"
    }
  },
  closeButton: {
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#ffffff"
  },
  title: {
    fontSize: 20
  },
  addBtn: {
    width: "100%",
    backgroundColor: "#ff504d",
    color: "white",
    "&:hover": {
      background: "#b01b2e"
    }
  },
  cancelAdd: {
    width: "100%",
    marginRight: 10,
    backgroundColor: "#eeeeee",
    color: "#444851",
    "&:hover": {
      background: "lightGrey"
    }
  },
  warning: {
    width: "60px",
    marginLeft: "30%",
    marginTop: "-5px",
    "@media(max-width:600px)": {
      marginLeft: "40%"
    }
  },
  gridButtons: {
    marginTop: "20px",
    marginBottom: "-10px"
  },
  gridMessage: {
    marginTop: "35px",
    marginBottom: "35px"
  },
  confirm: {
    marginLeft: "-5%",
    "@media(max-width:600px)": {
      marginLeft: "6%"
    }
  },
  typography: {
    color: "#444851"
  }
});

export const CssTextStyle = (theme: any) => ({
  formControl: {
    marginTop: theme.spacing(0.5),
    width: "100%"
  },
  helperText: {
    marginTop: "2px"
  },
  root: {
    "& label.Mui-focused": {
      color: "#1194f6"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(238, 238, 238, 0.99)"
      },
      "&:hover fieldset": {
        border: "1.5px solid #1194f6"
        // borderColor: "#1194f6"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1194f6"
      },
      "& .Mui-error": {
        color: "#cc0300"
      }
    },
    width: "100%"
  },
  error: {
    "& label.Mui-focused": {
      color: "#cc0300"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(238, 238, 238, 0.99)"
      },
      "&:hover fieldset": {
        border: "1.5px solid #1194f6"
        // borderColor: "#1194f6"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#cc0300"
      },
      "& .Mui-error": {
        color: "#cc0300"
      },
      "& .Mui-error::after": {
        borderBottomColor: "#cc0300"
      }
    },
    width: "100%"
  },
  maxtextLimit: {
    color: "#999999"
  },
  mintextLimit: {
    color: "#999999"
  }
});
