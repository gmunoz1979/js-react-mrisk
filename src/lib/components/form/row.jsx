import React from "react";

class Row extends React.Component {

  render() {
    const margin = 5;

    let staticWidth = 0;
    let lenAuto     = 0;

    React.Children.forEach(this.props.children, child => {
      if (child.props.width !== "auto") {
        staticWidth += parseInt(child.props.width);
      } else {
        lenAuto++;
      }
    });

    const len   = React.Children.count(this.props.children);

    const width = (this.props.width - staticWidth - (margin * (len - 1))) /
                  lenAuto;
    return (
      <div className="form-row" style={{ width: this.props.width + "px" }}>
        {
          React.Children.map(this.props.children, child => {
            const w = child.props.width === "auto" ? width : child.props.width;

            return React.cloneElement(child, {
              width: w,
              mode:  this.props.mode
            });
          })
        }
      </div>
    );
  }
}

export default Row;
