import React     from "react";
import KeyMirror from "keymirror";
import Field     from "./field";
import Combobox  from "./combobox";
import Textfield from "./textfield";
import Relation  from "../relation";
import Util      from "../../util"

const MODE = KeyMirror({ NEW: null, EDIT: null, VIEW: null });

function getAllRelations(children, parent, relations={}) {
  React.Children.forEach(children, c =>
    {
      const children = c.props.children;

      if (parent && Util.isType(c.type, Relation) && Util.isType(parent.type, Combobox)) {
        const n = parent.props.name;
        const w = c.props.with;
        let rn = relations[n] = relations[n] || { root: "" };
        let rw = relations[w] = relations[w] || { root: "" };

        rn.child  = w;
        rw.parent = n;
        rw.root   = parent.props.object + ".";
      }

      if (children) {
        return getAllRelations(children, c, relations);
      }
    }
  );

  return relations;
}

function walkRelation(relations, relation, root="") {
  if (!relation) return;

  root += relation.root;
  walkRelation(relations, relations[relation.child], root);
  relation.root = root;
}

function processRelations(relations) {
  for (let [k, v] of Object.entries(relations)) {
    !v.parent && walkRelation(relations, v);
  }
}

function overrideFields(mode, children) {
  const relations = getAllRelations(children);
  processRelations(relations);

  return React.Children.map(children, c =>
    {
      let props    = c.props;
      let children = c.props.children;

      if (Util.isType(c.type, Field)) {
        props = Object.assign({}, props,
          {
            modeReadOnly: mode === MODE.VIEW
          });

        if (Util.isType(c.type, Combobox) && mode === MODE.VIEW) {
          props.name = `${relations[props.name].root}${props.object}.${props.textValue}`;

          delete props.object;
          delete props.idValue;
          delete props.textValue;
          c = <Textfield />;
        }
      }

      if (children) {
        return React.cloneElement(c, props, overrideFields(mode, children));
      } else {
        return React.cloneElement(c, props);
      }
    }
  );
}

export default {
  MODE: MODE,
  overrideFields: overrideFields
}
