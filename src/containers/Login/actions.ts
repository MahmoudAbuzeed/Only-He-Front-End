/*
 *
 * Login actions
 *
 */

import { loginConstants } from "./constants";

export const testLoginRequest = () => {
  return { type: loginConstants.TEST_LOGIN_REQUEST };
};

export const testLoginSuccess = (data: any) => {
  return { type: loginConstants.TEST_LOGIN_SUCCESS, payload: data };
};

export const testLoginFailed = (error: any) => {
  return { type: loginConstants.TEST_LOGIN_FAILURE, payload: error };
};
