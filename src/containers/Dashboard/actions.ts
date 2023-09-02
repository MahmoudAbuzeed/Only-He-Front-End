/*
 *
 * Dashboard actions
 *
 */

import { dashboardConstants } from "./constants";

export const testDashboardRequest = () => {
  return { type: dashboardConstants.TEST_DASHBOARD_REQUEST };
};

export const testDashboardSuccess = (data: any) => {
  return { type: dashboardConstants.TEST_DASHBOARD_SUCCESS, payload: data };
};

export const testDashboardFailed = (error: any) => {
  return { type: dashboardConstants.TEST_DASHBOARD_FAILURE, payload: error };
};
