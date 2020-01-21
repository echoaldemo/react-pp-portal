import React, { Component } from "react";
import { MenuItem } from "@material-ui/core";
import { NewTextField } from "./styles";

interface Props {
  data: any;
}

export default class Select extends Component<Props> {
  render() {
    return (
      <NewTextField
        select
        name={this.props.data.name}
        onChange={this.props.data.onChange}
        value={this.props.data.value}
        label={this.props.data.label}
        margin="normal"
      >
        {this.props.data.name === "currentVersion"
          ? this.props.data.data.map((item: any) => (
              <MenuItem key={item.version} value={item.uuid}>
                {item.uuid === this.props.data.latest
                  ? `${item.version} (Latest Version)`
                  : item.version}
              </MenuItem>
            ))
          : this.props.data.data.map((item: any) => (
              <MenuItem key={item} value={item}>
                {typeof item === "string"
                  ? item.charAt(0).toUpperCase() + item.slice(1)
                  : `${item}px`}
              </MenuItem>
            ))}
      </NewTextField>
    );
  }
}
