import {MenuButtonModel} from '../../shared/domains/menu-button.model';
import {createReducer, on} from '@ngrx/store';
import {HIDE_TOOLBAR_BUTTON, LOAD_SETTINGS, SHOW_TOOLBAR_BUTTON} from './menu.actions';
import {SETTINGS_NAME} from '../../shared/constants/constants';

export const INIT_BUTTONS_PACK: MenuButtonModel[] = [
  {name: 'Add Zookeeper', icon: 'playlist_add', toolbar: true, functionName: 'openModalAddHost'},
  {name: 'Left Tab', icon: 'vertical_split', toolbar: true, functionName: 'addTab'},
  {name: 'Check connections', icon: 'playlist_add_check', toolbar: false, functionName: 'Cyberpunk2077! Fix me!'},
  {name: 'Settings', icon: 'settings', toolbar: false, functionName: 'openSettings'},
];

/**
 * {@link createReducer } - почитай доку, особенно {@param 2-ой }
 * +++
 * (тайм-код) https://youtu.be/dvLp9bfpxyQ?list=PL6tnFekR2qfPBdxroaLRqvIv_EJoxauUO&t=83
 * проливает свет на сущность 2-ого параметра.
 *
 * Один STATE == Один Reducer
 */
export const menuReducer = createReducer(
  INIT_BUTTONS_PACK,
  on(SHOW_TOOLBAR_BUTTON, (state: MenuButtonModel[], {button}) => {
    const newState: MenuButtonModel[] = [];
    state.forEach((val) =>
      newState.push(val.name === button.name
        ? new MenuButtonModel(button.name, button.icon, true, button.functionName)
        : val));
    return newState;
  }),
  on(HIDE_TOOLBAR_BUTTON, (state: MenuButtonModel[], {button}) => {
    const newState: MenuButtonModel[] = [];
    state.forEach((val) =>
      newState.push(val.name === button.name
        ? new MenuButtonModel(button.name, button.icon, false, button.functionName)
        : val));
    return newState;
  }),
  on(LOAD_SETTINGS, (() => {
    const storedButtons = localStorage.getItem(SETTINGS_NAME);
    let rsl;
    if (storedButtons === 'undefined') {
      localStorage.setItem(SETTINGS_NAME, JSON.stringify(INIT_BUTTONS_PACK));
      rsl = INIT_BUTTONS_PACK;
    }
    if (storedButtons && storedButtons !== 'undefined') {
      rsl = JSON.parse(localStorage.getItem(SETTINGS_NAME));
    }
    return rsl;
  }))
);

// export const settingReducer = createReducer(
//   initialState,
//   on(LOAD_SETTINGS, (state => {
//     const storedButtons = localStorage.getItem(SETTINGS_NAME);
//     if (storedButtons === 'undefined') {
//       localStorage.setItem(SETTINGS_NAME, JSON.stringify(this.buttons));
//     }
//     if (storedButtons && storedButtons !== 'undefined') {
//       this.buttons = JSON.parse(localStorage.getItem(SETTINGS_NAME));
//     }
//     return initialState;
//   }) )
//   )

