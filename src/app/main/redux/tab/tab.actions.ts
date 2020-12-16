import {createAction, props} from '@ngrx/store';


export const CREATE_TAB = createAction(
  '[CREATE_TAB] Create',
  props<{ str: string }>()
);
