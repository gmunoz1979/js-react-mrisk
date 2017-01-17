import React    from "react";
import ReactDOM from "react-dom";

class Message extends React.Component {

  componentDidMount() {
    let parent = this.target.closest(".container-message");

    this.target.style.width  = parent.clientWidth  + "px";
    this.target.style.height = parent.clientHeight + "px";
    setTimeout(() => {
      parent.parentNode.removeChild(parent);
    }, 1000);
  }

  render() {
    return (
      <div
        className="message"
        ref= { target => this.target = target }
      >
        <span>{ this.props.children }</span>
      </div>
    );
  }
}

export default Message;
