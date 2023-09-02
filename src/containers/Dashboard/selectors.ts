import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the Dashboard state domain
 */

const selectDashboardDomain = (state: any) => state.dashboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashboard
 */

const makeSelectDashboard = () => createSelector(selectDashboardDomain, (substate: any) => substate);

export { selectDashboardDomain, makeSelectDashboard };
