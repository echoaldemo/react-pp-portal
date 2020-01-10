export default theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },


  select: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    textAlign: "left",
    "& label": {
      color: "#444851",
      textOverflow: "ellipsis"
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(238, 238, 238, 0.99)"
    },
    // "& .MuiInput-underline:hover:before": {
    //   borderBottomColor: "#1194f6"
    // },
    "& label.Mui-focused": {
      color: "#1194f6"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1194f6"
    },
    "& .MuiFormHelperText-root": {
      width: "100%",
      color: "#999999",
    },
    "& .MuiSelect-selectMenu": {
      color: "#444851"
    },
    marginBottom:"20px",
    
  },
  menu: {
    "& .MuiMenu-paper": {
      maxHeight: 48 * 4 + 8,
      minHeight: 48 * 4 + 8,
      width: 250,
    }
  },
  underline: {
    '&:before': {
      borderBottomColor:"rgba(238, 238, 238, 0.99)",
    },
    '&:after': {
      borderBottomColor:"#1194f6",
    },
  },
  cssLabel:{
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#1194f6"
    }
  },
  cssFocused: {},
  inputLabel: {
    color:"#1194f6"
  }
})