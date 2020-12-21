import {createSelector} from '@ngrx/store';
import {AppState} from '../app.state';
import {ZkHostModel} from '../../shared/domains/zk-host.model';


export const selectZkHosts = createSelector(
  (state: AppState) => state.zkHost,
  (zkHost: ZkHostModel[]) => zkHost
);

