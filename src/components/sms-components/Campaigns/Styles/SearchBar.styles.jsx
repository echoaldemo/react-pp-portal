export default theme => ({
  searchIcon: { color: "#bbb" },
  inputField: {
    marginBottom: 24,
    "& .MuiInput-underline": {
      borderBottomColor: "#1194f6"
    }
  },
  textField: {
    textAlign: "left",
    "& label": {
      color: "#999999",
      fontWeight: 500
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
    "& .MuiInputLabel-animated:after": {
      color: "#1194f6"
    }
  }
});
