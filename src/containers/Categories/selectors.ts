import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the Dashboard state domain
 */

const selectCategoriesDomain = (state: any) => state.categories || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashboard
 */

const makeSelectCategories = () => createSelector(selectCategoriesDomain, (substate: any) => substate);

export { selectCategoriesDomain, makeSelectCategories };

