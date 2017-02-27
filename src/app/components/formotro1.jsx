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

class FormOtro1 extends React.Component {
  render() {
    return <StorableForm
      name      = "form"
      namespace = "Otro1"
    >
      <ModeForm mode= {ModeForm.VIEW} />
      <Relation with = {this.props.search} />
      <Row>
        <TextField
          title      = "Id"
          titleWidth = "65"
          name       = "otr1_id"
          width      = "150"
          readOnly   = {true}
        />
      </Row>
      <Row>
        <TextField
          title      = "Nombre"
          titleWidth = "65"
          name       = "name"
          width      = "auto"
          required   = {true}
        />
      </Row>
      <Row>
        <Combobox
          title      = "Tipo"
          titleWidth = "65"
          width      = "180"
          name       = "tipo_id"
          idValue    = "tipo_id"
          textValue  = "name" >
          <Namespace
            path = "Otro1/Tipo" object = "tipo" />
        </Combobox>
        <Combobox
          title      = "Sub tipo"
          titleWidth = "90"
          width      = "200"
          name       = "subt_id"
          idValue    = "subt_id"
          textValue  = "name">
          <Relation with = "tipo_id" />
          <Namespace
            path = "Otro1/SubTipo" object = "sub_tipo" />
        </Combobox>
        <Combobox
          title      = "Sub sub tipo"
          titleWidth = "115"
          width      = "230"
          name       = "ssub_id"
          idValue    = "ssub_id"
          textValue  = "name">
          <Relation with = "subt_id" />
          <Namespace
            path = "Otro1/SubSubTipo" object = "sub_sub_tipo" />
        </Combobox>
        <Combobox
          title      = "Sub sub sub tipo"
          titleWidth = "140"
          width      = "auto"
          name       = "sssu_id"
          idValue    = "sssu_id"
          textValue  = "name">
          <Relation with = "ssub_id" />
          <Namespace
            path = "Otro1/SubSubSubTipo" object = "sub_sub_sub_tipo" />
        </Combobox>
      </Row>
      <Row>
        <Combobox
          title      = "Tipo final"
          titleWidth = "65"
          width      = "180"
          name       = "tipo_id_final"
          idValue    = "tipo_id"
          textValue  = "name" >
          <Namespace
            path = "Otro1/Tipo" object = "tipo" />
        </Combobox>
        <Combobox
          title      = "Sub tipo final"
          titleWidth = "90"
          width      = "200"
          name       = "subt_id_final"
          idValue    = "subt_id"
          textValue  = "name">
          <Relation with = "tipo_id_final" />
          <Namespace
            path = "Otro1/SubTipo" object = "sub_tipo" />
        </Combobox>
        <Combobox
          title      = "Sub sub tipo final"
          titleWidth = "115"
          width      = "230"
          name       = "ssub_id_final"
          idValue    = "ssub_id"
          textValue  = "name">
          <Relation with = "subt_id_final" />
          <Namespace
            path = "Otro1/SubSubTipo" object = "sub_sub_tipo" />
        </Combobox>
        <Combobox
          title      = "Sub sub sub tipo final"
          titleWidth = "140"
          width      = "auto"
          name       = "sssu_id_final"
          idValue    = "sssu_id"
          textValue  = "name">
          <Relation with = "ssub_id_final" />
          <Namespace
            path = "Otro1/SubSubSubTipo" object = "sub_sub_sub_tipo_final" />
        </Combobox>
      </Row>
    </StorableForm>
  }
}

export default FormOtro1;
