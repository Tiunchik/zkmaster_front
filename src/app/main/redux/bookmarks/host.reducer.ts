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
    let newState = [...state];
    const findRepeat = state.filter((elem) => elem.address === model.address);
    if (findRepeat.length > 0) {
      const index = state.indexOf(findRepeat.shift());
      newState.splice(index, 1, model);
    } else {
      newState = [...state, model];
    }
    console.log(newState);
    localStorage.setItem(BOOKMARK, JSON.stringify(newState));
    return newState;
  }),
  on(REMOVE_BOOKMARK, (state: HostModel[], {index}) => {
    const newState = [...state];
    newState.splice(index, 1);
    localStorage.setItem(BOOKMARK, JSON.stringify(newState));
    return newState;
  })
);

