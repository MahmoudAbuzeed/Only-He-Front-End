import { takeLatest, put } from "redux-saga/effects";
import { testOrderDetailsSuccess, testOrderDetailsFailed } from "./actions";
import { orderDetailsConstants } from "./constants";

const watchOrderDetails = function* () {
  yield takeLatest(
    orderDetailsConstants.TEST_ORDER_DETAILS_REQUEST,
    OrderDetailsSaga
  );
};

const OrderDetailsSaga = function* () {
  const res = { success: "Hey its Worked :)", failed: "failed :(" };
  try {
    yield put(testOrderDetailsSuccess(res.success));
  } catch (error) {
    yield put(testOrderDetailsFailed(res.failed));
  }
};

export default watchOrderDetails;
