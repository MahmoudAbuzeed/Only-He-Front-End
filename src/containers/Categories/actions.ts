/*
 *
 * categories actions
 *
 */

import { categoriesConstants } from "./constants";

export const testCategoriesRequest = () => {
  return { type: categoriesConstants.TEST_CATEGORIES_REQUEST };
};

export const testCategoriesSuccess = (data: any) => {
  return { type: categoriesConstants.TEST_CATEGORIES_SUCCESS, payload: data };
};

export const testCategoriesFailed = (error: any) => {
  return { type: categoriesConstants.TEST_CATEGORIES_FAILURE, payload: error };
};
