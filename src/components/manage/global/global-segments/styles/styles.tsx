import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  formControlLabel: {
    marginTop: theme.spacing(1)
  },
  inputField: {
    fontSize: "1rem",
    "&&&&:hover:before": {
      borderBottom: "1px solid rgba(0,0,0,0.1)"
    },
    "&:before": {
      borderBottom: "1px solid rgba(0,0,0,0.1)"
    },
    "&:after": {
      borderBottom: "2px solid #1394f6"
    }
  }
}));

export const font = [
  { label: "12px", value: 12 },
  { label: "13px", value: 13 },
  { label: "14px", value: 14 },
  { label: "15px", value: 15 },
  { label: "16px", value: 16 },
  { label: "17px", value: 17 },
  { label: "18px", value: 18 },
  { label: "19px", value: 19 },
  { label: "20px", value: 20 },
  { label: "21px", value: 21 },
  { label: "22px", value: 22 },
  { label: "23px", value: 23 },
  { label: "24px", value: 24 }
];
