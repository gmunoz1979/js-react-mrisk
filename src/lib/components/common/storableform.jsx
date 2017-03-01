import React         from "react";
import Message       from "../message";
import FetchableForm from "./fetchableform";
import Row           from "../form/row";
import Button        from "../form/button";
import Form          from "../form/form";
import ModeForm      from "../form/modeform";
import Util          from "../../util";

class StorableForm extends FetchableForm {

  static MODE = ModeForm.MODE

  static defaultProps = {
    mode: ModeForm.MODE.NEW
  }

  state = {
    mode: this.props.mode
  }

  changeMode(mode) {
    this.setState({ mode: mode });
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

    let data = {};
    for (let [k, v] of fd.entries()) {
      data[k] = v;
    }

    /**
     * Buscamos el array de ids
     */
    const ids = [].slice.call(this.form.querySelectorAll("[data-is-id='1']")).map(i => i.name);

    this.state.mode === ModeForm.MODE.NEW &&  this.create(data,ids);
    this.state.mode === ModeForm.MODE.EDIT && this.patch(data, ids)
  }

  // Nuevo
  async create(data, ids) {
    const namespace = Util.findReact(this.form.querySelector(".namespace"));
    const json = await namespace.create(data);

    Message.showMessage("Registro creado");
  }

  // Actualizar
  async patch(data, ids) {
    let ids_value = [];
    for (let [k,v] of Object.entries(data)) {
      if (ids.indexOf(k) !== -1) {
        ids_value.push(v);
        delete data[k];
      }
    }

    const namespace = Util.findReact(this.form.querySelector(".namespace"));
    const json = await namespace.patch({ id: ids_value }, data)

    Message.showMessage("Registro actualizado");
  }

  // Eliminar
  destroy(data) {
    const namespace = Util.findReact(this.form.querySelector(".namespace"));
  }

  render(children=this.props.children) {
    children = React.Children.toArray(ModeForm.overrideFields(this.state.mode, children));

    if (this.state.mode !== ModeForm.MODE.VIEW) {
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

    return super.render(children);
  }
}

export default StorableForm;
