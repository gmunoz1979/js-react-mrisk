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

  getUrl() {
    return Config.Url     + "/" +
           Config.Context + "/" +
           Config.Handler + "/" +
           this.props.namespace + "/" +
           "fetchAll.json";
  }

  async getData() {
    try {
      let response = await fetch(this.getUrl());
      let json     = await response.json();

      let data = json.map(json =>
        {
          let o = {}

          for (let key in json) {
            if (typeof(json[key]) === "object") {
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

    this.getData().then(json => {
      this.setState({ rows: [].slice.call(json) })
    });

    this.setState({
      head: head,
      children: children
    });
  }

  render() {
    return (
      <table ref={(table) => { this.table = table }} cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            { this.state.head }
          </tr>
        </thead>
        <tbody>
          {
            this.state.rows.map((r, i)=> {
              return (
                <tr key={i}>
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
