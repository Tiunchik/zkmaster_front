import {MenuButtonModel} from '../shared/domains/menu-button.model';
import {HostModel} from '../shared/domains/host.model';
import {ZkHostModel} from '../shared/domains/zk-host.model';

export interface AppState {
  buttons: Array<MenuButtonModel>;
  leftTabs: Array<HostModel>;
  zkHost: Array<ZkHostModel>;
}
