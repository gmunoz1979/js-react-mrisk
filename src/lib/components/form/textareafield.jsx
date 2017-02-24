import React from "react";
import Form  from "./form";
import Field from "./field";

class TextAreaField extends Field {

  render() {
    const style = {
      width:  (this.props.width - this.props.titleWidth - 5) + "px",
      height: this.props.height + "px", resize: "none"
    }

    let field = (
      <textarea
        style    = { style }
        name     = { this.props.name }
        ref      = { field => this.field = field }
        required = { this.props.required } ></textarea>
    );

    return super.render(field);
  }
}

export default TextAreaField;
