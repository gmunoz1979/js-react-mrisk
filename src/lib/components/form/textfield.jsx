import React from "react";
import Form  from "./form";
import Field from "./field";

class TextField extends Field {

  render() {
    const style = { width: (this.props.width - this.props.titleWidth - 5) + "px" };

    let field = (
      <input
        style    = { style }
        type     = "text"
        name     = { this.props.name }
        ref      = { field => this.field = field }
        readOnly = { this.props.readOnly }
        required = { this.props.required } />
    );

    return super.render(field);
  }
}

export default TextField;
