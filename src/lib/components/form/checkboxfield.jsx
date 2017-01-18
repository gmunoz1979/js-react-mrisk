import React from "react";
import Field from "./field";

class CheckboxField extends Field {

  render() {
    const field = (
      <div>
        <input
          type = "checkbox"
          name = { this.props.name }
          ref  = { field => this.field = field } />
        <label>
          {this.props.text}
        </label>
      </div>
    );

    return super.render(field);
  }
}

export default CheckboxField;
