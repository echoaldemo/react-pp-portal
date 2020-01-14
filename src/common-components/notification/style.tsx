import { makeStyles } from "@material-ui/core/styles";
import { red, green, amber } from "@material-ui/core/colors";
const style = makeStyles({
  error: {
    backgroundColor: red[600]
  },
  success: {
    backgroundColor: green[600]
  },
  warning: {
    backgroundColor: amber[600]
  },
  info: {
    backgroundColor: "#5f7d98"
  }
});

export { style };
