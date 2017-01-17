import React  from "react";
import Config from "../config";

class Table extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      head:  [],
      child: []
    }
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

  calcAutoWidth() {
    let width = this.table.clientWidth;
    let auto  = 0;

    React.Children.forEach(this.props.children, child => {
      if (child.props.width === "auto") {
        auto++;
      } else {
        width -= parseInt(child.props.width);
      }
    });

    return width/auto;
  }

  componentDidMount() {
    this.table.component = this;
    const auto_width = this.calcAutoWidth();

    let children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        width: child.props.width === "auto" ? auto_width : child.props.width
      })
    );

    let head = React.Children.map(children, child => {
      return (
        <td style={{ width: child.props.width + "px" }}>{child.props.title}</td>
      );
    });

    this.setState( { head: head, children: children } );
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
            this.props.json.map((r, i)=> {
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

Table.defaultProps = {
  json: []
};

export default Table;
