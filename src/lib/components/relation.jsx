import React         from "react";
import FetchableForm from "./common/fetchableform";
import IdSearchForm  from "./common/idsearchform";
import Combobox      from "./form/combobox";
import Util          from "../util";

class Relation extends React.Component {

  componentDidMount() {
    const app     = this.target.closest(".app");
    const relFrom = Util.findReact(this.target.closest(".combobox")) ||
                    Util.findReact(this.target.closest("form"));
    const relWith = Util.findReact(app.querySelector(`*[name=${this.props.with}]`));

    if (relWith instanceof IdSearchForm) {
      relWith.form.addEventListener("new", e => {
        relFrom instanceof FetchableForm &&
          relFrom.clear();
      });

      relWith.form.addEventListener("edit", e => {
        relFrom instanceof FetchableForm &&
          relFrom.fetchById([e.detail.id]);
      });

      relWith.form.addEventListener("view", e => {
        relFrom instanceof FetchableForm &&
          relFrom.fetchById([e.detail.id]);
      });

      return;
    }

    if (relWith instanceof Combobox) {
      const targetWith = relWith._field;
      const targetFrom = relFrom._field;
      const namespace  = Util.findReact(targetFrom.parentNode.querySelector(".namespace"));

      targetWith.relation = targetFrom;
      targetFrom.addEventListener("value", e => this.relationNested(e.currentTarget, relFrom.json));

      targetWith.addEventListener("change", e =>
        {
          const target    = e.currentTarget.relation;
          const rel       = Util.findReact(target);
          const namespace = Util.findReact(target.parentNode.querySelector(".namespace"));

          if (rel && rel instanceof Combobox) {
            const value = e.currentTarget.dataset.value;
            namespace.getData({ id: [value] });
            return;
          }
        }
      );

      targetFrom.addEventListener("update_data", e =>
        {
          const target = e.currentTarget;
          const value  = target.dataset.value;

          if (Util.hasValue(value)) {
            target.value = value;
          }
        }
      );

      return;
    }
  }

  relationNested(target, json, object="") {
    const app       = target.closest(".app");
    const component = Util.findReact(target);
    const relation  = Util.findReact(target.parentNode.querySelector(".relation"));
    const namespace = Util.findReact(target.parentNode.querySelector(".namespace"));

    object += namespace.props.object;

    const value = json[`${object}.${component.props.idValue}`];

    target.dataset.value = value;
    target.value = value;

    if (relation) {
      const targetWith = app.querySelector(`*[name=${relation.props.with}]`)
      this.relationNested(targetWith, json, object + ".");
    }

    const evt = new CustomEvent("change", { details: {} });
    target.dispatchEvent(evt);
  }

  render() {
    return (
      <div className="relation" ref = { target => this.target = target } />
    );
  }
}

export default Relation;
