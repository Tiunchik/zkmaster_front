import {createAction, props} from '@ngrx/store';
import {TabModel} from '../../shared/domains/tab.model';
import {HostModel} from '../../shared/domains/host.model';


export const GET_ALL_TABS = createAction('[GET ALL TABS]');

export const SAVE_ALL_TABS = createAction('[SAVE ALL TABS]');

export const ADD_TAB = createAction('[ADD TAB]', props<{ model: TabModel }>());

export const REMOVE_TABBAR = createAction('[REMOVE TABBAR]', props<{ name: string }>());

export const REMOVE_TAB = createAction('[REMOVE TAB]', props<{ model: HostModel, index: number }>());

export const SPLIT_TAB = createAction('[SPLIT TAB]',
  props<{ oldTabBarName: string, newTabBarName: string, prevInd: number }>());

export const MOVE_TABBAR = createAction('[CHANGE POSITION]',
  props<{ tabBarName: string, prevInd: number, newInd: number }>());

export const TRANSFER_TABBAR = createAction('[CHANGE POSITION]',
  props<{ oldTabBarName: string, newTabBarName: string, prevInd: number, newInd: number }>());
