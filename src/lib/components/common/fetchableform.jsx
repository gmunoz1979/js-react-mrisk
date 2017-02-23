import React     from "react";
import Form      from "../form/form";
import Namespace from "../namespace";
import Util      from "../../util";

class FetchableForm extends Form {

  static defaultProps = {
    mode:          Form.ModeType.VIEW,
    handlerSubmit: function() {}
  };

  fetchById(filter) {
    const namespace = Util.findReact(this.form.querySelector(".namespace"));
    return namespace.fetchById(filter);
  }

  render(children=this.props.children) {
    children = React.Children.toArray(children);

    children.unshift(
      <Namespace
        autoLoad      = { false }
        path          = { this.props.namespace }
        handlerAction = { this.setData.bind(this) }
      />
    );

    return super.render(children);
  }
}

export default FetchableForm;
