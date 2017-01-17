import React from "react";
import Field from "./field";

class TextAreaField extends Field {

  render() {
    const style = {
      width:  (this.props.width - this.props.titleWidth) + "px",
      height: this.props.height + "px", resize: "none"
    }

    let field = (
      <textarea
        style = { style }
        name  = { this.props.name }
        ref   = { field => this.field = field }></textarea>
    );

    return super.render(field);
  }
}

export default TextAreaField;
