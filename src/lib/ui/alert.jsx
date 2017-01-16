import React    from "react";
import ReactDOM from "react-dom";

class Alert extends React.Component {

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
        ref= { target => this.target = target }
        style = {{ width: this.props.width + "px", height: this.props.height + "px" }}
        className="window"
      >
        <span>{ this.props.children }</span>
        <button onClick={this.props.handlerChild}>Aceptar</button>
      </div>
    );
  }
}

export default Alert;
