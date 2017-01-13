import React  from "react";
import Config from "../config";

class Table extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      head:  [],
      rows:  [],
      child: []
    }
  }

  get function_name() {
    return this.props.filterBy || this.props.objectParent ? "fetchByParentId" : "fetchAll";
  }

  getUrl() {
    return Config.Url           + "/" +
           Config.Context       + "/" +
           Config.Handler       + "/" +
           this.props.namespace + "/" +
           this.function_name   + ".json";
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

  async getData(params) {
    let url = this.getUrl() + (params ? "?options=" + JSON.stringify(params) : "");

    try {
      let response = await fetch(url);
      let json     = await response.json();

      let data = json.map(json =>
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

      return data;
    } catch(err) {
      console.error(err);
    }
  }

  componentDidMount() {
    let width = this.table.clientWidth;
    let auto  = 0;

    React.Children.forEach(this.props.children, child => {
      if (child.props.width === "auto") {
        auto++;
      } else {
        width -= parseInt(child.props.width);
      }
    });

    const width_auto = width/auto;

    let children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        width: child.props.width === "auto" ? width_auto : child.props.width
      })
    );

    let head = React.Children.map(children, child => {
      return (
        <td style={{ width: child.props.width + "px" }}>{child.props.title}</td>
      );
    });

    if (!this.props.filterBy && !this.props.objectParent) {
      this.getData().then(json => this.setState({ rows: [].slice.call(json) }));
    } else {
      let app = this.table.closest(".container");

      if (this.props.filterBy) {
        let target = app.querySelector(`*[name=${this.props.filterBy}]`);
        target.addEventListener("update", e =>
          {
            let target = e.target;
            this.getData({ id: [target.value] }).then(json => this.setState({ rows: [].slice.call(json) }));
            this.onrowclick(null, -1, null);
          }
        );
      }

      if (this.props.objectParent) {
        let object = app.querySelector(`*[name=${this.props.objectParent}]`);
        object.addEventListener("select", e =>
          {
            if (!e.detail.row || e.detail.index === -1) {
              this.setState({ rows: [] });
              return;
            }

            let value = e.detail.row[e.detail.id];
            this.getData({ id: [value] }).then(json => this.setState({ rows: [].slice.call(json) }));
          }
        );
      }
    }

    this.setState({
      head: head,
      children: children
    });
  }

  onrowclick(row, index, e) {
    let event = new CustomEvent("select",
      {
        detail: {
          id:    this.props.idKey,
          row:   row,
          index: index,
          event: e
        }
      }
    );

    this.table.dispatchEvent(event);
  }

  render() {
    return (
      <table name={this.props.name} ref={(table) => { this.table = table }} cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            { this.state.head }
          </tr>
        </thead>
        <tbody>
          {
            this.state.rows.map((r, i)=> {
              return (
                <tr key={i} onClick={this.onrowclick.bind(this, r, i)}>
                  {
                    React.Children.map(this.state.children, child =>
                      React.cloneElement(child,
                        {
                          value: r[child.props.name]
                        }
                      )
                    )
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    );
  }
}

export default Table;
