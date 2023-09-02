import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the register state domain
 */

const selectRegisterDomain = (state: any) => state.register || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by register
 */

const makeSelectRegister = () => createSelector(selectRegisterDomain, (substate: any) => substate);

export { selectRegisterDomain, makeSelectRegister };
