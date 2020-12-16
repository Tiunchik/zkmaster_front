import {createReducer, on} from '@ngrx/store';
import {CREATE_TAB} from './tab.actions';


export const LEFT: string[] = ['1', '2'];

export const leftReducer = createReducer(LEFT,
  on(CREATE_TAB, (state: string[], {str}) => {
    console.log(`Host == ${str} type of == ${typeof str}`);
    const newState: string[] = [];
    state.forEach(val => newState.push(val));
    console.log(`NewState == ${newState}`);
    newState.push(str);
    console.log(`NewState after push ${newState}`);
    return newState;
  })
);
