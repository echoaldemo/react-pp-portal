import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  card: {
    width: "450px",
    height: "500px",
    "@media (min-width: 960px) and (max-width: 999px)": {
      width: "200px"
    },
    "@media (min-width: 1000px) and (max-width: 1081px)": {
      width: "220px"
    },
    "@media (min-width: 1082px) and (max-width: 1199px)": {
      width: "250px"
    },
    "@media (min-width: 1200px) and (max-width: 1377px)": {
      width: "280px"
    },
    "@media (min-width: 1378px) and (max-width: 1381px)": {
      width: "310px"
    },
    "@media (min-width: 1382px) and (max-width: 1549px)": {
      width: "315px"
    },
    "@media (min-width: 1550px) and (max-width: 1699px)": {
      width: "350px"
    },
    "@media (min-width: 1700px) and (max-width: 1739px)": {
      width: "380px"
    },
    "@media (min-width: 1740px) and (max-width: 1799px)": {
      width: "410px"
    },
    "@media (min-width: 1800px) and (max-width: 1822px)": {
      width: "430px"
    },
    "@media (min-width: 1822px) and (max-width: 1880px)": {
      width: "440px"
    }
  },
  cardHeader: {
    borderBottom: "1px solid #ececec",
    height: 65
  },
  avatar: {
    color: "#444851",
    fontSize: "16px",
    fontWeight: "600",
    letterSpacing: "0.5px"
  },
  action: {
    margin: "1%"
  },
  remove: {
    color: "#444851",
    fontSize: "14px",
    textDecoration: "underline",
    cursor: "pointer"
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: 600,
    letterSpacing: "0.5px",
    color: "#444851"
  },
  scroll: {
    maxHeight: 537,
    overflow: "auto",
    position: "relative",
    "&::-webkit-scrollbar": {
      width: "0.3em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "10px",
      outline: "1px solid slategrey"
    },
    "@media (max-width: 425px)": {
      padding: 0,
      maxHeight: 648
    }
  },
  table: {
    "&tr:nth-child(even)": {
      background: "#CCC"
    },
    "&tr:nth-child(odd)": {
      background: "#FFF"
    }
  },
  tableHeader: {
    fontWeight: "bold",
    color: "#444851"
  },
  tableCell: {
    padding: "9px 10px 0px 0px"
  },
  name: {
    width: "40%",
    fontSize: "14px",
    padding: "20px",
    textDecoration: "underline"
  },
  removeIcon: {
    width: "5%",
    fontSize: "14px",
    cursor: "pointer"
  },
  dialog: {
    width: "100%",
    wordBreak: "break-word",
    height: "63px",
    overflow: "hidden",
    paddingTop: "6px",
    display: "-webkit-box",
    color: "#797979",
    fontSize: "13.5px",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": "3"
  },
  textField: {
    width: "371px",
    margin: "15px 15px 15px 0"
  },
  inputUnderline: {
    "&:before": {
      borderBottom: "1px solid #e0e0e0"
    },
    "&:after": {
      borderBottom: "2px solid #1194f6"
    }
  },
  cancel: {
    cursor: "pointer",
    fontSize: "14px",
    color: "#444851",
    textDecoration: "underline"
  },
  showSearchDiv: {
    height: "65px",
    transition: "all .5s ease-in-out"
  },
  showSearchDivHidden: {
    height: "0px",
    transition: "all .5s ease-in-out"
  },
  noAudioCon: {
    height: "435px",
    backgroundColor: "#fafafa",
    textAlign: "center",
    display: "table"
  },
  noAudioText: {
    fontSize: "18px",
    color: "#b4b4b4",
    display: "table-cell",
    verticalAlign: "middle",
    "@media (min-width: 960px) and (max-width: 1024px)": {
      fontSize: "16px"
    }
  },
  addIcon: {
    cursor: "pointer",
    marginTop: "4px"
  }
}));

export default styles;
