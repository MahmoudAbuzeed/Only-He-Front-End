/*
 *
 * Home reducer
 *
 */
import produce from "immer";
import { homeConstants } from "./constants";

export const initialState = {
  loading: false,
  error: null,
  message: "",
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case homeConstants.TEST_HOME_REQUEST:
        draft.loading = true;
        break;

      case homeConstants.TEST_HOME_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;

      case homeConstants.TEST_HOME_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        break;
    }
  });

export default homeReducer;
