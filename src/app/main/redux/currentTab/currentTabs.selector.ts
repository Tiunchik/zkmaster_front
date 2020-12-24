import {createSelector} from '@ngrx/store';
import {AppState} from '../app.state';
import {HostModel} from '../../shared/domains/host.model';

export const selectCurrentTab = createSelector(
  (state: AppState) => state.currentTab,
  (currentTab: string) => currentTab
);
