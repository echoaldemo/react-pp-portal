import { createStyles, Theme } from "@material-ui/core";

export const liveCell = (theme: Theme) =>
  createStyles({
    root: {
      "& span": {
        display: "inline-flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 12,
        width: "60px",
        height: "20px",
        textTransform: "capitalize",
        borderRadius: "3px",
        color: "white",
        "&.Live": {
          backgroundColor: "#6698c7"
        },
        "&.Off": {
          backgroundColor: "#eeeeee",
          color: "#bbbbbb"
        }
      }
    }
  });
export const styleDetails: any = {
  span: {
    fontSize: 12,
    width: "60px",
    height: "20px",
    textTransform: "capitalize",
    borderRadius: "3px",
    color: "white",
    "&.active": {
      backgroundColor: "#6698c7"
    },
    "&.inactive": {
      backgroundColor: "#ff504d"
    }
  }
};
export const activeCell: any = {
  root: {
    "& span": {
      display: "inline-flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      ...styleDetails.span
    }
  }
};
