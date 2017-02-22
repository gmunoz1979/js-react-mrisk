import React from "react";
import Form  from "./form/form";
import Util from "../util";

class Relation extends React.Component {

  componentDidMount() {
    const app      = this.target.closest(".app");
    const formTo   = Util.findReact(this.target.closest("form"));
    const formWith = app.querySelector(`*[name=${this.props.with}]`);

    formWith.addEventListener("new", e => {
      formTo.clear();
      formTo.setState({ mode: Form.ModeType.NEW });
    });

    formWith.addEventListener("edit", e => {
      formTo.setState({ mode: Form.ModeType.EDIT });
      formTo.fetchById([e.detail.id]);
    });

    formWith.addEventListener("view", e => {
      formTo.setState({ mode: Form.ModeType.VIEW });
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
