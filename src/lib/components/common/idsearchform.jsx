import React        from "react";
import ReactDOM     from "react-dom";
import Message      from "../message";
import * as LibForm from "../form";
import keyMirror    from "keymirror";

const Form      = LibForm.Form;
const Row       = LibForm.Row;
const Button    = LibForm.Button;
const TextField = LibForm.TextField;

const METHOD = keyMirror({ NEW: null, VIEW: null, EDIT: null });

class IdSearchForm extends Form {

  static method = METHOD

  launchEvent(name, params={}) {
    const event = new CustomEvent(name,
      {
        detail: params
      }
    );

    this.form.dispatchEvent(event);
  }

  handlerNew() {
    this.launchEvent(METHOD.NEW);
  }

  handlerView() {
    if (!this.isValid) {
      Message.showMessage("Debe ingresar un ID");
      return;
    }

    this.launchEvent(METHOD.VIEW, { id: this.idField.value });
  }

  handlerEdit() {
    if (!this.isValid) {
      Message.showMessage("Debe ingresar un ID");
      return;
    }

    this.launchEvent(METHOD.EDIT, { id: this.idField.value })
  }

  /**
   * Override function handlerSubmit
   */
  handlerSubmit = this.handlerView

  render(children=this.props.children) {
    return super.render(
      <Row>
        <Button
          text         = "Nuevo"
          width        = "auto"
          handlerClick = { this.handlerNew.bind(this) }
        />
        <TextField
          ref        = { f => this.idField = f }
          title      = "Id"
          titleWidth = "15"
          name       = "id"
          width      = "auto"
          required   = {true}
        />
        <Button
          text         = "Ver"
          width        = "auto"
          handlerClick = { this.handlerView.bind(this) }
        />
        <Button
          text         = "Editar"
          width        = "auto"
          handlerClick = { this.handlerEdit.bind(this) }
        />
      </Row>
    );
  }
}

export default IdSearchForm;
