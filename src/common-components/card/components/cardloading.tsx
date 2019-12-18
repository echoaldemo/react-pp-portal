import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
class CardLoading extends Component {
  render() {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
}

export { CardLoading };
