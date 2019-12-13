import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ style }: Object) => ({
  containerStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "3px",
    width: 60,
    height: 20,
    ...style
  },
  labelStyle: {
    fontSize: 12,
    color: "white"
  }
}));
