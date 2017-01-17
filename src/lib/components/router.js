import React   from "react";
import Message from "./message";
import Config  from "../config";

class Router extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      json: []
    }
  }

  updateValues() {
    throw new Error("No implementado.");
  }

  get function_name() {
    return this.props.findBy ? "fetchById" : (
      this.props.filterBy || this.props.objectParent ? "fetchByParentId" : "fetchAll"
    );
  }

  getUrl() {
    return `${Config.Url}/${Config.Context}/${Config.Handler}/${this.props.namespace}/${this.function_name}.json`;
  }

  hasValue(o) {
    return o !== undefined && o !== null;
  }

  isDate(o) {
    return this.hasValue(o.year)       &&
           this.hasValue(o.month)      &&
           this.hasValue(o.dayOfMonth) &&
           this.hasValue(o.hourOfDay)  &&
           this.hasValue(o.minute)     &&
           this.hasValue(o.second);
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
    this.setState({ json: [] });
  }

  async getData(params) {
    let url = this.getUrl() + (params ? "?options=" + JSON.stringify(params) : "");

    try {
      let response = await fetch(url, {
        method:  this.props.method,
        headers: this.getHeaders()
      });

      if (response.ok) {
        let data = await response.json();
        data = data.length ? data : [data];

        let json = data.map(json =>
          {
            let o = {}

            for (let key in json) {
              if (typeof(json[key]) === "object" && !this.isDate(json[key])) {
                for (let k in json[key]) {
                  o[key + "." + k] = json[key][k];
                }
              } else {
                o[key] = json[key];
              }
            }

            return o;
          }
        );

        return json;
      }

      if (this.props.showMessageError) {
        let message = "";
        let handlerClick = null;

        if (response.status === 401) {
          message = `Error ${response.status} - Sin autorización`;
          handlerClick = () => window.location.href = Config.Redirect;
        }

        if (response.status === 404) {
          message = `Error ${response.status} - No existe registro`;
        }

        Message.showMessage(message, handlerClick);
      }

      throw new Error(response);
    } catch(err) {
      throw err;
    }
  }

  componentDidMount() {
    this.target.component = this;

    const get_all = !this.props.filterBy && !this.props.objectParent && !this.props.findBy;

    if (this.props.autoRouter && get_all) {
      this.getData().then(json => this.setState({ json: json }));
      return;
    }

    let app    = this.target.closest(".container");
    let object = app.querySelector(`*[name=${ this.props.objectParent || this.props.filterBy }]`);

    if (this.props.objectParent) {
      object.addEventListener("select", e =>
        {
          if (!e.detail.row || e.detail.index === -1) {
            this.setState({ json: [] });
            return;
          }

          let value = e.detail.row[e.detail.id];
          this.getData({ id: [value] }).then(json => this.setState({ json: json }));
        }
      );
      return;
    }

    if (this.props.filterBy) {
      object.addEventListener("update", e =>
        {
          let target = e.target;
          this.getData({ id: [target.value] }).then(json => this.setState({ json: json }));
        }
      );
    }
  }

  render() {
    return (
      <div className="router" ref = { target => this.target = target }>
        {
          React.Children.map(this.props.children, c => React.cloneElement(c, { json: this.state.json }))
        }
      </div>
    );
  }
}

Router.defaultProps = {
  autoRouter:       true,
  method:           "GET",
  showMessageError: true,
  filterBy:         null,
  objectParent:     null,
  action:           function() {},
  actionError:      function() {}
};

export default Router;
