import { takeLatest, put } from "redux-saga/effects";
import { testUsersSuccess, testUsersFailed } from "./actions";
import { usersConstants } from "./constants";

const watchUsers = function* () {
  yield takeLatest(usersConstants.TEST_USERS_REQUEST, UsersSaga);
};

const UsersSaga = function* () {
  const res = { success: "Hey its Worked :)", failed: "failed :(" };
  try {
    yield put(testUsersSuccess(res.success));
  } catch (error) {
    yield put(testUsersFailed(res.failed));
  }
};

export default watchUsers;
