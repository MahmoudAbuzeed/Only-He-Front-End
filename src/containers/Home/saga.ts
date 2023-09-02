import { takeLatest, put } from "redux-saga/effects";
import { testHomeSuccess, testHomeFailed } from "./actions";
import { homeConstants } from "./constants";

const watchHome = function* () {
  yield takeLatest(homeConstants.TEST_HOME_REQUEST, HomeSaga);
};

const HomeSaga = function* () {
  const res = { success: "Hey its Worked :)", failed: "failed :(" };
  try {
    yield put(testHomeSuccess(res.success));
  } catch (error) {
    yield put(testHomeFailed(res.failed));
  }
};

export default watchHome;

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
// function* fetchUser(action) {
//     try {
//        const user = yield call(Api.fetchUser, action.payload.userId);
//        yield put({type: "USER_FETCH_SUCCEEDED", user: user});
//     } catch (e) {
//        yield put({type: "USER_FETCH_FAILED", message: e.message});
//     }
//  }
