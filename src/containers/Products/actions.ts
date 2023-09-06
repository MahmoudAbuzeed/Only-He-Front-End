/*
 *
 * Products actions
 *
 */

import { productsConstants } from "./constants";

export const testProductsRequest = () => {
  return { type: productsConstants.TEST_PRODUCTS_REQUEST };
};

export const testProductsSuccess = (data: any) => {
  return { type: productsConstants.TEST_PRODUCTS_SUCCESS, payload: data };
};

export const testProductsFailed = (error: any) => {
  return { type: productsConstants.TEST_PRODUCTS_FAILURE, payload: error };
};
