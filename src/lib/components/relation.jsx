import React         from "react";
import FetchableForm from "./common/fetchableform";
import IdSearchForm  from "./common/idsearchform";
import Combobox      from "./form/combobox";
import Util          from "../util";

class Relation extends React.Component {

  componentDidMount() {
    const relTo   = Util.findReact(this.target.closest(".combobox")) ||
                    Util.findReact(this.target.closest("form"));
    const relWith = Util.findReact(document.body.querySelector(`*[name=${this.props.with}]`));

    if (relWith instanceof IdSearchForm) {
      relWith.form.addEventListener("new", e => {
        relTo instanceof FetchableForm &&
          relTo.clear();
      });

      relWith.form.addEventListener("edit", e => {
        relTo instanceof FetchableForm &&
          relTo.fetchById([e.detail.id]);
      });

      relWith.form.addEventListener("view", e => {
        relTo instanceof FetchableForm &&
          relTo.fetchById([e.detail.id]);
      });

      return;
    }

    if (relWith instanceof Combobox) {
      const target = relWith._field;
      target.addEventListener("change", e =>
        {
          if (relTo instanceof Combobox) {
            let namespace = relTo._field.parentNode.querySelector(".namespace");
            namespace = Util.findReact(namespace);
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
