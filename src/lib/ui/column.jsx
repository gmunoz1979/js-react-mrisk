import React from "react";
import Moment from "moment";

class Column extends React.Component {

  render() {
    let value = this.props.value
    if (typeof(value) === "object" && this.props.type === "date") {
      value = Moment(value).format(this.props.format);
    }

    return (
      <td>{value}</td>
    );
  }
}

export default Column;
