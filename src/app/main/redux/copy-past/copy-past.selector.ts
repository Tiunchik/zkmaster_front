import {createSelector} from '@ngrx/store';
import {AppState} from '../app.state';
import {ZkNodeModel} from '../../shared/domains/zk-node.model';

export const copyPastData = createSelector(
  (state: AppState) => state.copyPast,
  (copyPast: ZkNodeModel) => copyPast
);
