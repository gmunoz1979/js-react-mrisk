import React    from "react";
import ReactDOM from "react-dom";
import * as Lib from "../../lib/components";

const Namespace = Lib.Namespace;
const Table     = Lib.Table;
const Column    = Lib.Column;
const Panel     = Lib.Panel;
const Message   = Lib.Message;
const Relation  = Lib.Relation;

const Form          = Lib.Form.Form;
const ModeForm      = Lib.Form.ModeForm;
const Row           = Lib.Form.Row;
const Button        = Lib.Form.Button;
const TextField     = Lib.Form.TextField;
const Empty         = Lib.Form.Empty;
const Combobox      = Lib.Form.Combobox;
const TextAreaField = Lib.Form.TextAreaField;
const CheckboxField = Lib.Form.CheckboxField;

const IdSearchForm = Lib.Common.IdSearchForm;
const StorableForm = Lib.Common.StorableForm;

class App extends React.Component {

  static create() {
    const app = document.createElement("div");
    app.id = "app1";
    document.body.appendChild(app);
    ReactDOM.render(<App></App>, app);
  }

  render() {
    const search = (
      <IdSearchForm name="search" />
    );

    const form = (
      <StorableForm
        name      = "form"
        namespace = "Nivel1"
      >
        <ModeForm mode= {ModeForm.VIEW} />
        <Relation with = "search" />
        <Row>
          <TextField
            title      = "Id"
            titleWidth = "80"
            name       = "niv1_id"
            width      = "150"
            readOnly   = {true}
          />
        </Row>
        <Row>
          <Combobox
            title      = "Tipo"
            titleWidth = "80"
            width      = "auto"
            name       = "tipo_id"
            idValue    = "tipo_id"
            textValue  = "name" >
            <Namespace
              path = "Nivel1/Tipo" />
          </Combobox>
          <Combobox
            title      = "Sub tipo"
            titleWidth = "80"
            width      = "200"
            name       = "subt_id"
            idValue    = "subt_id"
            textValue  = "name">
            <Relation with = "tipo_id" />
            <Namespace
              path = "Nivel1/SubTipo" />
          </Combobox>
        </Row>
        <Row>
          <TextField
            title      = "Nombre"
            titleWidth = "80"
            name       = "name"
            width      = "auto"
            required   = {true}
          />
        </Row>
        <Row>
          <TextAreaField
            title      = "Descripcion"
            titleWidth = "80"
            name       = "description"
            width      = "auto"
            height     = "100"
          />
        </Row>
        <Row>
          <CheckboxField
            name    = "a_bool"
            text    = "A Bool"
            checked = {false}
            widht   = "100"
          />
          <Empty
            width   = "auto"
          />
        </Row>
      </StorableForm>
    );

    return (
      <div className="app container">
        <div className="app1">
          <span className="title">Ejemplo 1</span>
          <Panel
            width  = "500"
            height = "40">
            {search}
          </Panel>
          <Panel
          width  = "500"
          height = "275">
            {form}
          </Panel>
        </div>

      </div>
    );
  }
}

export default App;
