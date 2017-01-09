import React    from "react";
import Form     from "../../lib/ui/form/form";
import Row      from "../../lib/ui/form/row";
import Combobox from "../../lib/ui/form/combobox";

class App1 extends React.Component {

  render() {
    return (
      <div className="app1">
        <span className="title">Ejemplo 1</span>
        <div className="wrap">
          <Form>
            <Row>
              <Combobox
                title      = "1 Combobox"
                titleWidth = "60"
                name       = "cbx1"
                width      = "auto"
                namespace  = "Folder"
                idValue    = "fold_id"
                textValue  = "name"
                />
              <Combobox
                title      = "2 Combobox"
                titleWidth = "60"
                name       = "cbx2"
                width      = "200"
                namespace  = "Folder"
                idValue    = "fold_id"
                textValue  = "name"
                />
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

export default App1;
