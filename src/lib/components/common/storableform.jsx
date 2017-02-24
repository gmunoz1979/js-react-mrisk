import React         from "react";
import Message       from "../message";
import FetchableForm from "./fetchableform";
import Row           from "../form/row";
import Button        from "../form/button";
import Form          from "../form/form";
import Util          from "../../util";

class StorableForm extends FetchableForm {

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

    const namespace = Util.findReact(this.form.querySelector(".namespace"));

  //   if (this.state.mode === Form.ModeType.NEW) {
  //     namespace.create(data).then(json => {
  //       Message.showMessage("Registro creado");
  //     });
  //   }
  //
  //   if (this.state.mode === Form.ModeType.EDIT) {
  //     let id = data[this.props.fieldKey];
  //     delete data[this.props.fieldKey];
  //
  //     namespace.patch({ id: [id] }, data).then(json => {
  //       Message.showMessage("Registro actualizado");
  //     });
  //   }
  }

  render(children=this.props.children) {
    children = React.Children.toArray(children);

    children.push(
      <Row>
        <Button
          text         = "Guardar"
          width        = "auto"
          handlerClick = { this.handlerSave.bind(this) }
          />
      </Row>
    );

    return super.render(children);
  }
}

export default StorableForm;
