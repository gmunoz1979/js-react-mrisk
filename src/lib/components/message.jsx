import React    from "react";
import ReactDOM from "react-dom";

class Message extends React.Component {

  static defaultProps = {
    width:        250,
    height:       100,
    handlerClick: null
  }

  static createParent() {
    const c = document.createElement("div");
    c.classList.add("window-modal");
    c.style.width  = document.body.clientWidth  + "px";
    c.style.height = document.body.clientHeight + "px";
    document.body.appendChild(c);
    return c;
  }

  static showMessage(message, handlerClick) {
    handlerClick = handlerClick || function() {
      const parent = this.target.closest(".window-modal");
      ReactDOM.unmountComponentAtNode(parent);
      parent.parentNode.removeChild(parent);
    }

    ReactDOM.render(
      <Message handlerClick = { handlerClick }>
        { message }
      </Message>,
      Message.createParent()
    );
  }

  componentDidMount() {
    const parent = this.target.parentNode;
    const cw = (parent.clientWidth/2)  - (this.target.clientWidth/2);
    const ch = (parent.clientHeight/2) - (this.props.height/2);

    this.target.style.top  = ch + "px";
    this.target.style.left = cw + "px";

    document.activeElement.blur();
  }

  render() {
    return (
      <div
        ref = { target => this.target = target }
        style = {{ miWwidth: this.props.width + "px", height: this.props.height + "px" }}
        className="window"
      >
        <span>{ this.props.children }</span>
        <button onClick={this.props.handlerClick.bind(this)}>Aceptar</button>
      </div>
    );
  }
}

export default Message;
