import React        from "react";
import StorableForm from "./common/storableform";
import IdSearchForm from "./common/idsearchform";
import Combobox     from "./form/combobox";
import ModeForm     from "./form/modeform";
import Util         from "../util";

class Relation extends React.Component {

  componentDidMount() {
    const app     = this.target.closest(".app");
    const relFrom = Util.findReact(this.target.closest(".combobox")) ||
                    Util.findReact(this.target.closest("form"));
    const relWith = Util.findReact(app.querySelector(`*[name=${this.props.with}]`));

    if (relWith instanceof IdSearchForm) {
      relWith.form.addEventListener(ModeForm.MODE.NEW, e => {
        if (relFrom instanceof StorableForm) {
          relFrom.changeMode(ModeForm.MODE.NEW);
          relFrom.clear();
        }
      });

      relWith.form.addEventListener(ModeForm.MODE.EDIT, e => {
        if (relFrom instanceof StorableForm) {
          relFrom.changeMode(ModeForm.MODE.EDIT);
          relFrom.fetchById([e.detail.id]);
        }
      });

      relWith.form.addEventListener(ModeForm.MODE.VIEW, e => {
        if (relFrom instanceof StorableForm) {
          relFrom.changeMode(ModeForm.MODE.VIEW);
          relFrom.fetchById([e.detail.id]);
        }
      });

      return;
    }

    if (relWith instanceof Combobox) {
      const targetWith = relWith._field;
      const targetFrom = relFrom._field;
      const namespace  = Util.findReact(targetFrom.parentNode.querySelector(".namespace"));

      targetWith.relation = targetFrom;

      targetFrom.addEventListener("value", e =>
        {
          e.target.dataset.value = e.detail.value;
          this.relationNested(e.target, relFrom.json)
        }
      );

      targetWith.addEventListener("change", e =>
        {
          const target    = e.target.relation;
          const rel       = Util.findReact(target);
          const namespace = Util.findReact(target.parentNode.querySelector(".namespace"));

          e.target.dataset.value = e.detail ? e.detail.value : e.target.value;

          if (rel && rel instanceof Combobox) {
            const value = e.detail ? e.detail.value : e.target.value;
            namespace.getData({ id: [value] });
            return;
          }
        }
      );

      targetFrom.addEventListener("update", e =>
        {
          const value = e.target.dataset.value;

          if (Util.hasValue(value) && value.length !== 0) {
            if (e.target.querySelectorAll(`option[value="${value}"]`).length === 0) {
              e.target.dataset.value = 0;
              e.target.value         = 0;
              const evt = new CustomEvent("change", { detail: { value: 0 } });
              e.target.dispatchEvent(evt);
              return;
            }

            e.target.dataset.value = value;
            e.target.value         = value;
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

    object += component.props.object;

    const value = json[`${object}.${component.props.idValue}`];

    setTimeout(() =>
      {
        target.dataset.value = value;
        target.value         = value;

        if (relation) {
          const targetWith = app.querySelector(`*[name=${relation.props.with}]`)
          this.relationNested(targetWith, json, object + ".");
        }

        const evt = new CustomEvent("change", { detail: { value: value } });
        target.dispatchEvent(evt);
      },
      100
    );
  }

  render() {
    return (
      <div className="relation" ref = { target => this.target = target } />
    );
  }
}

export default Relation;
