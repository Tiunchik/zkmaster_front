import {createAction, props} from '@ngrx/store';
import {HostModel} from '../../shared/domains/host.model';


export const ADD_HOST = createAction('[ADD TAB]', props<{ model: HostModel }>());
