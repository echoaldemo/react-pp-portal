const styles = {
  card: {
    width: "480px",
    height: "600px",
    "@media (min-width: 959px) and (max-width: 999px)": {
      width: "270px"
    },
    "@media (min-width: 1000px) and (max-width: 1199px)": {
      width: "290px"
    },
    "@media (min-width: 1200px) and (max-width: 1377px)": {
      width: "335px"
    },
    "@media (min-width: 1378px) and (max-width: 1301px)": {
      width: "337px"
    },
    "@media (min-width: 1378px) and (max-width: 1381px)": {
      width: "340px"
    },
    "@media (min-width: 1382px) and (max-width: 1549px)": {
      width: "345px"
    },
    "@media (min-width: 1550px) and (max-width: 1699px)": {
      width: "390px"
    },
    "@media (min-width: 1700px) and (max-width: 1739px)": {
      width: "420px"
    },
    "@media (min-width: 1740px) and (max-width: 1799px)": {
      width: "440px"
    },
    "@media (min-width: 1800px) and (max-width: 1822px)": {
      width: "460px"
    },
    "@media (min-width: 1822px) and (max-width: 1880px)": {
      width: "470px"
    }
  },
  cardHeader: {
    borderBottom: "1px solid #ececec",
    height: 65
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: 600,
    letterSpacing: "0.5px",
    color: "#444851"
  },
  scroll: {
    position: "relative",
    maxHeight: 537,
    overflow: "auto",
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
    fontSize: "13.5px",
    textDecoration: "underline"
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
    margin: "15px 0 15px 0",
    width: "420px"
  },
  cancel: {
    cursor: "pointer",
    fontSize: "14px",
    color: "#444851",
    textDecoration: "underline"
  },
  showSearchDiv: {
    position: "relative",
    display: "flex",
    borderBottom: "1px solid #eeeeee",
    height: "65px",
    transition: "all .5s ease-in-out"
  },
  showSearchDivHidden: {
    display: "flex",
    height: "0px",
    transition: "all .5s ease-in-out"
  },
  recordIcon: {
    position: "absolute",
    fontSize: "15px",
    marginTop: "2px",
    marginLeft: "-18px"
  },
  recordName: {
    cursor: "pointer",
    fontSize: "13px",
    float: "left",
    textDecoration: "underline"
  },
  rerecord: {
    fontSize: "13.5px",
    float: "right",
    cursor: "pointer"
  },
  noAudioCon: {
    height: "535px",
    backgroundColor: "#fafafa",
    display: "table"
  },
  noAudioText: {
    fontSize: "18px",
    color: "#b4b4b4",
    textAlign: "center",
    verticalAlign: "middle",
    display: "table-cell"
  }
};

export default styles;
