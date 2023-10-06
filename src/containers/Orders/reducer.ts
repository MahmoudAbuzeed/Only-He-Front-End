/*
 *
 * orders reducer
 *
 */
import produce from "immer";
import { ordersConstants } from "./constants";

export const initialState = {
  loading: false,
  error: null,
  message: "",
};

/* eslint-disable default-case, no-param-reassign */
const ordersReducer = (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ordersConstants.TEST_ORDERS_REQUEST:
        draft.loading = true;
        break;

      case ordersConstants.TEST_ORDERS_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;

      case ordersConstants.TEST_ORDERS_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        break;
    }
  });

export default ordersReducer;
