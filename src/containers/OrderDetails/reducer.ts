/*
 *
 * orderDetails reducer
 *
 */
import produce from "immer";
import { orderDetailsConstants } from "./constants";

export const initialState = {
  loading: false,
  error: null,
  message: "",
};

/* eslint-disable default-case, no-param-reassign */
const orderDetailsReducer = (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case orderDetailsConstants.TEST_ORDER_DETAILS_REQUEST:
        draft.loading = true;
        break;

      case orderDetailsConstants.TEST_ORDER_DETAILS_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;

      case orderDetailsConstants.TEST_ORDER_DETAILS_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        break;
    }
  });

export default orderDetailsReducer;
