import React      from "react";
import ReactDOM   from "react-dom";
import * as Lib   from "../../lib/components";

import Search     from "./search";
import FormNivel1 from "./formnivel1";
import FormOtro1  from "./formotro1";

const Panel = Lib.Panel;

class App extends React.Component {

  static create() {
    const app = document.createElement("div");
    app.id = "app1";
    document.body.appendChild(app);
    ReactDOM.render(<App></App>, app);
  }

  render() {
    return (
      <div className="container">
        <div className="app app1">
          <span className="title">Ejemplo 1</span>
          <Panel
            width  = "500"
            height = "40">
            <Search name="search1" />
          </Panel>
          <Panel
            width  = "500"
            height = "305">
            <FormNivel1 search="search1" />
          </Panel>
        </div>

        <div className="app app2">
          <span className="title">Ejemplo 2</span>
          <Panel
            width  = "500"
            height = "40">
            <Search name="search2" />
          </Panel>
          <Panel
            width  = "950"
            height = "305">
            <FormOtro1 search="search2" />
          </Panel>
        </div>

      </div>
    );
  }
}

export default App;
