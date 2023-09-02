/*
 *
 * dashboard reducer
 *
 */
import produce from "immer";
import { dashboardConstants } from "./constants";

export const initialState = {
  loading: false,
  error: null,
  message: "",
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case dashboardConstants.TEST_DASHBOARD_REQUEST:
        draft.loading = true;
        break;

      case dashboardConstants.TEST_DASHBOARD_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;

      case dashboardConstants.TEST_DASHBOARD_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        break;
    }
  });

export default dashboardReducer;
