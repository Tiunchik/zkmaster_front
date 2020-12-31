import {createAction, props} from '@ngrx/store';
import {HostModel} from '../../shared/domains/host.model';

export const GET_BOOKMARKS_FROM_STORAGE = createAction(('[GET_BOOKMARKS_FROM_STORAGE]'));

export const ADD_BOOKMARK = createAction('[ADD_BOOKMARK]', props<{ model: HostModel }>());

export const REMOVE_BOOKMARK = createAction('[REMOVE_BOOKMARK]', props<{ model: HostModel }>());
