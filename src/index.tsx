import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux";
import './index.css'
import { Test } from "./components/test/test";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Test />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
