import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the Users state domain
 */

const selectUsersDomain = (state: any) => state.users || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashboard
 */

const makeSelectUsers = () =>
  createSelector(selectUsersDomain, (substate: any) => substate);

export { selectUsersDomain, makeSelectUsers };
