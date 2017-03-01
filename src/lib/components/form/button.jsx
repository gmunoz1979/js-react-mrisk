import React from "react";

class Button extends React.Component {

  static defaultProps = {
    text:         "",
    width:        100,
    handlerClick: function() {}
  }
  
  render() {
    const style = { width: this.props.width + "px" };

    return (
      <div style = { style }>
        <input
          style   = { style }
          type    = "button"
          ref     = { field => this.field = field }
          value   = { this.props.text }
          onClick = { this.props.handlerClick.bind(this) }
        />
      {this.props.children}
      </div>
    );
  }
}

export default Button;
