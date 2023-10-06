import { all } from "redux-saga/effects";
import watchHome from "./containers/Home/saga";
import watchLogin from "./containers/Login/saga";
import watchRegister from "./containers/Register/saga";
import watchCategories from "./containers/Categories/saga";
import watchProducts from "./containers/Products/saga";
import watchOrders from "./containers/Orders/saga";
import watchOrderDetails from "./containers/OrderDetails/saga";

const root = function* rootSaga() {
  yield all([watchHome()]);
  yield all([watchLogin()]);
  yield all([watchRegister()]);
  yield all([watchCategories()]);
  yield all([watchProducts()]);
  yield all([watchOrders()]);
  yield all([watchOrderDetails()]);
};

export default root;
