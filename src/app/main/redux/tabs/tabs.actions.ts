import {createAction, props} from '@ngrx/store';
import {TabModel} from '../../shared/domains/tab.model';


export const GET_ALL_TABS = createAction('[GET ALL TABS]');

export const ADD_TAB = createAction('[ADD TAB]', props<{ model: TabModel }>());

export const REMOVE_TAB = createAction('[REMOVE TAB]', props<{ name: string }>());

export const CHANGE_POSITION = createAction('[CHANGE POSITION]', props<{ tabName: string, prevNum: number, newNum: number }>());

export const MOVE_TO_TAB = createAction('[CHANGE POSITION]', props<{ model: TabModel[] }>());