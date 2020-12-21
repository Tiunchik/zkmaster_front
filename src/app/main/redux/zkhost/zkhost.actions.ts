import {createAction, props} from '@ngrx/store';
import {ZkHostModel} from '../../shared/domains/zk-host.model';

export const LOAD_TREE = createAction('[LOAD_TREE] Load', props<{tree: ZkHostModel}>());

