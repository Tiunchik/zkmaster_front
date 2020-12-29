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
    const newModel: TabModel = new TabModel(model.name, []);
    state.forEach((elem) => {
        if (elem.name === model.name) {
          newModel.hosts = [...elem.hosts, ...model.hosts];
          newModel.chosenOne = newModel.hosts[newModel.hosts.length - 1];
          newState.push(newModel);
        } else {
          newState.push(elem);
        }
      }
    );
    if (newState
      .filter((elem) => elem.name === model.name)
      .length === 0) {
      newModel.hosts = [...model.hosts];
      newModel.chosenOne = newModel.hosts[0];
      newState.push(newModel);
    }
    return newState;
  }),
  on(SPLIT_TAB, (state: TabModel[], {oldTabBarName, newTabBarName, prevInd}) => {
      const midState: TabModel[] = [];
      const finishState: TabModel[] = [];
      let transHost: HostModel = null;
      state.forEach((tabBar) => {
        if (tabBar.name === oldTabBarName) {
          const oldHosts = [...tabBar.hosts];
          transHost = new HostModel(oldHosts[prevInd].name, oldHosts[prevInd].address, oldHosts[prevInd].tabName);
          oldHosts.splice(prevInd, 1);
          midState.push(new TabModel(tabBar.name, [...oldHosts], oldHosts[0]));
        } else {
          midState.push(tabBar);
        }
      });
      midState.forEach((tabBar, index) => {
        if (tabBar.name === newTabBarName) {
          const newHosts = [];
          newHosts.push(new HostModel(transHost.name, transHost.address, newTabBarName));
          midState.splice(index, 1, new TabModel(newTabBarName, [...newHosts], transHost));
        }
      });
      midState.forEach((tabVal) => {
        if (tabVal.hosts.length > 0) {
          finishState.push(tabVal);
        }
      });
      return finishState;
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
        const newHosts: HostModel[] = [...tabVal.hosts];
        newHosts.splice(prevInd, 1, newPos);
        newHosts.splice(newInd, 1, oldPos);
        newState.push(new TabModel(tabBarName, newHosts, oldPos));
      } else {
        newState.push(tabVal);
      }
    });
    return newState;
  }),
  on(TRANSFER_TABBAR, (state: TabModel[],
                       {oldTabBarName, newTabBarName, prevInd, newInd}) => {
    const midState: TabModel[] = [];
    const finishState: TabModel[] = [];
    let transHost: HostModel = null;
    state.forEach((tabBar) => {
      if (tabBar.name === oldTabBarName) {
        const oldHosts = [...tabBar.hosts];
        transHost = new HostModel(oldHosts[prevInd].name, oldHosts[prevInd].address, oldHosts[prevInd].tabName);
        oldHosts.splice(prevInd, 1);
        midState.push(new TabModel(tabBar.name, [...oldHosts], oldHosts[0]));
      } else {
        midState.push(tabBar);
      }
    });
    midState.forEach((tabBar, index) => {
      if (tabBar.name === newTabBarName) {
        const newHosts = [...tabBar.hosts];
        newHosts.splice(newInd, 0, new HostModel(transHost.name, transHost.address, newTabBarName));
        midState.splice(index, 1, new TabModel(newTabBarName, [...newHosts], transHost));
      }
    });
    midState.forEach((tabBar) => {
      if (tabBar.hosts.length > 0) {
        finishState.push(tabBar);
      }
    });
    return finishState;
  })
);
