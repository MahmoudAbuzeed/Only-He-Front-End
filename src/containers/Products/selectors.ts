import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the Products state domain
 */

const selectProductsDomain = (state: any) => state.products || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashboard
 */

const makeSelectProducts = () => createSelector(selectProductsDomain, (substate: any) => substate);

export { selectProductsDomain, makeSelectProducts };

