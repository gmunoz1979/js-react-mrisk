import React  from "react";

class Field extends React.Component {

  set field(value) {
    value = value || {};
    value.component = this;
    this._field = value;
  }

  get field() {
    return this._field;
  }

  get value() {
    return this.field.value;
  }

  set value(value) {
    this.field.value = value;

    const event = new CustomEvent("value",
      {
        detail: { value: value }
      }
    );

    this.field.dispatchEvent(event);
  }

  render(children) {
    const width      = this.props.width + "px";
    const titleWidth = this.props.titleWidth + "px";

    return (
      <div style = {{ width: width }}>
        <label style = {{ width: titleWidth }}>
          {this.props.title}
        </label>
        {children}
      </div>
    );
  }
}

export default Field;
