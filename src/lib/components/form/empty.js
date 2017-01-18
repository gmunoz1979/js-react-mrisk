import React from "react";
import Field from "./field";

class Empty extends Field {

  render() {
    return (
      <div
        style     = {{ width: this.props.width + "px" }}
        className = "empty"
        ref       = { field => this.field = field }
      ></div>
    );
  }
}

export default Empty;
