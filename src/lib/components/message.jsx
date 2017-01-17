import React    from "react";
import ReactDOM from "react-dom";

class Message extends React.Component {

  static createParent() {
    let c = document.createElement("div");
    c.classList.add("window-modal");
    c.style.width  = document.body.clientWidth  + "px";
    c.style.height = document.body.clientHeight + "px";
    document.body.appendChild(c);
    return c;
  }

  static showMessage(message, handlerClick) {
    ReactDOM.render(
      <Message handlerClick = { handlerClick }>
        { message }
      </Message>,
      Message.createParent()
    );
  }

  componentDidMount() {
    let parent = this.target.parentNode;
    const cw = (parent.clientWidth/2)  - (this.props.width/2);
    const ch = (parent.clientHeight/2) - (this.props.height/2);

    this.target.style.top  = ch + "px";
    this.target.style.left = cw + "px";
  }

  render() {
    return (
      <div
        ref = { target => this.target = target }
        style = {{ width: this.props.width + "px", height: this.props.height + "px" }}
        className="window"
      >
        <span>{ this.props.children }</span>
        <button onClick={this.props.handlerClick}>Aceptar</button>
      </div>
    );
  }
}

Message.defaultProps = {
  width:        250,
  height:       100,
  handlerClick: () => { React.unmountComponentAtNode(this.target.closest(".window-modal")); }
};

export default Message;
