import {CompareModel} from '../../shared/domains/compare.model';
import {createReducer, on} from '@ngrx/store';
import {START_COMPARE, STOP_COMPARE} from './compare.actions';

export const INSTANCE: CompareModel = {hosts: [], compare: false};

export const compareReducer = createReducer(INSTANCE,
  on(START_COMPARE, (state: CompareModel, {}) => {
    console.log('start compare');
    return {...state, compare: true};
  }),
  on(STOP_COMPARE, (state: CompareModel, {}) => {
    console.log('stop compare');
    return {...state, compare: false};
  }),
);

