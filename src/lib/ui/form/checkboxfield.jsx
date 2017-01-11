import React from "react";

class CheckboxField extends React.Component {

  render() {
    return (
      <div style = {{ width: this.props.width + "px" }}>
        <label
          style = {{ width: this.props.titleWidth + "px" }}>
          {this.props.title}
        </label>
        <input
          type  = "checkbox"
          name  = {this.props.name} />
        <label>
          {this.props.text}
        </label>
      </div>
    );
  }
}

export default CheckboxField;
