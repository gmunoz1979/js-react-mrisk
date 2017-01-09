import React from "react";

class Row extends React.Component {

  render() {
    const margin = 5;

    let staticWidth = 0;
    let lenAuto     = 0;

    this.props.children.forEach(child => {
      if (child.props.width !== "auto") {
        staticWidth += parseInt(child.props.width);
      } else {
        lenAuto++;
      }
    });

    const len   = this.props.children.length;

    const width = (this.props.width - staticWidth - (margin * (len - 1))) /
                  lenAuto;

    return (
      <div className="form-row" style={{ width: this.props.width + "px" }}>
        {
          React.Children.map(this.props.children, child => {
            if (child.props.width === "auto") {
              return React.cloneElement(child, {
                width: width
              });
            }

            return child;
          })
        }
      </div>
    );
  }
}

export default Row;
