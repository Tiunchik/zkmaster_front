import {MenuButtonModel} from '../shared/domains/menu-button.model';

export interface AppState {
  buttons: Array<MenuButtonModel>;
  leftTabs: string[];
}
