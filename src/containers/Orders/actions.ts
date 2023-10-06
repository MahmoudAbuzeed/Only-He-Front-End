/*
 *
 * Orders actions
 *
 */

import { ordersConstants } from "./constants";

export const testOrdersRequest = () => {
  return { type: ordersConstants.TEST_ORDERS_REQUEST };
};

export const testOrdersSuccess = (data: any) => {
  return { type: ordersConstants.TEST_ORDERS_SUCCESS, payload: data };
};

export const testOrdersFailed = (error: any) => {
  return { type: ordersConstants.TEST_ORDERS_FAILURE, payload: error };
};
