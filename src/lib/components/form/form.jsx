import React    from "react";
import Combobox from "./combobox";
import Row      from "./row";
import Button   from "./button";

const ModeType = {
  NEW:  0,
  EDIT: 1,
  VIEW: 2
}

class Form extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      width: 0
    }
  }

  static get ModeType() {
    return ModeType;
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

  get idValue() {
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

  componentDidMount() {
    this.form.component = this;

    this.setState({ width: this.form.clientWidth });

    if (!this.props.fieldKey) {
      return;
    }
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
    let fd = new FormData(this.form);

    [].slice.call(this.form.querySelectorAll("input[type=checkbox]")).forEach(e => {
      fd.set(e.name, fd.has(e.name));
    });

    let data = {};
    for (let [k, v] of fd.entries()) {
      data[k] = v;
    }

    const router = this.form.querySelector(".router");
    return router.component.create(data);
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

    const saveButton = (
      <Row>
        <Button text="Guardar" width="auto" handlerClick={this.handlerSave.bind()}></Button>
      </Row>
    )

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

Form.defaultProps = {
  mode:          Form.ModeType.NEW,
  handlerSubmit: function() {}
};

export default Form;
