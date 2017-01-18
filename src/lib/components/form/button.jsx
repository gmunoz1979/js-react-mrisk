import React  from "react";

class Button extends React.Component {

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

Button.defaultProps = {
  handlerClick: function() {}
}

export default Button;