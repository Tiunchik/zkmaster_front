import {CompareModel} from '../../shared/domains/compare.model';
import {createReducer, on} from '@ngrx/store';
import {ADD_TO_COMPARE, START_COMPARE, STOP_COMPARE} from './compare.actions';

export const INSTANCE: CompareModel = {hosts: [], compare: false};

export const compareReducer = createReducer(INSTANCE,
  on(ADD_TO_COMPARE, (state: CompareModel, {host}) => {
    const newState: CompareModel = new CompareModel([], state.compare);
    state.hosts.forEach(elem => {
        const nextElem = elem.tabName === host.tabName ? host : elem;
        newState.hosts.push(nextElem);
    });
    return state;
  }),
  on(START_COMPARE, (state: CompareModel, {}) => {
    state.compare = true;
    return state;
  }),
  on(STOP_COMPARE, (state: CompareModel, {}) => {
    state.compare = false;
    return state;
  }),
  );

