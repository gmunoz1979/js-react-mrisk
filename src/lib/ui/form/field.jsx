import React  from "react";
import Config from "../../config";

class Field extends React.Component {

  constructor(props) {
    super(props);
  }

  get function_name() {
    return this.props.filterBy ? "fetchByParentId" : "fetchAll";
  }

  getUrl() {
    return Config.Url     + "/" +
           Config.Context + "/" +
           Config.Handler + "/" +
           this.props.namespace + "/" +
           this.function_name + ".json";
  }

  async getData(params) {
    let url = this.getUrl() + (params ? "?options=" + JSON.stringify(params) : "");

    try {
      let response = await fetch(url);
      let json     = await response.json();
      this.updateValues && this.updateValues(json);

    } catch(err) {
      console.error(err);
    }
  }

  componentWillMount() {
    !this.props.filterBy && this.getData();
  }
}

export default Field;
