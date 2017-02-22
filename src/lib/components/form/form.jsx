import React    from "react";
import Combobox from "./combobox";
import Util     from "../../util";

class Form extends React.Component {

  static ModeType = {
    NEW:  0,
    EDIT: 1,
    VIEW: 2
  }

  static defaultProps = {
    mode:          Form.ModeType.NEW,
    handlerSubmit: function() {}
  };

  state = {
    width: 0,
    mode:  null
  }

  clear() {
    this.form.reset();
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

  get isValue() {
    return !this.json ? null : this.json[this.props.fieldKey];
  }

  setData(json={}) {
    json = Util.isArray(json) ? json[0] : json;

    for (let [k, field] of Object.entries(this.getFields(json))) {
      if (field) {
        if (field.nodeName === "SELECT" || field.classList.contains("combobox")) {
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

  set form(value) {
    value = value || {};
    value.component = this;
    this._form = value;
  }

  get form() {
    return this._form;
  }

  componentWillMount() {
    this.setState({ mode: this.props.mode });
  }

  componentDidMount() {
    this.setState({ width: this.form.clientWidth });
  }

  get isValid() {
    return this.form.checkValidity();
  }

  handlerSubmit(e) {
    this.props.handlerSubmit(e);
    e && e.preventDefault();
    return false;
  }

  render(children=this.props.children) {
    const width = this.state.width;

    return (
      <form autoComplete="off"
        name     = { this.props.name }
        ref      = { form => this.form = form }
        onSubmit = { this.handlerSubmit.bind(this) }
      >
        { React.Children.map(children, c => React.cloneElement(c,
          {
            width: width,
            mode:  this.state.mode
          })) }
      </form>
    );
  }
}

export default Form;
