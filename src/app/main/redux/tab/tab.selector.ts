import {createSelector} from '@ngrx/store';
import {AppState} from '../app.state';
import {HostModel} from '../../shared/domains/host.model';

export const selectLeftTab = createSelector(
  (state: AppState) => state.leftTabs,
  (leftTabs: HostModel[]) => leftTabs
);
