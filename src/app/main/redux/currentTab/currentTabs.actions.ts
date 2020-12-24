import {createAction, props} from '@ngrx/store';


export const GET_CURRENT_TAB = createAction('[GET CURRENT TAB]');

export const SET_CURRENT_TAB = createAction('[SET CURRENT TAB]', props<{name: string}>());
