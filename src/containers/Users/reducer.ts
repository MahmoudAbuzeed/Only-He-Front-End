/*
 *
 * users reducer
 *
 */
import produce from "immer";
import { usersConstants } from "./constants";

export const initialState = {
  loading: false,
  error: null,
  message: "",
};

/* eslint-disable default-case, no-param-reassign */
const usersReducer = (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case usersConstants.TEST_USERS_REQUEST:
        draft.loading = true;
        break;

      case usersConstants.TEST_USERS_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;

      case usersConstants.TEST_USERS_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        break;
    }
  });

export default usersReducer;
