/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";

import homeReducer from "./containers/Home/reducer";
import loginReducer from "./containers/Login/reducer";
import registerReducer from "./containers/Register/reducer";
import categoriesReducer from "./containers/Categories/reducer";
import productsReducer from "./containers/Products/reducer";
import productDetailsReducer from "./containers/ProductDetails/reducer";
import ordersReducer from "./containers/Orders/reducer";
import orderDetailsReducer from "./containers/OrderDetails/reducer";
import usersReducer from "./containers/Users/reducer";

const rootReducer = combineReducers({
  home: homeReducer,
  login: loginReducer,
  register: registerReducer,
  categories: categoriesReducer,
  products: productsReducer,
  product: productDetailsReducer,
  orders: ordersReducer,
  orderDetails: orderDetailsReducer,
  users: usersReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
