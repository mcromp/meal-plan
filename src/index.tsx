import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux";
import Login from "./components/Login";
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Login />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
