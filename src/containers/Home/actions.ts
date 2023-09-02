/*
 *
 * Home actions
 *
 */

import { homeConstants } from "./constants";

export const testHomeRequest = () => {
  return { type: homeConstants.TEST_HOME_REQUEST };
};

export const testHomeSuccess = (data: any) => {
  return { type: homeConstants.TEST_HOME_SUCCESS, payload: data };
};

export const testHomeFailed = (error: any) => {
  return { type: homeConstants.TEST_HOME_FAILURE, payload: error };
};
