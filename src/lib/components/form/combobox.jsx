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
    const isView = field.classList.contains("combobox");
    const c = field.component;
    const p = c.props;
    const path = `${p.name}.${isView ? p.textValue : p.idValue}`;

    field.value = json[path];

    const router = field.parentNode.querySelector(".router");

    if (!router || !router.component.props.filterBy) {
      return;
    }

    const cbx        = form.querySelector(`*[name=${router.component.props.filterBy}]`);
    const cbx_isView = cbx.classList.contains("combobox");
    const cbx_p      = cbx.component.props;
    const cbx_path   = `${p.name}.${cbx_p.name}.${cbx_isView ? cbx_p.textValue : cbx_p.idValue}`

    cbx.value = json[cbx_path];

    if (!cbx_isView) {
      let data = await router.component.getData({ id: [cbx.value] })
      router.component.setState({ json: data });

      field.value = json[path];
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
        let props = { handlerAction: this.handlerAction.bind(this) };

        if (this.props.mode === Form.ModeType.VIEW) {
          props.autoRouter = false;
        }

        router = React.cloneElement(c, props);
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
