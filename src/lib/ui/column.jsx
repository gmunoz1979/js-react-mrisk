import React from "react";

class Column extends React.Component {

  render() {
    return (
      <td>{this.props.value}</td>
    );
  }
}

export default Column;
