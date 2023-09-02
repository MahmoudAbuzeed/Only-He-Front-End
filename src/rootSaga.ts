import { all } from "redux-saga/effects";
import watchHome from "./containers/Home/saga";
import watchLogin from "./containers/Login/saga";
import watchRegister from "./containers/Register/saga";
import watchDashboard from "./containers/Dashboard/saga";

const root = function* rootSaga() {
  yield all([watchHome()]);
  yield all([watchLogin()]);
  yield all([watchRegister()]);
  yield all([watchDashboard()]);
};

export default root;
