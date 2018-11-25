import store from "../redux/store/index.js";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import Root from "./Root.js";

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("app")
);