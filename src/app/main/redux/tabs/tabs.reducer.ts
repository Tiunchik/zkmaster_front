import {createReducer, on} from '@ngrx/store';
import {TabModel} from '../../shared/domains/tab.model';
import {ADD_TAB, CHANGE_POSITION, GET_ALL_TABS, REMOVE_TAB} from './tabs.actions';
import {HostModel} from '../../shared/domains/host.model';


export const TABS: TabModel[] = [
  {name: 'asdfg', hosts: []}
];

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
  on(CHANGE_POSITION, (state: TabModel[], {tabName, prevNum, newNum}) => {
    const newState: TabModel[] = [];
    state.forEach((val) => {
      if (val.name === tabName) {
        const oldPos = val.hosts[prevNum];
        const newPos = val.hosts[newNum];
        const newHosts: HostModel[] = [];
        val.hosts.forEach((hostVal) => {
          switch (hostVal) {
            case oldPos: {
              newHosts.push(newPos);
              break;
            }
            case newPos: {
              newHosts.push(oldPos);
              break;
            }
            default: {
              newHosts.push(val);
              break;
            }
          }
        });
        newState.push(new TabModel(tabName, newHosts));
      } else {
        newState.push(val);
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
