import {createSelector} from '@ngrx/store';
import {AppState} from '../app.state';
import {TreeModel} from '../../shared/domains/tree.model';


export const selectTrees = createSelector(
  (state: AppState) => state.trees,
  (trees: TreeModel[]) => trees
);

