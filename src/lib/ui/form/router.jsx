import Field  from "./field";
import Config from "../../config";

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
      let json     = await response.json();
      return json;
    } catch(err) {
      console.error(err);
    }
  }
}

Router.defaultProps = {
  autoRouter: true
};

export default Router;
