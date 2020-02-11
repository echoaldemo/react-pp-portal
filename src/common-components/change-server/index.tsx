import React from "react";
import { Grid, MenuItem, Select } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import "./index.css";
interface ChangeServerProps {
  selected: string;
  options: Array<{ uuid: string; name: string }>;
  onChangeFn: Function;
}

const ChangeServer: React.FC<ChangeServerProps> = ({
  selected,
  options,
  onChangeFn
}) => {
  return (
    <Grid
      container
      spacing={2}
      style={{
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      <Grid item>
        <span className="container-text">Change Server: </span>
      </Grid>
      <Grid item>
        <Select
          className="input-field"
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
  );
};

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
