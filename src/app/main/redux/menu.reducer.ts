import {MenuButtonModel} from '../shared/domains/menu-button.model';
import {createReducer, on} from '@ngrx/store';
import {hide, show} from './menu.actions';

export const initialState: MenuButtonModel[] = [
  {name: 'Add Zookeeper', icon: 'playlist_add', navbar: true, functionName: 'openModalAddHost'},
  {name: 'Left Tab', icon: 'vertical_split', navbar: true, functionName: 'addTab'},
  {name: 'Check connections', icon: 'playlist_add_check', navbar: false, functionName: 'Cyberpunk2077! Fix me!'},
  {name: 'Settings', icon: 'settings', navbar: false, functionName: 'openSettings'},
];

export const menuReducer = createReducer(
  initialState,
  on(show, (state: MenuButtonModel[], {button}) => {
    const newState = [...state];
    newState.map(el => {
      if (el.name === button.name) {
        el.navbar = true;
      }
    });
    return newState;
  }),
  on(hide, (state: MenuButtonModel[], {button}) => {
    const newState = [...state];
    newState.map(el => {
      if (el.name === button.name) {
        el.navbar = false;
      }
    });
    return newState;
  }));

