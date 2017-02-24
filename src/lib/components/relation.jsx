import React from "react";
import Form  from "./form/form";
import Util from "../util";

class Relation extends React.Component {

  componentDidMount() {
    const app      = this.target.closest(".app");
    const formTo   = Util.findReact(this.target.closest("form"));
    const formWith = app.querySelector(`*[name=${this.props.with}]`);

    console.debug(typeof(formWith));

    formWith.addEventListener("new", e => {
      formTo.clear();
    });

    formWith.addEventListener("edit", e => {
      formTo.fetchById([e.detail.id]);
    });

    formWith.addEventListener("view", e => {
      formTo.fetchById([e.detail.id]);
    });
  }

  render() {
    return (
      <div className="relation" ref = { target => this.target = target } />
    );
  }
}

export default Relation;
