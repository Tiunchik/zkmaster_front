import {createAction, props} from '@ngrx/store';
import {HostModel} from '../../shared/domains/host.model';

export const ADD_TO_COMPARE = createAction('[ADD_TO_COMPARE]', props<{ host: HostModel }>());

export const START_COMPARE = createAction('[START_COMPARE]');

export const STOP_COMPARE = createAction('[STOP_COMPARE]');
