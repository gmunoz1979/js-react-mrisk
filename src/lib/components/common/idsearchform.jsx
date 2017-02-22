import React        from "react";
import ReactDOM     from "react-dom";
import Message      from "../message";
import * as LibForm from "../form";

const Form      = LibForm.Form;
const Row       = LibForm.Row;
const Button    = LibForm.Button;
const TextField = LibForm.TextField;

class IdSearchForm extends React.Component {

  launchEvent(name, params={}) {
    const event = new CustomEvent(name,
      {
        detail: params
      }
    );

    const form = ReactDOM.findDOMNode(this.form);
    form.dispatchEvent(event);
  }

  handlerNew() {
    this.launchEvent("new");
  }

  handlerView() {
    if (!this.form.isValid) {
      Message.showMessage("Debe ingresar un ID");
      return;
    }

    this.launchEvent("view", { id: this.idField.value });
  }

  handlerEdit() {
    if (!this.form.isValid) {
      Message.showMessage("Debe ingresar un ID");
      return;
    }

    this.launchEvent("edit", { id: this.idField.value })
  }

  render() {
    return (
      <Form
        ref           = { f => this.form = f }
        name          = { this.props.name }
        handlerSubmit = { this.handlerView.bind(this) }
      >
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
      </Form>
    );
  }
}

export default IdSearchForm;
