import React from "react";

class Form extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      width: 0
    }
  }

  getFields(json) {
    let fields = {};

    for (let [k, v] of Object.entries(json)) {
      if (/\./g.exec(k)) {
        continue;
      }

      fields[k] = this.form.querySelector(`*[name=${k}]`);
    }

    return fields;
  }

  async updateCombobox(k, json, field) {
    let c     = field.component;
    let value = json[k][c.props.idValue];
    field.value = value;

    if (!c.props.filterBy) {
      return;
    }


    let cbx = this.form.querySelector(`*[name=${c.props.filterBy}]`);
    let cbx_obj   = json[k][cbx.component.props.name];
    let cbx_value = cbx_obj[cbx.component.props.idValue];
    cbx.value = cbx_value;

    await c.getData({ id: [cbx_value] });
    field.value = value;
  }

  get idValue() {
    return !this.json ? null : this.json[this.props.fieldKey];
  }

  setData(json={}) {
    for (let [k, field] of Object.entries(this.getFields(json))) {
      if (field) {
        if (field.nodeName === "SELECT") {
          this.updateCombobox(k, json, field);
          continue;
        }
        if (field.type === "checkbox") {
          field.checked = json[k];
          continue;
        }

        field.value = json[k];
      }
    }

    this.json = json;
    this.form.value = this.idValue;

    let event = new CustomEvent("update",
      {
        detail: {}
      }
    );

    this.form.dispatchEvent(event);
  }

  componentDidMount() {
    this.form.component = this;

    this.setState({ width: this.form.clientWidth });

    if (!this.props.fieldKey) {
      return;
    }

    let field = this.form.querySelector(`*[name=${this.props.fieldKey}]`);
    field.addEventListener("change", e => this.getData({ id: [ e.currentTarget.value] }).then(json => this.setData(json)));
  }

  render() {
    const width = this.state.width;

    return (
      <form autoComplete="off"
        name = { this.props.name }
        ref  = { form => {this.form = form;} }
      >
        { React.Children.map(this.props.children, c => React.cloneElement(c, { width: width })) }
      </form>
    );
  }
}

export default Form;
