/*
 *
 * Register reducer
 *
 */
import produce from "immer";
import { registerConstants } from "./constants";

export const initialState = {
  loading: false,
  error: null,
  message: "",
};

/* eslint-disable default-case, no-param-reassign */
const registerReducer = (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case registerConstants.TEST_REGISTER_REQUEST:
        draft.loading = true;
        break;

      case registerConstants.TEST_REGISTER_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;

      case registerConstants.TEST_REGISTER_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        break;
    }
  });

export default registerReducer;
