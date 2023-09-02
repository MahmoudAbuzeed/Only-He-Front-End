import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the home state domain
 */

const selectHomeDomain = (state: any) => state.home || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by home
 */

const makeSelectHome = () => createSelector(selectHomeDomain, (substate: any) => substate);

export { selectHomeDomain, makeSelectHome };
