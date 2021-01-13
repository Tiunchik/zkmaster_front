import {createSelector} from '@ngrx/store';
import {AppState} from '../app.state';
import {HostModel} from '../../shared/domains/host.model';

export const selectBookmarks = createSelector(
  (state: AppState) => state.hosts,
  (hosts: HostModel[]) => hosts
);
