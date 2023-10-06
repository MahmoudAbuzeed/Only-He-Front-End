/*
 *
 * users actions
 *
 */

import { usersConstants } from "./constants";

export const testUsersRequest = () => {
  return { type: usersConstants.TEST_USERS_REQUEST };
};

export const testUsersSuccess = (data: any) => {
  return { type: usersConstants.TEST_USERS_SUCCESS, payload: data };
};

export const testUsersFailed = (error: any) => {
  return { type: usersConstants.TEST_USERS_FAILURE, payload: error };
};
