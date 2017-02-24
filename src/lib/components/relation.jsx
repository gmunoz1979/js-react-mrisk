import React         from "react";
import FetchableForm from "./common/fetchableform";
import IdSearchForm  from "./common/idsearchform";
import Util          from "../util";

class Relation extends React.Component {

  componentDidMount() {
    const relTo   = Util.findReact(this.target.closest("form"));
    const relWith = Util.findReact(document.body.querySelector(`*[name=${this.props.with}]`));

    if (relWith instanceof IdSearchForm) {
      relWith.form.addEventListener("new", e => {
        relTo.clear();
      });

      relWith.form.addEventListener("edit", e => {
        relTo.fetchById([e.detail.id]);
      });

      relWith.form.addEventListener("view", e => {
        relTo.fetchById([e.detail.id]);
      });
    }
  }

  render() {
    return (
      <div className="relation" ref = { target => this.target = target } />
    );
  }
}

export default Relation;
