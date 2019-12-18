import React, { Component } from "react";

interface Props {
  text: string;
}

class CardNoResult extends Component<Props> {
  render() {
    const { text } = this.props;
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
        <span style={{ color: "#888", fontSize: 17 }}> {text} </span>
      </div>
    );
  }
}

export { CardNoResult };
