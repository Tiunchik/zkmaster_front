import {createSelector} from '@ngrx/store';
import {MenuButtonModel} from '../../shared/domains/menu-button.model';
import {AppState} from '../app.state';

export const selectButtons = createSelector(
  (state: AppState) => state.buttons,
  (buttons: MenuButtonModel[]) => buttons
);
