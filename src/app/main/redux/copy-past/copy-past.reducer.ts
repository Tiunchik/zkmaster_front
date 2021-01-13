import {ZkNodeModel} from '../../shared/domains/zk-node.model';
import {createReducer, on} from '@ngrx/store';
import {ADD_CLIPBOARD, CLEAN_CLIPBOARD} from './copy-past.actions';

export const INSTANCE: ZkNodeModel = null;

export const copyPastReducer = createReducer(INSTANCE,
  on(ADD_CLIPBOARD, (state: ZkNodeModel, {node}) => {
    return node;
  }),
  on(CLEAN_CLIPBOARD, (state: ZkNodeModel) => {
    return null;
  }));
