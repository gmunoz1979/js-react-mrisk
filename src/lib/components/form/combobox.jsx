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

  static async updateCombobox(k, json, field, form) {
    let c      = field.component;
    let router = field.closest(".router");
    let value  = json[`${c.props.name}.${c.props.idValue}`];
    field.value = value;

    if (!router || !router.component.props.filterBy) {
      return;
    }

    let cbx       = form.querySelector(`*[name=${router.component.props.filterBy}]`);
    let cbx_value = json[`${c.props.name}.${cbx.component.props.name}.${cbx.component.props.idValue}`];
    cbx.value = cbx_value;
    let data = await router.component.getData({ id: [cbx_value] })
    router.component.setState({ json: data });

    field.value = value;
  }

  render() {
    const style = {width: (this.props.width - this.props.titleWidth) + "px"};

    const field = (
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
