import React   from "react";
import Message from "./message";
import Config  from "../config";
import Util    from "../util";

class Namespace extends React.Component {

  static propTypes = {
    autoLoad:         React.PropTypes.bool,
    method:           React.PropTypes.string,
    showMessageError: React.PropTypes.bool,
    hasRelation:      React.PropTypes.bool,
    action:           React.PropTypes.func,
    actionError:      React.PropTypes.func,
    handlerAction:    React.PropTypes.func,
    handlerError:     React.PropTypes.func
  }

  static defaultProps = {
    autoLoad:         true,
    method:           "GET",
    showMessageError: true,
    hasRelation:      false,
    action:           function() {},
    actionError:      function() {},
    handlerAction:    function() {},
    handlerError:     function() {},
    handlerSave:      function() {}
  }

  state = { data: [] }

  updateValues() {
    throw new Error("No implementado.");
  }

  get function_name() {
    return this.props.hasRelation ? "fetchByParentId" : "fetchAll";
  }

  getUrl(function_name = this.function_name) {
    return `${Config.Url}/${Config.Context}/${Config.Handler}/${this.props.path}/${function_name}.json`;
  }

  getHeaders() {
    let auth    = localStorage.getItem("access_token");
    let headers = new Headers();
    headers.append("Accept", "application/json");

    auth &&
      headers.append("Authorization", `Bearer ${auth}`);

    return headers;
  }

  async search(params) {
    try {
      let data = await this.getData(params);
      this.props.action.call(this, data);
    } catch(e) {
      this.props.actionError.call(this);
      console.warn(e);
    }
  }

  clear() {
    this.setState({ data: [] });
  }

  handlerError(response) {
    if (!this.props.showMessageError) {
      throw new Error(response);
      return;
    }

    let message = `Error ${response.status} - `;
    let handlerClick = null;

    if (response.status === 401) {
      message += "Sin autorización";
      handlerClick = () => window.location.href = Config.Redirect;
    }

    if (response.status === 404) {
      message += "No existe registro";
    }

    if (response.status === 500) {
      const reader = response.body.getReader();
      let buffer = new Uint8Array(0);
      let self = this;

      reader.read().then(function processResult(result) {
        if (result.done) {
          const json = JSON.parse(new TextDecoder("utf-8").decode(buffer));
          self.props.handlerError(json);
          Message.showMessage(json.message, handlerClick);
          return;
        }

        let tmp = new Uint8Array(buffer.byteLength + result.value.byteLength);
        tmp.set(buffer, 0);
        tmp.set(result.value, buffer.byteLength);
        buffer = tmp;

        return reader.read().then(processResult);
      });

      return;
    }

    this.props.handlerError(response);
    Message.showMessage(message, handlerClick);

    throw new Error(response);
  }

  async create(data) {
    let url = this.getUrl("create");

    try {
      let response = await fetch(url, {
        method:  "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });

      if (response.ok) {
        let json = await response.json();
        this.props.handlerSave(json);
        return json;
      }

      this.handlerError(response);
    } catch(err) {
      throw err;
    }
  }

  async patch(params, data) {
    let url = this.getUrl("patchById") + "?options=" + JSON.stringify(params).replace(/(\"|\'|\s)/g, "");

    try {
      let response = await fetch(url, {
        method:  "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });

      if (response.ok) {
        let json = await response.json();
        this.props.handlerSave(json);
        return json;
      }

      this.handlerError(response);
    } catch(err) {
      throw err;
    }
  }

  async fetchById(filter) {
    let json = await this.getData({ id: filter }, "fetchById");
    return json;
  }

  async getData(params, function_name) {
    let url = this.getUrl(function_name) + (params ? "?options=" + JSON.stringify(params).replace(/(\"|\'|\s)/g, "") : "");

    try {
      let response = await fetch(url, {
        method:  this.props.method,
        headers: this.getHeaders()
      });

      if (response.ok) {
        let data = await response.json();
        data = data.length ? data : [data];

        let fn = (item, o, prefix="") => {
          for (const key in item) {
            if (typeof(item[key]) === "object" && !Util.isDate(item[key])) {
              fn(item[key], o, prefix + key + ".");
            } else {
              o[prefix+key] = item[key];
            }
          }
        }

        let json = data.map(json =>
          {
            let o = {}
            fn(json, o);
            return o;
          }
        );

        this.props.handlerAction(json);

        return json;
      }

      this.handlerError(response);
    } catch(err) {
      throw err;
    }
  }

  set target(value) {
    value = value || {};
    value.component = this;
    this._target = value;
  }

  get target() {
    return this._target;
  }

  get_options() {
    if (this.props.autoLoad) {
      this.getData().then(data => this.setState({data: data}));
      return;
    }
  }

  componentDidMount() {
    this.get_options();
  }

  render() {
    return (
      <div className="namespace" ref = { target => this.target = target }>
        {
          React.Children.map(this.props.children, c => React.cloneElement(c, { json: this.state.json }))
        }
      </div>
    );
  }
}

export default Namespace;
