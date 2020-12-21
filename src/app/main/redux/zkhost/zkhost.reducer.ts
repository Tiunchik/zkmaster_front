import {createReducer, on} from '@ngrx/store';
import {ZkHostModel} from '../../shared/domains/zk-host.model';
import {ZKNODES_EXPML} from '../../shared/constants/constants';
import {LOAD_TREE} from './zkhost.actions';

export const initialState: ZkHostModel[] = [];

export const hostReducer = createReducer(
  initialState,
  on(LOAD_TREE, (state: ZkHostModel[], {tree}) => {
    return [...state, tree];
  })
);
