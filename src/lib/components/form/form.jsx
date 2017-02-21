import React    from "react";
import Combobox from "./combobox";
import Row      from "./row";
import Button   from "./button";
import Message  from "../message";

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
    width: 0
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

  isArray(o) {
    const types = 'Array Object String Date Function Boolean Number Null Undefined'.split(' ');

    const type = function() {
      return Object.prototype.toString.call(this).slice(8, -1);
    }

    return types[0] === type.call(o);
  }

  setData(json={}) {
    json = this.isArray(json) ? json[0] : json;

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

  componentDidMount() {
    this.setState({ width: this.form.clientWidth });
  }

  get isValid() {
    return this.form.checkValidity();
  }

  fetchById(filter) {
    const router = this.form.querySelector(".router");
    return router.component.fetchById(filter);
  }

  handlerSubmit(e) {
    this.props.handlerSubmit(e);
    e && e.preventDefault();
    return false;
  }

  handlerSave(e) {
    if (!this.isValid) {
      Message.showMessage("Falta completar información");
      return;
    }

    let fd = new FormData(this.form);

    [].slice.call(this.form.querySelectorAll("input[type=checkbox]")).forEach(e => {
      fd.set(e.name, fd.has(e.name));
    });

    // Comboboxs
    [].slice.call(this.form.querySelectorAll("select")).forEach(e => {
      fd.append(e.component.props.idValue, fd.get(e.name));
      fd.delete(e.name);
    });

    let data = {};
    for (let [k, v] of fd.entries()) {
      data[k] = v;
    }

    const router = this.form.querySelector(".router");

    if (this.props.mode === Form.ModeType.NEW) {
      router.component.create(data).then(json => {
        Message.showMessage("Registro creado");
      });
    }

    if (this.props.mode === Form.ModeType.EDIT) {
      let id = data[this.props.fieldKey];
      delete data[this.props.fieldKey];

      router.component.patch({ id: [id] }, data).then(json => {
        Message.showMessage("Registro actualizado");
      });
    }
  }

  render() {
    let hasRouter = false;

    let children = React.Children.map(this.props.children, (c) => {
      if (c.type.name === "Router") {
        hasRouter = true;
        return React.cloneElement(c, { handlerAction: this.setData.bind(this) });
      }

      return c;
    });

    if (hasRouter && this.props.mode !== Form.ModeType.VIEW) {
      children.push(
        <Row>
          <Button
            text         = "Guardar"
            width        = "auto"
            handlerClick = { this.handlerSave.bind(this) }
            />
        </Row>
      );
    }

    const width = this.state.width;

    return (
      <form autoComplete="off"
        name = { this.props.name }
        ref  = { form => this.form = form }
        onSubmit = { this.handlerSubmit.bind(this) }
      >
        { React.Children.map(children, c => React.cloneElement(c,
          {
            width: width ,
            mode:  this.props.mode
          })) }
      </form>
    );
  }
}

export default Form;
