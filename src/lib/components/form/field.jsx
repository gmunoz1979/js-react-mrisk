import React  from "react";
import Util   from "../../util";

class Field extends React.Component {

  static defaultProps = {
    id:           Util.getID(),
    width:        50,
    titleWidth:   50,
    title:        "",
    name:         "",
    text:         "",
    object:       "",
    isId:         false,
    readOnly:     false,
    modeReadOnly: false,
    required:     false
  }

  static propTypes = {
    id:           React.PropTypes.string,
    //width:        React.PropTypes.string,
    //titleWidth:   React.PropTypes.string,
    title:        React.PropTypes.string,
    name:         React.PropTypes.string,
    text:         React.PropTypes.string,
    object:       React.PropTypes.string,
    isId:         React.PropTypes.bool,
    readOnly:     React.PropTypes.bool,
    modeReadOnly: React.PropTypes.bool,
    required:     React.PropTypes.bool
  }

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

  set json(value) {
    this._json = value;
  }

  get json() {
    return this._json;
  }

  render(children) {
    const width      = this.props.width + "px";
    const titleWidth = this.props.titleWidth + "px";

    return (
      <div style = {{ width: width }}>
        <label
          style = {{ width: titleWidth }}>
          {this.props.title}
        </label>
        {children}
      </div>
    );
  }
}

export default Field;
