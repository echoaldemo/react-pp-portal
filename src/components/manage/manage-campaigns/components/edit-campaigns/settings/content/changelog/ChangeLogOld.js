import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Select } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import AsyncTable from "../../../../../../common-components/async-table/AsyncTable";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { UnderlineCell } from "../../../../../../common-components/table-cells/TableCells";
const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    background: "white",
    color: "#444851"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    color: "#444851"
  }
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#1194f6"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1194f6"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red"
      },
      "&:hover fieldset": {
        borderColor: "yellow"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1194f6"
      }
    }
  }
})(TextField, Select);

export default function CampaignSettings() {
  const classes = useStyles();
  const [age, setAge] = React.useState("Select");
  const [openUser, setOpenUser] = React.useState(false);
  const [openCreated, setOpenCreated] = React.useState(false);

  const handleChange = event => {
    setAge(event.target.value);
  };

  const exampleData = [
    {
      user: "Tony",
      id: "1",
      created: "August 18, 2019",
      time: "13:12:37",
      changes:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem vitae dicta sunt…"
    },
    {
      user: "Tony",
      id: "2",
      created: "August 18, 2019",
      time: "13:12:37",
      changes:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem vitae dicta sunt…"
    },
    {
      user: "Tony",
      id: "3",
      created: "August 18, 2019",
      time: "13:12:37",
      changes:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem vitae dicta sunt…"
    },
    {
      user: "Tony",
      id: "4",
      created: "August 18, 2019",
      time: "13:12:37",
      changes:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem vitae dicta sunt…"
    },
    {
      user: "Tony",
      id: "5",
      created: "August 18, 2019",
      time: "13:12:37",
      changes:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem vitae dicta sunt…"
    },
    {
      user: "Tony",
      id: "6",
      created: "August 18, 2019",
      time: "13:12:37",
      changes:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem vitae dicta sunt…"
    }
  ];

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <CssTextField
            id="standard-full-width"
            placeholder="Search"
            fullWidth
            margin="normal"
            style={{ fontSize: 50, padding: "5px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon style={{ color: "#bbb" }} fontSize="small" />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="demo-controlled-open-select">User</InputLabel>
            <Select
              style={{ width: 300, marginRight: 30 }}
              open={openUser}
              onClose={() => {
                setOpenUser(false);
              }}
              onOpen={() => {
                setOpenUser(true);
              }}
              value={age}
              onChange={handleChange}
              inputProps={{
                name: "age",
                id: "demo-controlled-open-select"
              }}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value={20}>Sample 1</MenuItem>
              <MenuItem value={30}>Sample 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="demo-controlled-open-select">
              Created
            </InputLabel>
            <Select
              style={{ width: 300 }}
              open={openCreated}
              onClose={() => {
                setOpenCreated(false);
              }}
              onOpen={() => {
                setOpenCreated(true);
              }}
              value={age}
              onChange={handleChange}
              inputProps={{
                name: "age",
                id: "demo-controlled-open-select"
              }}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value={20}>Sample 1</MenuItem>
              <MenuItem value={30}>Sample 2</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            size="medium"
            style={{
              width: "200px",
              float: "right",
              background: "#7c8a97",
              color: "white"
            }}
          >
            APPLY
          </Button>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <AsyncTable
            // loading={false}
            // Loader={CustomLoader}
            headers={["User", "Created", "Time", "Changes", ""]}
            tableData={exampleData}
            render={(examples, { row, cell }) => {
              return examples.map(example => (
                <TableRow className={row} key={example.id}>
                  <TableCell
                    style={{ fontSize: 15, color: "#777777" }}
                    className={cell}
                  >
                    {example.user}
                  </TableCell>
                  <TableCell
                    style={{ fontSize: 15, color: "#777777" }}
                    className={cell}
                  >
                    {example.created}
                  </TableCell>
                  <TableCell
                    style={{ fontSize: 15, color: "#777777" }}
                    className={cell}
                  >
                    {example.time}
                  </TableCell>
                  <TableCell
                    width="20%"
                    style={{ fontSize: 15, color: "#777777" }}
                    className={cell}
                  >
                    {example.changes}
                  </TableCell>
                  <UnderlineCell
                    style={{ fontSize: 15, color: "#777777", float: "right" }}
                    className={cell}
                  >
                    Details
                  </UnderlineCell>
                </TableRow>
              ));
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
