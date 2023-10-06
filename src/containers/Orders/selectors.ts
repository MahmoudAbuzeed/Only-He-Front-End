import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the Orders state domain
 */

const selectOrdersDomain = (state: any) => state.orders || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashboard
 */

const makeSelectOrders = () =>
  createSelector(selectOrdersDomain, (substate: any) => substate);

export { selectOrdersDomain, makeSelectOrders };
