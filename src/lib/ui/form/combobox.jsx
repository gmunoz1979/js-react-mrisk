import React from "react";
import Field from "./field";

class Combobox extends Field {

  constructor(props) {
    super(props);
    this.state = { options: [] };
  }

  updateValues(values) {
    let value = {};
    value[this.props.idValue]   = 0;
    value[this.props.textValue] = "Seleccione"

    values.unshift(value);

    this.setState({ options: values });
  }

  componentDidMount() {
    if (this.props.filterBy) {
      let field = this._field.closest("form").querySelector(`*[name="${this.props.filterBy}"]`);

      field.addEventListener("change", e => {
        this._field.value = "";
        this.getData({ id: [e.currentTarget.value] });
      });
    }
  }

  render() {
    let width = this.props.width - this.props.titleWidth;

    return (
      <div style = {{ width: this.props.width + "px" }}>
        <label
          style = {{ width: this.props.titleWidth + "px" }}>
          {this.props.title}
        </label>
        <select
          ref      = {(field) => {this._field=field; }}
          style    = {{ width: width + "px" }}
          name     = {this.props.name} >
          {this.state.options.map((o, i) => { return (
              <option key={i} value={o[this.props.idValue]}>{o[this.props.textValue]}</option>
            );
          })}
        </select>
      </div>
    );
  }
}

Combobox.defaultProps = {
  handlerChange: function() {}
}

export default Combobox;
