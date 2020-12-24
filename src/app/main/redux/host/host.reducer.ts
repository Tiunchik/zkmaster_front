import {createReducer, on} from '@ngrx/store';
import {TabModel} from '../../shared/domains/tab.model';
import {HostModel} from '../../shared/domains/host.model';
import {ADD_HOST} from './host.actions';


export const TABS: HostModel[] = [];

export const hostReducer = createReducer(TABS,
  on(ADD_HOST, (state: HostModel[], {model}) => {
    return [...state, model];
  })
);

