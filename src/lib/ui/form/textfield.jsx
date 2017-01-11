import React from "react";

class TextField extends React.Component {

  render() {
    let width = this.props.width - this.props.titleWidth;

    return (
      <div style = {{ width: this.props.width + "px" }}>
        <label
          style = {{ width: this.props.titleWidth + "px" }}>
          {this.props.title}
        </label>
        <input
          style = {{ width: width + "px" }}
          type  = "text"
          name  = {this.props.name} />
      </div>
    );
  }
}

export default TextField;
