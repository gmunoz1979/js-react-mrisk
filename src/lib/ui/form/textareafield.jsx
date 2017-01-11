import React from "react";

class TextAreaField extends React.Component {

  render() {
    let width = this.props.width - this.props.titleWidth;

    return (
      <div style = {{ width: this.props.width + "px", height: this.props.height + "px" }}>
        <label
          style = {{ width: this.props.titleWidth + "px" }}>
          {this.props.title}
        </label>
        <textarea
          style = {{ width: width + "px", height: this.props.height + "px", resize: "none" }}
          name  = {this.props.name}></textarea>
      </div>
    );
  }
}

export default TextAreaField;
