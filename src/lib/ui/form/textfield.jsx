import React from "react";
import Field from "./field";

class TextField extends Field {

  render() {
    const style = { width: (this.props.width - this.props.titleWidth) + "px" };

    let field = (
      <input
        style = { style }
        type  = "text"
        name  = { this.props.name }
        ref   = { field => this.field = field } />
    );

    return super.render(field);
  }
}

export default TextField;
