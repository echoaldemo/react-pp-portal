import React, { Component } from "react";

class CardNoResult extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: 500,
          alignItems: "center",
          backgroundColor: "#fafafa"
        }}
      >
        <span style={{ color: "#888", fontSize: 17 }}> {this.props.text} </span>
      </div>
    );
  }
}

export { CardNoResult };
