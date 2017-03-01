import React     from "react";
import KeyMirror from "keymirror";
import Field     from "./field";
import Combobox  from "./combobox";
import Textfield from "./textfield";
import Relation  from "../relation";

const MODE = KeyMirror({ NEW: null, EDIT: null, VIEW: null });

class ModeForm extends React.Component {
  static mode = MODE

  static defaultProps = {
    mode: ModeForm.mode.VIEW
  }

  state = { mode: null }

  componentWillMount() {
    this.setState({ mode: this.props.mode });
  }

  changeMode(mode) {
    this.setState({ mode: mode });
  }

  isType(c, o) {
    if (c === o) {
      return true;
    }
    if (c === React.Component) {
      return false;
    }

    return this.isType(c.__proto__, o);
  }

  getAllRelations(children, parent, relations={}) {

    React.Children.forEach(children, c =>
      {
        const children = c.props.children;

        if (parent && this.isType(c.type, Relation) && this.isType(parent.type, Combobox)) {
          const n = parent.props.name;
          const w = c.props.with;
          let rn = relations[n] = relations[n] || { root: "" };
          let rw = relations[w] = relations[w] || { root: "" };

          rn.child  = w;
          rw.parent = n;
          rw.root   = parent.props.object + ".";
        }

        if (children) {
          return this.getAllRelations(children, c, relations);
        }
      }
    );

    return relations;
  }

  walkRelation(relations, relation, root="") {
    if (!relation) return;

    root += relation.root;
    this.walkRelation(relations, relations[relation.child], root);
    relation.root = root;
  }

  processRelations(relations) {
    for (let [k, v] of Object.entries(relations)) {
      !v.parent && this.walkRelation(relations, v);
    }
  }

  overrideFields(children) {
    const relations = this.getAllRelations(children);
    this.processRelations(relations);

    return React.Children.map(children, c =>
      {
        let props    = c.props;
        let children = c.props.children;

        if (this.isType(c.type, Field)) {
          props = Object.assign({}, props,
            {
              readOnly: this.state.mode === MODE.VIEW
            });

          if (this.isType(c.type, Combobox) && this.state.mode === MODE.VIEW) {
            props.name = `${relations[props.name].root}${props.object}.${props.textValue}`;

            delete props.object;
            delete props.idValue;
            delete props.textValue;
            c = <Textfield />;
          }
        }

        if (children) {
          return React.cloneElement(c, props, this.overrideFields(children));
        } else {
          return React.cloneElement(c, props);
        }
      }
    );
  }

  render() {
    const children = this.overrideFields(this.props.children);

    return (
      <div className="modeform">{children}</div>
    );
  }
}

export default ModeForm;
