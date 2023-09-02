import { takeLatest, put } from "redux-saga/effects";
import { testRegisterSuccess, testRegisterFailed } from "./actions";
import { registerConstants } from "./constants";

const watchRegister = function* () {
  yield takeLatest(registerConstants.TEST_REGISTER_REQUEST, RegisterSaga);
};

const RegisterSaga = function* () {
  const res = { success: "Hey its Worked :)", failed: "failed :(" };
  try {
    yield put(testRegisterSuccess(res.success));
  } catch (error) {
    yield put(testRegisterFailed(res.failed));
  }
};

export default watchRegister;
