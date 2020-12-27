import {createReducer, on} from '@ngrx/store';
import {TabModel} from '../../shared/domains/tab.model';
import {ADD_TAB, CHANGE_POSITION, GET_ALL_TABS, REMOVE_TAB} from './tabs.actions';
import {HostModel} from '../../shared/domains/host.model';


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
          model.hosts.forEach(hstElem => newModel.hosts.push(hstElem));
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
  }),
  on(REMOVE_TAB, (state: TabModel[], {name}) => {
    const newState: TabModel[] = [];
    state.forEach((elem) => {
      if (elem.name !== name) {
        newState.push(elem);
      }
    });
    return newState;
  }),
  on(CHANGE_POSITION, (state: TabModel[], {tabBarName, prevInd, newInd}) => {
    const newState: TabModel[] = [];
    state.forEach((tabVal) => {
      if (tabVal.name === tabBarName) {
        const oldPos = tabVal.hosts[prevInd];
        const newPos = tabVal.hosts[newInd];
        const newHosts: HostModel[] = [];
        tabVal.hosts.forEach((hostVal) => {
          switch (hostVal) {
            case oldPos: {
              console.log('new pos is');
              console.log(newPos);
              newHosts.push(newPos);
              break;
            }
            case newPos: {
              console.log('old pos is');
              console.log(oldPos);
              newHosts.push(oldPos);
              break;
            }
            default: {
              newHosts.push(hostVal);
              break;
            }
          }
        });
        newState.push(new TabModel(tabBarName, newHosts));
      } else {
        newState.push(tabVal);
      }
    });
    return newState;
  })
);

// switch(variable_expression) {
//   case constant_expr1: {
//     statements;
//     break;
//   }
//   case constant_expr2: {
//     statements;
//     break;
//   }
//   default: {
//     statements;
//     break;
//   }
// }
