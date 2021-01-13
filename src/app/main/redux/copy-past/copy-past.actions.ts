import {createAction, props} from '@ngrx/store';
import {ZkNodeModel} from '../../shared/domains/zk-node.model';

export const ADD_CLIPBOARD = createAction('[ADD_CLIPBOARD]', props<{ node: ZkNodeModel }>());

export const CLEAN_CLIPBOARD = createAction('[CLEAN_CLIPBOARD]');
