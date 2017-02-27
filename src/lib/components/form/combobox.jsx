import React    from "react";
import Field    from "./field";
import Form     from "./form";
import Relation from "../relation";

class Combobox extends Field {

  state = { data: [] }

  insertDefault(values) {
    values = [].slice.call(values);

    values.unshift(
      {
        [this.props.idValue]:   0,
        [this.props.textValue]: "Seleccione"
      }
    );

    return values;
  }

  handlerAction(data) {
    this.field.value = "";
    this.setState({ data: data });
  }

  handlerChange(e) {
    const event = new CustomEvent("update",
      {
        detail: {}
      }
    );

    e.target.dispatchEvent(event);
  }

  setData(data) {
    this.setState({ data: data });
  }

  componentDidUpdate() {
    const event = new CustomEvent("update_data",
      {
        detail: {
          data: this.state.data
        }
      }
    );

    this.field.dispatchEvent(event);
  }

  render() {
    let hasRelation = false;

    React.Children.forEach(this.props.children, c =>
      {
        if (c.type === Relation) {
          hasRelation = true;
        }
      }
    );

    const children = React.Children.map(this.props.children, c =>
      {
        if (c.type.name === "Namespace") {
          let props = Object.assign({}, c.props,
            {
              handlerAction: this.handlerAction.bind(this),
              hasRelation:   hasRelation,
              autoLoad:      !hasRelation
            }
          );

          return React.cloneElement(c, props);
        }

        return c;
      }
    );

    const style  = { width: (this.props.width - this.props.titleWidth - 5) + "px" };
    const values = this.insertDefault(this.state.data);

    const field = (
      <div className="combobox">
        <select
          style    = { style }
          name     = { this.props.name }
          ref      = { field => this.field = field }
          onChange = { this.handlerChange.bind(this) }
          required = { this.required } >
          { values.map((o, i) => {
            return <option key={i} value={ o[this.props.idValue] }>{ o[this.props.textValue] }</option>
          }) }
        </select>
        { children }
      </div>
    );

    return super.render(field);
  }
}

export default Combobox;
