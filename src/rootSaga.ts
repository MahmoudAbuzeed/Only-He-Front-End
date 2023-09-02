import { all } from "redux-saga/effects";
import watchHome from "./containers/Home/saga";

const root = function* rootSaga() {
  yield all([watchHome()]);
};

export default root;
