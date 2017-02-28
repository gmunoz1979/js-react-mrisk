import React    from "react";
import Combobox from "./combobox";
import Util     from "../../util";

class Form extends React.Component {

  static defaultProps = {
    handlerSubmit: function() {}
  }

  state = { width: 0 }

  clear() {
    this.form.reset();
  }

  getFields(json) {
    let fields = {};

    let targets = [].slice.call(this.form.querySelectorAll(".field"));
    targets.forEach(t =>
      {
        let component = Util.findReact(t);
        fields[component.props.name] = component;
      }
    );

    return fields;
  }

  get isValue() {
    return !this.json ? null : this.json[this.props.fieldKey];
  }

  launchEvent() {
    let event = new CustomEvent("update", { detail: {} });
    this.form.dispatchEvent(event);
  }

  setData(json={}) {
    json = Util.isArray(json) ? json[0] : json;

    for (let [k, field] of Object.entries(this.getFields(json))) {
      if (field) {
        let name = field instanceof Combobox ? field.props.idValue : field.props.name;

        if (field.props.object.length !== 0) {
          name = field.props.object + "." + name;
        }

        if (json[name] !== undefined) {
          field.json  = json; // Guardamos por completo los datos.
          field.value = json[name];
        }
      }
    }

    this.json = json;
    this.form.value = this.idValue;

    this.launchEvent("update");
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
            width: width
          })) }
      </form>
    );
  }
}

export default Form;
