/*
 *
 * Register actions
 *
 */

import { registerConstants } from "./constants";

export const testRegisterRequest = () => {
  return { type: registerConstants.TEST_REGISTER_REQUEST };
};

export const testRegisterSuccess = (data: any) => {
  return { type: registerConstants.TEST_REGISTER_SUCCESS, payload: data };
};

export const testRegisterFailed = (error: any) => {
  return { type: registerConstants.TEST_REGISTER_FAILURE, payload: error };
};
