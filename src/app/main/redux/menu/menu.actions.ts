import {createAction, props} from '@ngrx/store';
import {MenuButtonModel} from '../../shared/domains/menu-button.model';

/* Toolbar actions */
export const SHOW_TOOLBAR_BUTTON = createAction('[Menu component] Show', props<{ button: MenuButtonModel }>());

export const HIDE_TOOLBAR_BUTTON = createAction('[Menu component] Hide', props<{ button: MenuButtonModel }>());

/* Menu actions */
export const LOAD_SETTINGS = createAction('[Menu component] load settings');

/* Menu button's actions */
// like "check connection", "create connection" and others...
export const ADD_CONNECTION = createAction('[Menu component] add connection', props<{ button: MenuButtonModel }>());

export const CHECK_CONNECTIONS = createAction('[Menu component] add connection', props<{ button: MenuButtonModel }>());
