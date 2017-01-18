import React from "react";
import Field from "./field";

class Combobox extends Field {

  constructor(props) {
    super(props);
    this.state = { json: [] };
  }

  insertDefault(values) {
    values = [].slice.call(values);

    let _default = {};
    _default[this.props.idValue]   = 0;
    _default[this.props.textValue] = "Seleccione";

    values.unshift(_default);

    return values;
  }

  static async updateCombobox(k, json, field, form) {
    let c      = field.component;
    let router = field.parentNode.querySelector(".router");
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

  handlerAction(json) {
    this.field.value = "";
    this.setState({ json: json });
  }

  handlerChange(e) {
    let event = new CustomEvent("update",
      {
        detail: {}
      }
    );

    e.target.dispatchEvent(event);
  }

  render() {
    let router =  null;

    React.Children.map(this.props.children, (c) => {
      if (c.type.name === "Router") {
        router = React.cloneElement(c, { handlerAction: this.handlerAction.bind(this) });
      }
    });

    const style  = {width: (this.props.width - this.props.titleWidth) + "px"};
    const values = this.insertDefault(this.state.json);

    const field = (
      <div>
        <select
          style    = { style }
          name     = { this.props.name }
          ref      = { field => this.field = field }
          onChange = { this.handlerChange.bind(this) } >
          { values.map((o, i) => {
            return <option key={i} value={ o[this.props.idValue] }>{ o[this.props.textValue] }</option>
          }) }
        </select>
        { router && router }
      </div>
    );

    return super.render(field);
  }
}

export default Combobox;
