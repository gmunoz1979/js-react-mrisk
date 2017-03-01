import React from "react";
import Field from "./field";
import Form  from "./form";

class CheckboxField extends Field {

  static defaultProps = Object.assign({}, Field.defaultProps,
    {
      width:      80,
      titleWidth: 0
    }
  )

  render() {
    const field = (
      <div>
        <input
          id            = { this.props.id }
          className     = "field"
          type          = "checkbox"
          name          = { this.props.name }
          ref           = { field => this.field = field }
          disabled      = { this.props.readOnly || this.props.modeReadOnly }
          required      = { this.props.required } />
        <label htmlFor= { this.props.id } >
          {this.props.text}
        </label>
      </div>
    );

    return super.render(field);
  }
}

export default CheckboxField;
