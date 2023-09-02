/*
 *
 * Login reducer
 *
 */
import produce from "immer";
import { loginConstants } from "./constants";

export const initialState = {
  loading: false,
  error: null,
  message: "",
};

const loginReducer = (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case loginConstants.TEST_LOGIN_REQUEST:
        draft.loading = true;
        break;

      case loginConstants.TEST_LOGIN_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;

      case loginConstants.TEST_LOGIN_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        break;
    }
  });

export default loginReducer;
