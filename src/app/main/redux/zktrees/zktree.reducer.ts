import {createReducer, on} from '@ngrx/store';
import {TreeModel} from '../../shared/domains/tree.model';
import {ADD_TREE} from './zktree.actions';
import {HostModel} from '../../shared/domains/host.model';

export const initialState: TreeModel[] = [];

export const treeReducer = createReducer(
  initialState,
  on(ADD_TREE, (state: TreeModel[], {tree}) => {
    let newState: TreeModel[] = [];
    if (state.filter(elem => elem.host === tree.host).length > 1) {
      state.forEach((elem) => {
        if (elem.host === tree.host) {
          newState.push(tree);
        } else {
          newState.push(elem);
        }
      });
    } else {
      newState = [...state, tree];
    }
    return newState;
  })
);
