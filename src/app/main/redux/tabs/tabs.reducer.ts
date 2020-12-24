import {createReducer, on} from '@ngrx/store';
import {TabModel} from '../../shared/domains/tab.model';
import {ADD_TAB, GET_ALL_TABS} from './tabs.actions';


export const TABS: TabModel[] = [];

export const tabsReducer = createReducer(TABS,
  on(GET_ALL_TABS, (state: TabModel[]) => {
    return state;
  }),
  on(ADD_TAB, (state: TabModel[], {model}) => {
    const newState: TabModel[] = [];
    const newModel: TabModel = new TabModel('', []);
    state.forEach((elem) => {
        if (elem.name === model.name) {
          elem.hosts.forEach(hstElem => newModel.hosts.push(hstElem));
          newModel.name = elem.name;
          newState.push(newModel);
        } else {
          newState.push(elem);
        }
      }
    );
    if (newState
      .filter((elem) => elem.name === model.name)
      .length === 0) {
      newState.push(model);
    }
    return newState;
  })
);

