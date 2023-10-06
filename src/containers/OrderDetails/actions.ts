/*
 *
 * OrderDetails actions
 *
 */

import { orderDetailsConstants } from "./constants";

export const testOrderDetailsRequest = () => {
  return { type: orderDetailsConstants.TEST_ORDER_DETAILS_REQUEST };
};

export const testOrderDetailsSuccess = (data: any) => {
  return {
    type: orderDetailsConstants.TEST_ORDER_DETAILS_SUCCESS,
    payload: data,
  };
};

export const testOrderDetailsFailed = (error: any) => {
  return {
    type: orderDetailsConstants.TEST_ORDER_DETAILS_FAILURE,
    payload: error,
  };
};
