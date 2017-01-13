import React  from "react";
import Button from "./button";

class ButtonSearch extends Button {

  async search(params) {
    try {
      let data = await this.getData(params);
      this.props.action.call(this, data);
    } catch(e) {
      this.props.actionError.call(this);
      console.warn(e);
    }
  }

  handlerClick() {
    let form  = this.field.closest("form");
    let field = form.querySelector(`*[name=${this.props.fieldSearch}]`);

    this.search({ id: [field.value] });
  }
}

ButtonSearch.defaultProps = {
  autoRouter:  false,
  action:      function() {},
  actionError: function() {}
};

export default ButtonSearch;
