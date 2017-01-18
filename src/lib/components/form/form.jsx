import React    from "react";
import Combobox from "./combobox";

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
        k = k.split(/\./)[0];
      }

      fields[k] = this.form.querySelector(`*[name=${k}]`);
    }

    return fields;
  }

  get idValue() {
    return !this.json ? null : this.json[this.props.fieldKey];
  }

  setData(json={}) {
    for (let [k, field] of Object.entries(this.getFields(json))) {
      if (field) {
        if (field.nodeName === "SELECT") {
          Combobox.updateCombobox(k, json, field, this.form);
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

  handlerAction(json) {
    this.setData(json[0]);
  }

  render() {
    const children = React.Children.map(this.props.children, (c) => {
      if (c.type.name === "Router") {
        return React.cloneElement(c, { handlerAction: this.handlerAction.bind(this) });
      }

      return c;
    });

    const width = this.state.width;

    return (
      <form autoComplete="off"
        name = { this.props.name }
        ref  = { form => {this.form = form;} }
      >
        { React.Children.map(children, c => React.cloneElement(c, { width: width })) }
      </form>
    );
  }
}

export default Form;
