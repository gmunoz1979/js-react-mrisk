import React  from "react";
import Router from "./router";

class Button extends Router {

  get function_name() {
    return "fetchById";
  }

  render() {
    const style = { width: (this.props.width - this.props.titleWidth) + "px" };

    let field = (
      <input
        style = { style }
        type  = "text"
        name  = { this.props.name }
        ref   = { field => this.field = field } />
    );

    return super.render(field);
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
          onClick = { this.handlerClick.bind(this) }
        />
      </div>
    );
  }
}

export default Button;
