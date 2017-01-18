import React    from "react";
import ReactDOM from "react-dom";
import { Form, Row, Combobox, TextField, TextAreaField,CheckboxField,
         Button }
                from "../../lib/components/form";
import { Panel, Table, Column, Router }
                from "../../lib/components";

class App extends React.Component {

  static create() {
    const app = document.createElement("div");
    app.id = "app1";
    document.body.appendChild(app);
    ReactDOM.render(<App></App>, app);
  }

  handlerClick() {
    this.form1.fetchById([this.field.value]);
  }

  render() {
    const search = (
      <Form
        name="search">
        <Row>
          <TextField
            ref        = { field => this.field = field }
            title      = "Id"
            titleWidth = "80"
            name       = "id"
            width      = "250"
          />
          <Button
            text         = "Buscar"
            width        = "auto"
            handlerClick = { this.handlerClick.bind(this) }
          />
        </Row>
      </Form>
    );

    const form = (
      <Form
        ref       = { form => this.form1 = form }
        name      = "form1"
        fieldKey  = "niv1_id"
        >
        <Router
          autoRouter = {false}
          namespace  = "Nivel1"
        />
        <Row>
          <TextField
            title      = "Id"
            titleWidth = "80"
            name       = "niv1_id"
            width      = "250"
          />
        </Row>
        <Row>
          <Combobox
            title      = "Tipo"
            titleWidth = "80"
            name       = "tipo"
            width      = "auto"
            idValue    = "tipo_id"
            textValue  = "name" >
            <Router
              namespace = "Nivel1/Tipo" />
          </Combobox>
          <Combobox
            title      = "Sub tipo"
            titleWidth = "80"
            name       = "sub_tipo"
            width      = "200"
            idValue    = "subt_id"
            textValue  = "name">
            <Router
              namespace = "Nivel1/SubTipo"
              filterBy  = "tipo" />
          </Combobox>
        </Row>
        <Row>
          <TextField
            title      = "Nombre"
            titleWidth = "80"
            name       = "name"
            width      = "auto"
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
        </Row>
      </Form>
    );

    const table1 = (
      <Router
        namespace = "Nivel2"
        filterBy  = "form1">
        <Table name = "table1" idKey = "niv2_id">
          <Column name = "niv2_id"   title = "Id"           width = "50"></Column>
          <Column name = "name"      title = "Nombre"       width = "auto"></Column>
          <Column name = "ok"        title = "OK"           width = "50"   type="bool" ></Column>
          <Column name = "last_date" title = "Ultima Fecha" width = "auto" type="date" format="DD/MM/YYYY"></Column>
          <Column name = "other"     title = "Otro"         width = "auto"></Column>
        </Table>
      </Router>
    );

    const table2 = (
      <Router
        namespace    = "Nivel3"
        objectParent = "table1">
        <Table name = "table2" idKey = "niv3_id">
          <Column name = "niv3_id"     title = "Id"          width = "50"></Column>
          <Column name = "tipo.name"   title = "Tipo"        width = "100"></Column>
          <Column name = "description" title = "Descripcion" width = "auto"></Column>
        </Table>
      </Router>
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
            height = "250">
            {form}
          </Panel>
        </div>
        <div className="app2">
          <span className="title">Ejemplo 2</span>
            <Panel
              width  = "500"
              height = "270">
              {table1}
            </Panel>
        </div>
        <div className="app3">
          <span className="title">Ejemplo 3</span>
            <Panel
              width  = "500"
              height = "430">
              {table2}
            </Panel>
        </div>
      </div>
    );
  }
}

export default App;
