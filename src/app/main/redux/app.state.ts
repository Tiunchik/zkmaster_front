import {MenuButtonModel} from '../shared/domains/menu-button.model';
import {HostModel} from '../shared/domains/host.model';
import {TreeModel} from '../shared/domains/tree.model';
import {TabModel} from '../shared/domains/tab.model';
import {ZkNodeModel} from '../shared/domains/zk-node.model';
import {CompareModel} from '../shared/domains/compare.model';

export interface AppState {
  buttons: Array<MenuButtonModel>;
  currentTab: string;
  tabs: Array<TabModel>;
  hosts: Array<HostModel>;
  trees: Array<TreeModel>;
  copyPast: ZkNodeModel;
  compare: CompareModel;
}
