import React  from "react";

class ModeForm extends React.Component {

  static mode = { NEW: 0, EDIT: 1, VIEW: 2 }

  static defaultProps = {
    mode: ModeForm.mode.VIEW
  }

  state = { mode: null }

  componentWillMount() {
    this.setState({ mode: this.props.mode });
  }

  render() {
    return (
      <div className="modeform"></div>
    );
  }
}

export default ModeForm;
