import React  from "react";
import Config from "../../config";

class Form extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      width: 0
    }
  }

  getUrl() {
    return Config.Url     + "/" +
           Config.Context + "/" +
           Config.Handler + "/" +
           this.props.namespace + "/" +
           "fetchById.json";
  }

  async getData(params) {
    let url = this.getUrl() + (params ? "?options=" + JSON.stringify(params) : "");

    try {
      let response = await fetch(url);
      let json     = await response.json();
      let fields   = {};

      for (let [k, v] of Object.entries(json)) {
        fields[k] = this.form.querySelector(`*[name=${k}]`);
      }

      return [json, fields];
    } catch(err) {
      console.error(err);
    }
  }

  componentDidMount() {
    this.setState({ width: this.form.clientWidth });

    if (this.props.fieldKey) {
      let field = this.form.querySelector(`*[name=${this.props.fieldKey}]`);
      field.addEventListener("change", e =>
        {
          let target = e.currentTarget;
          this.getData({ id: [target.value] }).then(data =>
            {
              let [json, fields] = data;

              for (let [k, field] of Object.entries(fields)) {
                if (field) {
                  if (field.type === "checkbox") {
                    field.checked = json[k];
                    return;
                  }
                  field.value = json[k];
                }
              }
            }
          );
        }
      );
    }
  }

  render() {
    return (
      <form autoComplete="off"
        ref={ form => {this.form = form;} }
        >
        { React.Children.map(this.props.children, c => React.cloneElement(c, { width: this.state.width })) }
      </form>
    );
  }
}

export default Form;
