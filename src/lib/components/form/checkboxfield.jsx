import React from "react";
import Field from "./field";
import Form  from "./form";

class CheckboxField extends Field {

  render() {
    const field = (
      <div>
        <input
          type = "checkbox"
          name = { this.props.name }
          ref  = { field => this.field = field }
          disabled = { this.props.readOnly }
          required = { this.props.required } />
        <label>
          {this.props.text}
        </label>
      </div>
    );

    return super.render(field);
  }
}

export default CheckboxField;
