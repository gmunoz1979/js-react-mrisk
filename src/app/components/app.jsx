import React    from "react";
import ReactDOM from "react-dom";
import { Form, Row, Combobox, TextField, TextAreaField,CheckboxField, Empty,
         Button }
                from "../../lib/components/form";
import { Panel, Table, Column, Router, Message }
                from "../../lib/components";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mode: Form.ModeType.VIEW
    }
  }

  static create() {
    const app = document.createElement("div");
    app.id = "app1";
    document.body.appendChild(app);
    ReactDOM.render(<App></App>, app);
  }

  handlerView() {
    if (this.search.isValid()) {
      this.setState({ mode: Form.ModeType.VIEW });
      this.form.fetchById([this.field.value]);
    } else {
      Message.showMessage("Debe ingresar un ID");
    }
  }

  handlerEdit() {
    if (this.search.isValid()) {
      this.setState({ mode: Form.ModeType.EDIT });
      this.form.fetchById([this.field.value]);
    } else {
      Message.showMessage("Debe ingresar un ID");
    }
  }

  handlerNew() {
    this.form.clear();
    this.setState({ mode: Form.ModeType.NEW });
  }

  handlerSave(json) {
    this.form.setData(json);
    if (this.state.mode === Form.ModeType.NEW) {
      this.setState({ mode: Form.ModeType.EDIT });
    }
  }

  render() {
    const search = (
      <Form
        ref           = { form => this.search = form }
        name          = "search"
        handlerSubmit = { this.handlerView.bind(this) }>
        <Row>
          <Button
            text         = "Nuevo"
            width        = "auto"
            handlerClick = { this.handlerNew.bind(this) }
          />
          <TextField
            ref        = { field => this.field = field }
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

    const form = (
      <Form
        mode      = { this.state.mode }
        ref       = { form => this.form = form }
        name      = "form"
        fieldKey  = "niv1_id"
        >
        <Router
          autoRouter  = {false}
          namespace   = "Nivel1"
          handlerSave = { this.handlerSave.bind(this) }
        />
        <Row>
          <TextField
            title      = "Id"
            titleWidth = "80"
            name       = "niv1_id"
            width      = "150"
            readOnly   = {true}
          />
          <Empty
            width      = "auto"
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
      </Form>
    );

    const table1 = (
      <Table name = "table1" idKey = "niv2_id">
        <Column name = "niv2_id"   title = "Id"           width = "50"></Column>
        <Column name = "name"      title = "Nombre"       width = "auto"></Column>
        <Column name = "ok"        title = "OK"           width = "50"   type="bool" ></Column>
        <Column name = "last_date" title = "Ultima Fecha" width = "auto" type="date" format="DD/MM/YYYY"></Column>
        <Column name = "other"     title = "Otro"         width = "auto"></Column>
          <Router
            namespace = "Nivel2"
            filterBy  = "form" />
      </Table>
    );

    const table2 = (
      <Table name = "table2" idKey = "niv3_id">
        <Column name = "niv3_id"     title = "Id"          width = "50"></Column>
        <Column name = "tipo.name"   title = "Tipo"        width = "100"></Column>
        <Column name = "description" title = "Descripcion" width = "auto"></Column>
        <Router
          namespace    = "Nivel3"
          objectParent = "table1" />
      </Table>
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
        <div className="app2">
          <span className="title">Ejemplo 2</span>
            <Panel
              width  = "500"
              height = "240">
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
