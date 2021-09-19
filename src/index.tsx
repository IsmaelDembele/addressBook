import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import App from "./Components/App";
import { Provider } from "react-redux";
import { store } from "./app/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
