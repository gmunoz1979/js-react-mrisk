import React    from "react";
import * as Lib from "../../lib/components";

const Namespace     = Lib.Namespace;
const Relation      = Lib.Relation;

const ModeForm      = Lib.Form.ModeForm;
const Row           = Lib.Form.Row;
const TextField     = Lib.Form.TextField;
const Empty         = Lib.Form.Empty;
const Combobox      = Lib.Form.Combobox;
const TextAreaField = Lib.Form.TextAreaField;
const CheckboxField = Lib.Form.CheckboxField;

const StorableForm = Lib.Common.StorableForm;

class FormNivel1 extends React.Component {
  render() {
    return <StorableForm
      name      = "form"
      namespace = "Nivel1"
    >
      <ModeForm mode= {ModeForm.VIEW} />
      <Relation with = {this.props.search} />
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
            path = "Nivel1/SubTipo" object = "sub_tipo" />
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
  }
}

export default FormNivel1;