import { all } from "redux-saga/effects";
import watchHome from "./containers/Home/saga";
import watchLogin from "./containers/Login/saga";

const root = function* rootSaga() {
  // yield all([watchHome()]);
  yield all([watchLogin()]);
};

export default root;
