export const tblPaginationAction = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
    "@media(max-width:768px) and (min-width:360px)": {
      marginLeft: "-20px"
    }
  }
});

export const tblCell = () => ({
  head: {
    backgroundColor: "#FBFBFB",
    fontSize: 14,
    color: "#444851",
    fontWeight: "Bold"
  },
  body: {
    fontSize: 14,
    color: "#777777"
  }
});

export const tblRow = () => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "rgba(124, 138, 151, 0.05)"
    },
    color: "#777777"
  },
  width: 100
});

export const paginationHover = () => ({
  select: {
    "&:hover": { cursor: "pointer" }
  },
  actions: {
    "&:hover": { cursor: "pointer" }
  }
});

export const mainPagination = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  },
  hover: {
    "&:hover": { cursor: "pointer" }
  },
  thead: {
    fontWeight: "bold",
    color: "#444851",
    width: 46
  },
  theadSpan: {
    display: "flex",
    alignItems: "center"
  },
  noData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "16px",
    color: "#bdbdbd"
  },
  listItemText: {
    fontSize: "15px"
  },
  listSubText: {
    fontSize: 14,
    color: "#777777"
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  fit: {
    overflow: "hidden",
    wordBreak: "break-word"
  },
  title: {
    fontSize: 16,
    fontWeight: 500
  },
  footerBgCopy2: {
    width: "60px",
    height: "20px",
    borderRadius: "3px",
    backgroundColor: "#eeeeee",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});
