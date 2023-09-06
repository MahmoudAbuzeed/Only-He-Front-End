import { all } from "redux-saga/effects";
import watchHome from "./containers/Home/saga";
import watchLogin from "./containers/Login/saga";
import watchRegister from "./containers/Register/saga";
import watchCategories from "./containers/Categories/saga";

const root = function* rootSaga() {
  yield all([watchHome()]);
  yield all([watchLogin()]);
  yield all([watchRegister()]);
  yield all([watchCategories()]);
};

export default root;
