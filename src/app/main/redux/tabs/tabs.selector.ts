import {createSelector} from '@ngrx/store';
import {AppState} from '../app.state';
import {TabModel} from '../../shared/domains/tab.model';

export const selectTabs = createSelector(
  (state: AppState) => state.tabs,
  (tabs: TabModel[]) => tabs
);
