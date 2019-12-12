import React from "react";
import {
  Grid,
  Typography,
  MenuItem,
  Select
} from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import { ThemeProvider } from "@material-ui/styles";
import {useStyles, materialTheme} from './style'

interface ChangeServerProps {
  selected: string
  options: Array<{ uuid: string, name: string }>
  onChangeFn: Function
}

const ChangeServer: React.FC<ChangeServerProps> = ({ selected, options, onChangeFn }) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={materialTheme}>
      <div>
        <Grid container spacing={2}>
          <Grid item className={classes.middle}>
            <Typography classes={{ root: classes.text }}>
              Change Server:
            </Typography>
          </Grid>
          <Grid item className={classes.middle}>
            <Select
              className={classes.border}
              IconComponent={() => <KeyboardArrowDown htmlColor="#444851" />}
              value={selected}
              onChange={e => onChangeFn(e.target.value)}
            >
              {options.map(opt => (
                <MenuItem key={opt.uuid} value={opt.uuid}>
                  {opt.name} Server
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

ChangeServer.defaultProps = {
  selected: "2",
  options: [
    {
      name: "Test1",
      uuid: "1"
    },
    {
      name: "Test2",
      uuid: "2"
    }
  ]
} as Partial<ChangeServerProps>;


export { ChangeServer };