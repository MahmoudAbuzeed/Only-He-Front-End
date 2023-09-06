import { takeLatest, put } from "redux-saga/effects";
import { testProductsSuccess, testProductsFailed } from "./actions";
import { productsConstants } from "./constants";

const watchProducts = function* () {
  yield takeLatest(productsConstants.TEST_PRODUCTS_REQUEST, ProductsSaga);
};

const ProductsSaga = function* () {
  const res = { success: "Hey its Worked :)", failed: "failed :(" };
  try {
    yield put(testProductsSuccess(res.success));
  } catch (error) {
    yield put(testProductsFailed(res.failed));
  }
};

export default watchProducts;
