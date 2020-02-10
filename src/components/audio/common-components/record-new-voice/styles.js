const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  dialogTitle: {
    textAlign: "center",
    height: "60px",
    backgroundColor: "#5f7d98",
    fontSize: "20px",
    color: "#ffffff",
    fontFamily: '"Roboto"'
  },
  content: {
    height: "805px"
  },
  section1: {
    height: "330px"
  },
  section1_col1: {
    height: "330px",
    borderRadius: "3px",
    border: "solid 1px #eeeeee",
    minWidth: "610px",
    marginRight: "1.5%",
    display: "inline-block",
    "@media (min-width: 492px) and (max-width: 1024px)": {
      minWidth: "100%"
    }
  },
  cardTitle: {
    height: "60px",
    width: "100%",
    borderBottom: "1px solid #eeeeee",
    display: "table"
  },
  title: {
    fontSize: "16px",
    padding: "20px",
    fontWeight: "bold",
    color: "#444851",
    display: "table-cell",
    textAlign: "left",
    verticalAlign: "middle"
  },
  uploadFile: {
    height: "80px",
    width: "100%",
    borderBottom: "1px solid #eeeeee"
  },
  fileUploaded: {
    margin: "30px 20px 0 20px",
    borderBottom: "1px solid #eeeeee",
    display: "flex",
    justifyContent: "space-between",
    textTransform: "none",
    color: "#9a9a9a",
    fontSize: "16px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  chooseFile: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#2b9ff7",
    minWidth: "89px",
    paddingBottom: "5px",
    cursor: "pointer"
  },
  uploadAudioBtn: {
    marginTop: "20px",
    borderRadius: "0px",
    backgroundColor: "#4977a0",
    "&:hover": {
      backgroundColor: "#40688c"
    }
  },
  uploadDetails: {
    width: "100%",
    height: "183px",
    borderRadius: "3px",
    backgroundColor: "#fafafa",
    maxHeight: "185px",
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
    }
  },
  uploadList: {
    position: "relative",
    height: "46px",
    borderBottom: "solid 1px #eeeeee",
    backgroundColor: "#ffffff",
    padding: "13px 13px 13px 19px"
  },
  uploadText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: "490px",
    textOverflow: "ellipsis",
    fontSize: "14px",
    color: "#444851",
    float: "left",
    cursor: "pointer"
  },
  deleteBtn: {
    fontSize: "14px",
    textDecoration: "underline",
    float: "right",
    cursor: "pointer",
    color: "#444851",
    marginRight: "1%",
    "&:hover": {
      color: "#ff4949"
    }
  },
  deleteIcon: {
    fontSize: "17px",
    position: "absolute",
    marginLeft: "-20px",
    marginTop: "1px"
  },
  section1_col2: {
    display: "inline-block",
    height: "330px",
    borderRadius: "3px",
    border: "solid 1px #eeeeee",
    minWidth: "610px",
    "@media (min-width: 492px) and (max-width: 1024px)": {
      minWidth: "100%",
      marginTop: "2%"
    }
  },
  uploadSessionsBtn: {
    position: "relative",
    padding: "20px",
    float: "right",
    display: "table-cell",
    textAlign: "left",
    verticalAlign: "middle",
    color: "#4977a0",
    cursor: "pointer",
    "&:hover": {
      color: "#3e6588"
    }
  },
  uploadSessionsBtnDisabled: {
    position: "relative",
    padding: "20px",
    float: "right",
    color: "#bcbcbc",
    display: "table-cell",
    textAlign: "left",
    verticalAlign: "middle"
  },
  uploadIcon: {
    position: "absolute",
    marginLeft: "-35px",
    marginTop: "-2px"
  },
  sessionsContainer: {
    height: "263px",
    maxHeight: "263px",
    width: "100%",
    borderRadius: "3px",
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
    }
  },
  emptySessionsContainer: {
    display: "table",
    height: "263px",
    width: "100%",
    borderRadius: "3px",
    backgroundColor: "#fafafa"
  },
  emptySessions: {
    display: "table-cell",
    textAlign: "center",
    verticalAlign: "middle",
    color: "#9b9b9b"
  },
  sessionsList: {
    position: "relative",
    height: "70px",
    borderBottom: "solid 1px #eeeeee",
    backgroundColor: "#ffffff",
    padding: "13px 13px 13px 19px"
  },
  sessionText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: "174px",
    textOverflow: "ellipsis",
    fontSize: "14px",
    color: "#444851",
    cursor: "pointer",
    textDecoration: "underline"
  },
  audio: {
    height: "40px",
    width: "250px"
  },
  section2: {
    height: "400px",
    borderRadius: "3px",
    marginTop: "3%"
  },
  soundWaveCon: {
    height: "80px",
    borderRadius: "3px",
    marginTop: "-10px"
  },
  soundWave: {
    width: "100%",
    height: "80px",
    border: "1px solid #eeeeee",
    borderRadius: "3px"
  },
  previewSession: {
    height: "80px",
    borderRadius: "3px",
    backgroundColor: "#f7f7f7",
    marginTop: "5px"
  },
  previewSessionActive: {
    backgroundColor: "#2ab379 !important"
  },
  noPreview: {
    padding: "33px 28px 25px 18px",
    textAlign: "left",
    color: "#777777",
    fontSize: "16px"
  },
  noMicrophone: {
    padding: "33px 28px 25px 18px",
    textAlign: "center",
    color: "#ff5050",
    fontSize: "16px",
    width: "100%"
  },
  recordedAudio: {
    margin: "15px",
    width: "500px"
  },
  previewText: {
    padding: "30px 60px 30px 30px",
    color: "#ffffff",
    fontSize: "18px"
  },
  addToSessionBtn: {
    float: "right",
    margin: "7% 6% 6% 0",
    borderRadius: "0px",
    backgroundColor: "#5f7d98",
    "&:hover": {
      backgroundColor: "#59748e"
    }
  },
  uploadInfo: {
    display: "table",
    height: "40px"
  },
  uploadInfoText: {
    display: "table-cell",
    verticalAlign: "middle",
    fontSize: "15px",
    color: "#444851",
    paddingLeft: "3px"
  },
  uploadOptions: {
    height: "90px",
    marginTop: "-10px"
  },
  uploadOptionsBtn: {
    height: "40px"
  },
  optionsLabel: {
    color: "#777777"
  },
  checkbox: {
    color: "#eeeeee",
    fontSize: "18px"
  },
  checkboxActive: {
    "&.Mui-checked": {
      color: "#1194f6"
    }
  },
  optionsInfoCon: {
    height: "50px "
  },
  optionsInfoText: {
    color: "#777777",
    fontSize: "13px",
    width: "185px"
  },
  recordButtons: {
    height: "118px",
    border: "1px solid #eeeeee"
  },
  recordInstruction: {
    display: "table-cell",
    verticalAlign: "middle",
    textAlign: "left",
    height: "116px",
    padding: "20px",
    color: "#444851"
  },
  btnBoxPrev: {
    height: "70px",
    backgroundColor: "#eeeeee",
    borderRadius: "3px",
    width: "80px",
    margin: "25px 60px 21px 25px",
    textAlign: "center"
  },
  btnBoxNext: {
    height: "70px",
    backgroundColor: "#eeeeee",
    borderRadius: "3px",
    width: "80px",
    margin: "25px 25px 21px 35px",
    textAlign: "center"
  },
  btnBox: {
    height: "70px",
    backgroundColor: "#eeeeee",
    borderRadius: "3px",
    width: "80px",
    margin: "25px 25px 25px 0",
    textAlign: "center"
  },
  icon: {
    fontSize: "45px"
  },
  iconDisabled: {
    color: "#bdbdbd !important",
    fontSize: "45px"
  },
  iconPlay: {
    color: "green"
  },
  iconPause: {
    color: "#6d6d6d"
  },
  iconRecord: {
    color: "#ff504d"
  },
  iconRecordDisabled: {
    color: "#bdbdbd"
  },
  counterContainer: {
    margin: "30px",
    border: "2px dashed #dcdcdc",
    height: "60px"
  },
  counterText: {
    textAlign: "center",
    fontSize: "40px",
    color: "#7c8a97"
  },
  dialogPaper: {
    borderRadius: "0px",
    width: "420px",
    height: "290px"
  }
});

export default styles;
