import {createAction, props} from '@ngrx/store';
import {HostModel} from '../../shared/domains/host.model';


export const CREATE_TAB = createAction('[CREATE_TAB] Create', props<{ host: HostModel }>());
