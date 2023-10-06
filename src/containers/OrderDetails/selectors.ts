import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the OrderDetails state domain
 */

const selectOrderDetailsDomain = (state: any) =>
  state.orderDetails || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashboard
 */

const makeSelectOrderDetails = () =>
  createSelector(selectOrderDetailsDomain, (substate: any) => substate);

export { selectOrderDetailsDomain, makeSelectOrderDetails };
