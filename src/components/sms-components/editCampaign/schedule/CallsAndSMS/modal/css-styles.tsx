export const styles: any = (theme: any) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#ffffff"
  },
  preSched: {
    fontWeight: "bold",
    color: "#444851",
    marginBottom: "5px"
  },
  grid: {
    marginTop: "-10px",
    marginBottom: "10px"
  },
  messageText: {
    fontWeight: "bold",
    color: "#444851",
    marginTop: theme.spacing(2),
    marginBottom: "5px"
  },
  textField: {
    marginTop: theme.spacing(1),
    width: "100%",
    "& label": {
      color: "#999999",
      fontSize: "20px"
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(238, 238, 238, 0.99)"
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "#1194f6"
    },
    "& label.Mui-focused": {
      color: "#1194f6"
    },
    "& label.Mui-error": {
      color: "#cc0300"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1194f6"
    },
    "& .Mui-error": {
      color: "#cc0300"
    },
    "& .Mui-error::after": {
      borderBottomColor: "#cc0300"
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "#999999"
    },
    "& .MuiFormHelperText-root": {
      width: "65%"
    }
  },
  text: {
    width: "90%",
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: "14.5px",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#444851",
    marginBottom: theme.spacing(2)
  },
  audio: {
    width: "100%",
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderBottom: "solid 1px rgba(238, 238, 238, 0.99)"
  },
  audioTitle: {
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: "19px",
    fontWeight: 500,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#444851",
    marginBottom: theme.spacing(1)
  },
  audioContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(1)
  },
  player: {
    width: "60%"
  },
  option: {
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: "16px",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#777777"
  },
  optionText: {
    fontSize: "14px"
  },

  cancel: {
    width: 165
  },
  done: {
    width: 165,
    backgroundColor: "#b6d36b",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#a6c161"
    }
  },
  addAudio: {
    backgroundColor: "#b6d36b",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#a6c161"
    }
  },
  header: {
    backgroundColor: "#5f7d98",
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: "20px",
    fontWeight: "500",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#ffffff"
  },
  title: {
    fontWeight: "bold",
    color: "#444851",
    marginBottom: "5px"
  },
  select: {
    margin: theme.spacing(1, 0),
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    textAlign: "left",
    fontFamily: "Roboto, Helvetica, sans-serif",
    "& label": {
      color: "#999999",
      fontSize: "20px"
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(238, 238, 238, 0.99)"
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "#1194f6"
    },
    "& label.Mui-focused": {
      color: "#1194f6"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1194f6"
    },
    "& .MuiFormHelperText-root": {
      width: "60%"
    }
  },
  menu: {
    width: 200
  },
  delete: {
    width: 130
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  link: {
    color: "#1194f6",
    textDecoration: "underline"
  },
  rightButtons: {
    display: "flex",
    justifyContent: "end"
  },
  deleteBtn: {
    width: "100%",
    backgroundColor: "#ff504d",
    "@media(min-width:768px)": {
      width: "75%"
    }
  },
  cancelBtn: {
    width: "50%",
    marginRight: "10px",
    backgroundColor: "#eeeeee",
    color: "#444851"
  },
  saveBtn: {
    width: "50%",
    backgroundColor: "#b6d36b",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#a6c161"
    }
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(0, 3),
    paddingBottom: theme.spacing(2.5)
  },
  Content: {
    padding: theme.spacing(3, 3)
  }
});
