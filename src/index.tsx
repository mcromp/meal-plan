import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux";
import Week from "./components/Week/Week";
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Week />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
