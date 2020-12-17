import {createReducer, on} from '@ngrx/store';
import {CREATE_TAB} from './tab.actions';


export const LEFT: string[] = [];

export const leftReducer = createReducer(LEFT,
  on(CREATE_TAB, (state: string[], {str}) => {
    const newState: string[] = [];
    state.forEach(val => newState.push(val));
    newState.push(str);
    return newState;
  })
);
