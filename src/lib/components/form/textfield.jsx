import React from "react";
import Field from "./field";

class TextField extends Field {

  handlerChange(e) {
    let event = new CustomEvent("update");

    this.field.dispatchEvent(event);
  }

  render() {
    const style = { width: (this.props.width - this.props.titleWidth) + "px" };

    let field = (
      <input
        style    = { style }
        type     = "text"
        name     = { this.props.name }
        ref      = { field => this.field = field }
        onChange = { this.handlerChange.bind(this) } />
    );

    return super.render(field);
  }
}

export default TextField;
