import React from "react";

class Form extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      width: 0
    }
  }

  componentDidMount() {
    this.setState({ width: this.form.clientWidth });
  }

  render() {
    return (
      <form autoComplete="off"
        ref={ form => {this.form = form;} }
        >
        {React.cloneElement(this.props.children, {
          width: this.state.width
        })}
      </form>
    );
  }
}

export default Form;
