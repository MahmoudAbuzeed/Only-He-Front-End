import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the Login state domain
 */

const selectLoginDomain = (state: any) => state.login || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Login
 */

const makeSelectLogin = () => createSelector(selectLoginDomain, (substate: any) => substate);

export { selectLoginDomain, makeSelectLogin };
