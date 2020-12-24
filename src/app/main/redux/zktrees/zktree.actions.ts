import {createAction, props} from '@ngrx/store';
import {TreeModel} from '../../shared/domains/tree.model';

export const ADD_TREE = createAction('[LOAD_TREE] Load', props<{tree: TreeModel}>());



