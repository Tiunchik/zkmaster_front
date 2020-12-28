import {createReducer, on} from '@ngrx/store';
import {TabModel} from '../../shared/domains/tab.model';
import {ADD_TAB, MOVE_TABBAR, GET_ALL_TABS, REMOVE_TAB, TRANSFER_TABBAR, SPLIT_TAB} from './tabs.actions';
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
  on(SPLIT_TAB, (state: TabModel[], {oldTabBarName, newTabBarName, prevInd}) => {
    const newState: TabModel[] = [];
    let hosts: HostModel = null;
    state.forEach((tabVal) => {
      if (tabVal.name === oldTabBarName) {
        const oldHosts = [...tabVal.hosts];
        hosts = new HostModel(oldHosts[prevInd].name, oldHosts[prevInd].address, oldHosts[prevInd].tabName);
        console.log('host is - ');
        console.log(hosts);
        oldHosts.splice(prevInd, 1);
        const nwTb = new TabModel(tabVal.name, [...oldHosts]);
        newState.push(nwTb);
      } else {
        newState.push(tabVal);
      }
    });
    newState.forEach((tabVal, index) => {
      if (tabVal.name === newTabBarName) {
        const newHosts = [];
        newHosts.push(new HostModel(hosts.name, hosts.address, newTabBarName));
        newState.splice(index, 1, new TabModel(newTabBarName, [...newHosts]));
      }
    });
    return newState;
    }
  ),
  on(REMOVE_TAB, (state: TabModel[], {name}) => {
    const newState: TabModel[] = [];
    state.forEach((elem) => {
      if (elem.name !== name) {
        newState.push(elem);
      }
    });
    return newState;
  }),
  on(MOVE_TABBAR, (state: TabModel[], {tabBarName, prevInd, newInd}) => {
    const newState: TabModel[] = [];
    state.forEach((tabVal) => {
      if (tabVal.name === tabBarName) {
        const oldPos = tabVal.hosts[prevInd];
        const newPos = tabVal.hosts[newInd];
        const newHosts: HostModel[] = [];
        tabVal.hosts.forEach((hostVal) => {
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
  }),
  on(TRANSFER_TABBAR, (state: TabModel[],
                       {oldTabBarName, newTabBarName, prevInd, newInd}) => {
    const newState: TabModel[] = [];
    let hosts: HostModel = null;
    state.forEach((tabVal) => {
      if (tabVal.name === oldTabBarName) {
        const oldHosts = [...tabVal.hosts];
        hosts = new HostModel(oldHosts[prevInd].name, oldHosts[prevInd].address, oldHosts[prevInd].tabName);
        oldHosts.splice(prevInd, 1);
        const nwTb = new TabModel(tabVal.name, [...oldHosts]);
        newState.push(nwTb);
      } else {
        newState.push(tabVal);
      }
    });
    newState.forEach((tabVal, index) => {
      if (tabVal.name === newTabBarName) {
        const newHosts = [...tabVal.hosts];
        newHosts.splice(newInd, 0, new HostModel(hosts.name, hosts.address, newTabBarName));
        newState.splice(index, 1, new TabModel(newTabBarName, [...newHosts]));
      }
    });
    return newState;
  })
);

