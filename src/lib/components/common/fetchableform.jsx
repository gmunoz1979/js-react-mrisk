import React  from "react";
import Form   from "../form/form";
import Router from "../router";
import Util   from "../../util";

class FetchableForm extends Form {

  static defaultProps = {
    mode:          Form.ModeType.VIEW,
    handlerSubmit: function() {}
  };

  fetchById(filter) {
    const router = Util.findReact(this.form.querySelector(".router"));
    return router.fetchById(filter);
  }

  render(children=this.props.children) {
    children = React.Children.toArray(children);

    children.unshift(
      <Router
        autoLoad      = { false }
        namespace     = { this.props.namespace }
        handlerAction = { this.setData.bind(this) }
      />
    );

    return super.render(children);
  }
}

export default FetchableForm;
