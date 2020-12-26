import {createReducer, on} from '@ngrx/store';
import {GET_CURRENT_TAB, SET_CURRENT_TAB} from './currentTabs.actions';


export const CURRENT_TAB = 'asdfg';


export const currentTabsReducer = createReducer(CURRENT_TAB,
  on(GET_CURRENT_TAB, (state) => {
    return state;
  }),
  on(SET_CURRENT_TAB, ((state, {name}) => {
    return name;
  })));
