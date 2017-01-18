import React from "react";
import Field from "./field";

class Combobox extends Field {

  constructor(props) {
    super(props);
    this.state = { json: [] };
  }

  updateValues(values) {
    let value = {};
    value[this.props.idValue]   = 0;
    value[this.props.textValue] = "Seleccione"

    values.unshift(value);

    return values;
  }

  componentDidMount() {
    super.componentDidMount();

    if (!this.props.filterBy) {
      return;
    }

    let field = this.field.closest("form").querySelector(`*[name="${this.props.filterBy}"]`);

    // field.addEventListener("change", e => {
    //   this.field.value = "";
    //   this.getData({ id: [e.currentTarget.value] });
    // });
  }

  render() {
    const style = {width: (this.props.width - this.props.titleWidth) + "px"};

    let field = (
      <select
        style = { style }
        name  = { this.props.name }
        ref   = { field => this.field = field }
      >
        {this.updateValues(this.props.json).map((o, i) => { return (
            <option key={i} value={ o[this.props.idValue]}>
              { o[this.props.textValue] }
            </option>
          );
        })}
      </select>
    );

    return super.render(field);
  }
}

Combobox.defaultProps = {
  json: []
};

export default Combobox;