import React    from "react";
import ReactDOM from "react-dom";
import { Form, Row, Combobox, TextField, TextAreaField,CheckboxField,
         Button }
                from "../../lib/components/form";
import { Panel, Table, Column, Router }
                from "../../lib/components";

class App extends React.Component {

  static create() {
    let app1 = document.createElement("div");
    app1.id = "app1";
    document.body.appendChild(app1);
    ReactDOM.render(<App></App>, app1);
  }

  render() {
    const action = function(data) {
      let container = this.target.closest(".container");
      let form      = container.querySelector("*[name=form1]");
      form.component.setData(data[0]);
    }

    const actionError = function() {
      let container = this.target.closest(".container");
      let table     = container.querySelector("*[name=table1]");
      let router    = table.closest(".router");
      router.component.clear();
    }

    const handlerClick = function() {
      const form   = this.field.closest("form");
      const field  = form.querySelector("*[name=id]");

      const router = form.querySelector(".router");
      router.component.search({ id: [field.value] });
    }

    const search = (
      <Form
        name="search">
        <Row>
          <TextField
            title      = "Id"
            titleWidth = "80"
            name       = "id"
            width      = "250"
          />
        <Button
          text         = "Buscar"
          width        = "auto"
          handlerClick = { handlerClick }
        >
          <Router
            autoRouter  = "false"
            namespace   = "Nivel1"
            findBy      = "id"
            action      = { action }
            actionError = { actionError } />
        </Button>
        </Row>
      </Form>
    );

    const form = (
      <Form
        name      = "form1"
        namespace = "Nivel1"
        fieldKey  = "niv1_id"
        >
        <Row>
          <TextField
            title      = "Id"
            titleWidth = "80"
            name       = "niv1_id"
            width      = "250"
          />
        </Row>
        <Row>
          <Router
            namespace = "Nivel1/Tipo"
            >
            <Combobox
              title      = "Tipo"
              titleWidth = "80"
              name       = "tipo"
              width      = "auto"
              idValue    = "tipo_id"
              textValue  = "name"
              />
          </Router>
          <Router
            namespace = "Nivel1/SubTipo"
            filterBy  = "tipo">
            <Combobox
              title      = "Sub tipo"
              titleWidth = "80"
              name       = "sub_tipo"
              width      = "200"
              idValue    = "subt_id"
              textValue  = "name"
              />
          </Router>
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
            checked = "false"
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
