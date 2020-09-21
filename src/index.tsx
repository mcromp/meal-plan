import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux";

import './index.css'
import Week from "./components/Week";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Week />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
