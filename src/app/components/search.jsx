import React    from "react";
import * as Lib from "../../lib/components";

const IdSearchForm = Lib.Common.IdSearchForm;

class Search extends React.Component {
  render() {
    return <Lib.Common.IdSearchForm name={this.props.name} />
  }
}

export default Search;
