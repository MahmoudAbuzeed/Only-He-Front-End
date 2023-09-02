import { takeLatest, put } from "redux-saga/effects";
import { testLoginSuccess, testLoginFailed } from "./actions";
import { loginConstants } from "./constants";

const watchLogin = function* () {
  yield takeLatest(loginConstants.TEST_LOGIN_REQUEST, LoginSaga);
};

const LoginSaga = function* () {
  const res = { success: "Hey its Worked :)", failed: "failed :(" };
  try {
    yield put(testLoginSuccess(res.success));
  } catch (error) {
    yield put(testLoginFailed(res.failed));
  }
};

export default watchLogin;