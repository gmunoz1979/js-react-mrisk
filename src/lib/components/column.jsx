import React from "react";
import Moment from "moment";

class Column extends React.Component {

  getDate(v) {
    return Moment(
      {
        y: v.year,
        M: v.month,
        d: v.dayOfMonth,
        h: v.hourOfDay,
        m: v.minute,
        s: v.second
      }
    );
  }

  render() {
    let value = this.props.value
    if (typeof(value) === "object" && this.props.type === "date") {
      const v = Object.assign({}, value);
      value = this.getDate(value).format(this.props.format);
    }

    if (this.props.type === "bool") {
      let bool = ""+value;
      return (
        <td className={`column-${bool}`}><span></span></td>
      );
    }

    return (
      <td>{value}</td>
    );
  }
}

export default Column;
