import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App/App";
import reportWebVitals from "./reportWebVitals";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import history from "./utils/history";
import configureStore from "./configureStore";

const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  MOUNT_NODE
);

reportWebVitals();
