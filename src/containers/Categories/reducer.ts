/*
 *
 * categories reducer
 *
 */
import produce from "immer";
import { categoriesConstants } from "./constants";

export const initialState = {
  loading: false,
  error: null,
  message: "",
};

/* eslint-disable default-case, no-param-reassign */
const categoriesReducer = (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case categoriesConstants.TEST_CATEGORIES_REQUEST:
        draft.loading = true;
        break;

      case categoriesConstants.TEST_CATEGORIES_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;

      case categoriesConstants.TEST_CATEGORIES_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        break;
    }
  });

export default categoriesReducer;
