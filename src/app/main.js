import "../scss/default.scss";

import React    from "react";
import ReactDOM from "react-dom";
import App1     from "./view/app1";

import Config from "./config";

document.addEventListener("DOMContentLoaded", function() {
  let app1 = document.createElement("div");
  app1.id = "app1";
  document.body.appendChild(app1);
  ReactDOM.render(
    <App1></App1>,
    app1
  );
});
