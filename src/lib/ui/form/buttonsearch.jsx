import React  from "react";
import Button from "./button";

class ButtonSearch extends Button {
  handlerClick() {
    let form  = this.field.closest("form");
    let field = form.querySelector(`*[name=${this.props.fieldSearch}]`);

    this.getData({ id: [field.value] }).then(data => this.props.action.call(this, data));
  }
}

ButtonSearch.defaultProps = {
  autoRouter: false,
  action: function() {}
};

export default ButtonSearch;
