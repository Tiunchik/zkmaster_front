import {createSelector} from '@ngrx/store';
import {AppState} from '../app.state';
import {ZkNodeModel} from '../../shared/domains/zk-node.model';
import {CompareModel} from '../../shared/domains/compare.model';

export const compareSelectorHosts = createSelector(
  (state: AppState) => state.compare,
  (compare: CompareModel) => compare.hosts
);

export const compareSelectorCompare = createSelector(
  (state: AppState) => state.compare,
  (compare: CompareModel) => compare.compare
);
