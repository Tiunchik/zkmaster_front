import {createSelector} from '@ngrx/store';
import {AppState} from '../app.state';

export const selectLeftTab = createSelector(
  (state: AppState) => state.leftTabs,
  (leftTabs: string[]) => leftTabs
);
