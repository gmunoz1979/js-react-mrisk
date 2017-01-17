import React from "react";

class Panel extends React.Component {

  render() {
    return (
      <div className="panel" style = {{ width: this.props.width + "px", height: this.props.height + "px" }}>
        <div className="panel-wrap">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Panel;
