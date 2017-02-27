import React         from "react";
import FetchableForm from "./common/fetchableform";
import IdSearchForm  from "./common/idsearchform";
import Combobox      from "./form/combobox";
import Util          from "../util";

class Relation extends React.Component {

  componentDidMount() {
    const relFrom = Util.findReact(this.target.closest(".combobox")) ||
                    Util.findReact(this.target.closest("form"));
    const relWith = Util.findReact(document.body.querySelector(`*[name=${this.props.with}]`));

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

      let value;

      targetFrom.addEventListener("value", e =>
        {
          value = e.detail.value;;

          if (namespace.props.object) {
            targetWith.value = relFrom.json[`${namespace.props.object}.${targetWith.name}`];
            const evt = new CustomEvent("change", { details: {} });
            targetWith.dispatchEvent(evt);
          }
        }
      );

      targetFrom.addEventListener("update_data", e =>
        {
          if (Util.hasValue(value)) {
            targetFrom.value = value;
          }
        }
      );

      targetWith.addEventListener("change", e =>
        {
          if (relFrom instanceof Combobox) {
            namespace.getData({ id: [relWith.value] });
            return;
          }
        }
      );
      return;
    }
  }

  render() {
    return (
      <div className="relation" ref = { target => this.target = target } />
    );
  }
}

export default Relation;
