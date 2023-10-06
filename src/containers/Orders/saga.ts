import { takeLatest, put } from "redux-saga/effects";
import { testOrdersSuccess, testOrdersFailed } from "./actions";
import { ordersConstants } from "./constants";

const watchOrders = function* () {
  yield takeLatest(ordersConstants.TEST_ORDERS_REQUEST, OrdersSaga);
};

const OrdersSaga = function* () {
  const res = { success: "Hey its Worked :)", failed: "failed :(" };
  try {
    yield put(testOrdersSuccess(res.success));
  } catch (error) {
    yield put(testOrdersFailed(res.failed));
  }
};

export default watchOrders;
