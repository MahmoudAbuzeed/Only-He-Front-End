import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App/App";
import configureStore from "./configureStore";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore}>
      <Router>
        <App />
      </Router>
      ,
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
