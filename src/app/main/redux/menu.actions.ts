import {createAction, props} from '@ngrx/store';
import {MenuButtonModel} from '../shared/domains/menu-button.model';

export const show = createAction('[Menu component] Show', props<{ button: MenuButtonModel }>());

export const hide = createAction('[Menu component] Hide', props<{ button: MenuButtonModel }>());
