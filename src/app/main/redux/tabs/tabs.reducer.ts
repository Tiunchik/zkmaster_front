import {createReducer, on} from '@ngrx/store';
import {TabModel} from '../../shared/domains/tab.model';
import {ADD_TAB, GET_ALL_TABS, MOVE_TABBAR, REMOVE_TAB, REMOVE_TABBAR, SPLIT_TAB, TRANSFER_TABBAR} from './tabs.actions';
import {HostModel} from '../../shared/domains/host.model';


export const TABS: TabModel[] = [];


export const tabsReducer = createReducer(TABS,
  on(GET_ALL_TABS, (state: TabModel[]) => {
    return state;
  }),
  on(ADD_TAB, (state: TabModel[], {model}) => {
    const newState: TabModel[] = [];
    const newModel: TabModel = new TabModel(model.name, []);
    state.forEach((tabBar) => {
        if (tabBar.name === model.name) {
          newModel.hosts = [...tabBar.hosts, ...model.hosts];
          newModel.chosenOne = newModel.hosts[newModel.hosts.length - 1];
          newState.push(newModel);
        } else {
          newState.push(tabBar);
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
      const newState: TabModel[] = transfer(state, oldTabBarName, newTabBarName, prevInd, 0);
      return deleteEmptyTabBars(newState);
    }
  ),
  on(REMOVE_TAB, (state: TabModel[], {model, index}) => {
    const newState: TabModel[] = [];
    state.forEach((elem) => {
      if (elem.name === model.tabName) {
        if (elem.hosts.length > 1) {
          const newHosts = [...elem.hosts];
          newHosts.splice(index, 1);
          newState.push(new TabModel(elem.name, newHosts, newHosts[0]));
        }
      } else {
        newState.push(elem);
      }
    });
    return deleteEmptyTabBars(newState);
  }),
  on(REMOVE_TABBAR, (state: TabModel[], {name}) => {
    const newState: TabModel[] = [];
    let savedTabs: HostModel[] = [];
    const newTabs: HostModel[] = [];
    state.forEach((tabBar) => {
      if (tabBar.name === name) {
        savedTabs = [...tabBar.hosts];
      } else {
        newState.push(new TabModel(tabBar.name, [...tabBar.hosts], tabBar.chosenOne));
      }
    });
    savedTabs.forEach((elem) => {
      newTabs.push(new HostModel(elem.name, elem.address, newState[0].hosts[0].tabName));
    });
    newState[0].hosts = [...newState[0].hosts, ...newTabs];
    return newState;
  }),
  on(MOVE_TABBAR, (state: TabModel[], {tabBarName, prevInd, newInd}) => {
    const newState: TabModel[] = [];
    state.forEach((tabBar) => {
      if (tabBar.name === tabBarName) {
        const oldPos = tabBar.hosts[prevInd];
        const newPos = tabBar.hosts[newInd];
        const newHosts: HostModel[] = [...tabBar.hosts];
        newHosts.splice(prevInd, 1, newPos);
        newHosts.splice(newInd, 1, oldPos);
        newState.push(new TabModel(tabBarName, newHosts, oldPos));
      } else {
        newState.push(tabBar);
      }
    });
    return newState;
  }),
  on(TRANSFER_TABBAR, (state: TabModel[],
                       {oldTabBarName, newTabBarName, prevInd, newInd}) => {
    const newState: TabModel[] = transfer(state, oldTabBarName, newTabBarName, prevInd, newInd);
    return deleteEmptyTabBars(newState);
  })
);

function deleteEmptyTabBars(processedBar: TabModel[]): TabModel[] {
  const completedBar: TabModel[] = [];
  processedBar.forEach((tabBar) => {
    if (tabBar.hosts.length > 0) {
      completedBar.push(tabBar);
    }
  });
  return completedBar;
}

function transfer(state: TabModel[],
                  oldTabBarName: string,
                  newTabBarName: string,
                  prevInd: number,
                  newInd: number): TabModel[] {
  const midState: TabModel[] = [];
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
  return midState;
}
