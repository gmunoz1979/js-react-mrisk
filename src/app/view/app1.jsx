import React         from "react";
import Panel         from "../../lib/ui/panel";
import Form          from "../../lib/ui/form/form";
import Row           from "../../lib/ui/form/row";
import Combobox      from "../../lib/ui/form/combobox";
import TextField     from "../../lib/ui/form/textfield";
import TextAreaField from "../../lib/ui/form/textareafield";
import CheckboxField from "../../lib/ui/form/checkboxfield";
import Table         from "../../lib/ui/table";
import Column        from "../../lib/ui/column";

class App1 extends React.Component {

  render() {
    return (
      <div className="app">
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
                  idValue    = "tipo_id"
                  textValue  = "name"
                />
                <Combobox
                  title      = "Sub tipo"
                  titleWidth = "80"
                  name       = "subtipo"
                  width      = "200"
                  namespace  = "Nivel1/SubTipo"
                  idValue    = "subt_id"
                  textValue  = "name"
                  filterBy   = "tipo"
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
        <div className="app2">
          <span className="title">Ejemplo 2</span>
          <Panel
            width  = "500"
            height = "270">
            <Table namespace = "Nivel2">
              <Column name="niv2_id"   title="Id"           width="50"></Column>
              <Column name="name"      title="Nombre"       width="auto"></Column>
              <Column name="ok"        title="OK"           width="50"></Column>
              <Column name="last_date" title="Ultima Fecha" width="auto"></Column>
              <Column name="other"     title="Otro"         width="auto"></Column>
            </Table>
          </Panel>
        </div>
        <div className="app3">
          <span className="title">Ejemplo 3</span>
          <Panel
            width  = "500"
            height = "430">
            <Table namespace = "Nivel3">
              <Column name="niv3_id"     title="Id"          width="50"></Column>
              <Column name="tipo.name"   title="Tipo"        width="100"></Column>
              <Column name="description" title="Descripcion" width="auto"></Column>
            </Table>
          </Panel>
        </div>
      </div>
    );
  }
}

export default App1;
