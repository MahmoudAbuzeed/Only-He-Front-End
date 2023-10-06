/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import history from "./utils/history";
import homeReducer from "./containers/Home/reducer";
import loginReducer from "./containers/Login/reducer";
import registerReducer from "./containers/Register/reducer";
import categoriesReducer from "./containers/Categories/reducer";
import productsReducer from "./containers/Products/reducer";
import ordersReducer from "./containers/Orders/reducer";
import orderDetailsReducer from "./containers/OrderDetails/reducer";

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    home: homeReducer,
    login: loginReducer,
    register: registerReducer,
    categories: categoriesReducer,
    products: productsReducer,
    orders: ordersReducer,
    orderDetails: orderDetailsReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
