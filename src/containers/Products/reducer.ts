/*
 *
 * products reducer
 *
 */
import produce from "immer";
import { productsConstants } from "./constants";

export const initialState = {
  loading: false,
  error: null,
  message: "",
};

/* eslint-disable default-case, no-param-reassign */
const productsReducer = (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case productsConstants.TEST_PRODUCTS_REQUEST:
        draft.loading = true;
        break;

      case productsConstants.TEST_PRODUCTS_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;

      case productsConstants.TEST_PRODUCTS_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        break;
    }
  });

export default productsReducer;
