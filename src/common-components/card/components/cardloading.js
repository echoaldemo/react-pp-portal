import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
class cardloading extends Component {
  render() {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
}

export { cardloading };
