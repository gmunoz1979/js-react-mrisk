import React    from "react";
import ReactDOM from "react-dom";
import Field    from "./field";
import Message  from "../message";
import Config   from "../../config";

class Router extends Field {

  updateValues() {
    throw new Error("No implementado.");
  }

  get function_name() {
    return this.props.filterBy ? "fetchByParentId" : "fetchAll";
  }

  getUrl() {
    return `${Config.Url}/${Config.Context}/${Config.Handler}/${this.props.namespace}/${this.function_name}.json`;
  }

  componentWillMount() {
    this.props.autoRouter && !this.props.filterBy && this.getData();
  }

  async getData(params) {
    let url = this.getUrl() + (params ? "?options=" + JSON.stringify(params) : "");

    try {
      let response = await fetch(url);
      if (response.ok) {
        let json = await response.json();
        return json;
      } else {
        if (this.props.showMessageError) {
          let panel = this.field.closest(".panel");
          let container = document.createElement("div");
          container.classList.add("container-message");
          container.style.width  = panel.clientWidth  + "px";
          container.style.height = panel.clientHeight + "px";

          panel.appendChild(container);

          ReactDOM.render(
            <Message>No se encontro dato</Message>,
              container);
        } else {
          console.warn(response);
        }

        throw new Error();
      }
    } catch(err) { throw err; }
  }
}

Router.defaultProps = {
  autoRouter: true
};

export default Router;
