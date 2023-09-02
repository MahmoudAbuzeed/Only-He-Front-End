import { takeLatest, put } from "redux-saga/effects";
import { testDashboardSuccess, testDashboardFailed } from "./actions";
import { dashboardConstants } from "./constants";

const watchDashboard = function* () {
  yield takeLatest(dashboardConstants.TEST_DASHBOARD_REQUEST, DashboardSaga);
};

const DashboardSaga = function* () {
  const res = { success: "Hey its Worked :)", failed: "failed :(" };
  try {
    yield put(testDashboardSuccess(res.success));
  } catch (error) {
    yield put(testDashboardFailed(res.failed));
  }
};

export default watchDashboard;
