import React from "react";
import Field from "./field";
import Form  from "./form";

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

    if (field.classList.contains("combobox")) {
      field.value = json[`${c.props.name}.${c.props.textValue}`];
    } else {
      field.value = value;
    }

    if (!router || !router.component.props.filterBy) {
      return;
    }

    let cbx       = form.querySelector(`*[name=${router.component.props.filterBy}]`);
    let cbx_value = json[`${c.props.name}.${cbx.component.props.name}.${cbx.component.props.idValue}`];

    if (cbx.classList.contains("combobox")) {
      cbx.value = json[`${c.props.name}.${cbx.component.props.name}.${cbx.component.props.textValue}`];
    } else {
      cbx.value = cbx_value;
    }

    let data = await router.component.getData({ id: [cbx_value] })
    router.component.setState({ json: data });

    if (field.classList.contains("combobox")) {
      field.value = json[`${c.props.name}.${c.props.textValue}`];
    } else {
      field.value = value;
    }
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

    const style  = {width: (this.props.width - this.props.titleWidth - 5) + "px"};
    const values = this.insertDefault(this.state.json);

    const select = (
      <select
        style    = { style }
        name     = { this.props.name }
        ref      = { field => this.field = field }
        onChange = { this.handlerChange.bind(this) } >
        { values.map((o, i) => {
          return <option key={i} value={ o[this.props.idValue] }>{ o[this.props.textValue] }</option>
        }) }
      </select>
    );

    const input = (
      <input
        type      = "text"
        className = "combobox"
        style     = { style }
        name      = { this.props.name }
        ref       = { field => this.field = field }
        readOnly  = { true } />
    );

    const field = (
      <div>
        { this.props.mode === Form.ModeType.VIEW && input  }
        { this.props.mode !== Form.ModeType.VIEW && select }
        { router && router }
      </div>
    );

    return super.render(field);
  }
}

export default Combobox;
