import React         from "react";
import Panel         from "../../lib/ui/panel";
import Form          from "../../lib/ui/form/form";
import Row           from "../../lib/ui/form/row";
import Combobox      from "../../lib/ui/form/combobox";
import TextField     from "../../lib/ui/form/textfield";
import TextAreaField from "../../lib/ui/form/textareafield";
import CheckboxField from "../../lib/ui/form/checkboxfield";

class App1 extends React.Component {

  render() {
    return (
      <div className="app1">
        <span className="title">Ejemplo 1</span>
        <Panel
          width  = "500"
          height = "250"
          >
          <Form>
            <Row>
              <TextField
                title      = "Id"
                titleWidth = "80"
                name       = "id"
                width      = "250"
              />
            </Row>
            <Row>
              <Combobox
                title      = "Tipo"
                titleWidth = "80"
                name       = "tipo"
                width      = "auto"
                namespace  = "Nivel1/Tipo"
                idValue    = "fold_id"
                textValue  = "name"
              />
              <Combobox
                title      = "Sub tipo"
                titleWidth = "80"
                name       = "subtipo"
                width      = "200"
                namespace  = "Nivel1/SubTipo"
                idValue    = "fold_id"
                textValue  = "name"
              />
            </Row>
            <Row>
              <TextField
                title      = "Nombre"
                titleWidth = "80"
                name       = "nombre"
                width      = "auto"
              />
            </Row>
            <Row>
              <TextAreaField
                title      = "Descripcion"
                titleWidth = "80"
                name       = "descripcion"
                width      = "auto"
                height     = "100"
              />
            </Row>
            <Row>
              <CheckboxField
                text    = "A Bool"
                checked = "false"
                widht   = "100"
              />
            </Row>
          </Form>
        </Panel>
      </div>
    );
  }
}

export default App1;
