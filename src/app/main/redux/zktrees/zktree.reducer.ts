import {createReducer, on} from '@ngrx/store';
import {TreeModel} from '../../shared/domains/tree.model';
import {ADD_TREE} from './zktree.actions';

export const initialState: TreeModel[] = [];

export const treeReducer = createReducer(
  initialState,
  on(ADD_TREE, (state: TreeModel[], {tree}) => {
    let newState: TreeModel[] = state.filter(elem => elem.host !== tree.host);
    newState = [...newState, tree];
    return newState;
  })
);
