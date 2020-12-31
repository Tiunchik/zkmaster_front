import {createReducer, on} from '@ngrx/store';
import {HostModel} from '../../shared/domains/host.model';
import {ADD_BOOKMARK, GET_BOOKMARKS_FROM_STORAGE, REMOVE_BOOKMARK} from './host.actions';
import {BOOKMARK} from '../../shared/constants/constants';


export const BOOKMARKS: HostModel[] = [];

export const hostReducer = createReducer(BOOKMARKS,
  on(GET_BOOKMARKS_FROM_STORAGE, (state: HostModel[]) => {
    let newState: HostModel[] = [];
    const savedState = localStorage.getItem(BOOKMARK);
    if (savedState === 'undefined'
      || savedState == null
      || savedState === '') {
      localStorage.setItem(BOOKMARK, JSON.stringify(state));
    } else {
      newState = JSON.parse(savedState);
    }
    return newState.length > state.length ? newState : state;
  }),
  on(ADD_BOOKMARK, (state: HostModel[], {model}) => {
    const newState = [...state, model];
    localStorage.setItem(BOOKMARK, JSON.stringify(newState));
    return newState;
  }),
  on(REMOVE_BOOKMARK, (state: HostModel[], {model}) => {
    return state.filter((elem) => elem.name !== model.name && elem.address !== model.address);
  })
);

