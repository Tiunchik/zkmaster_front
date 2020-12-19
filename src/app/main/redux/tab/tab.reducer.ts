import {createReducer, on} from '@ngrx/store';
import {CREATE_TAB} from './tab.actions';
import {HostModel} from '../../shared/domains/host.model';


export const LEFT: HostModel[] = [];

export const leftReducer = createReducer(LEFT,
  on(CREATE_TAB, (state: HostModel[], {host}) => {
    const newState: HostModel[] = [];
    state.forEach(val => newState.push(val));
    newState.push(host);
    return newState;
  })
);
