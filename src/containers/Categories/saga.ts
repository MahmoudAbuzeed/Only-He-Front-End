import { takeLatest, put } from "redux-saga/effects";
import { testCategoriesSuccess, testCategoriesFailed } from "./actions";
import { categoriesConstants } from "./constants";

const watchCategories = function* () {
  yield takeLatest(categoriesConstants.TEST_CATEGORIES_REQUEST, CategoriesSaga);
};

const CategoriesSaga = function* () {
  const res = { success: "Hey its Worked :)", failed: "failed :(" };
  try {
    yield put(testCategoriesSuccess(res.success));
  } catch (error) {
    yield put(testCategoriesFailed(res.failed));
  }
};

export default watchCategories;
