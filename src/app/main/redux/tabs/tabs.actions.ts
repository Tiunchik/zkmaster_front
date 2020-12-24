import {createAction, props} from '@ngrx/store';
import {TabModel} from '../../shared/domains/tab.model';


export const GET_ALL_TABS = createAction('[GET ALL TABS]');

export const ADD_TAB = createAction('[ADD TAB]', props<{ model: TabModel }>());
