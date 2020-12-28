import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {CrudService} from '../shared/services/crud.service';
import {MatDialog} from '@angular/material/dialog';
import {AddHostModalElemComponent} from '../modals/add-host-modal-elem/add-host-modal-elem.component';
import {DisplaySettingsComponent} from '../modals/display-settings/display-settings.component';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {selectButtons} from '../redux/menu/buttons.selectors';
import {AppState} from '../redux/app.state';
import {MenuButtonModel} from '../shared/domains/menu-button.model';
import {LOAD_SETTINGS} from '../redux/menu/buttons.actions';

import {HostModel} from '../shared/domains/host.model';
import {TabModel} from '../shared/domains/tab.model';
import {selectTabs} from '../redux/tabs/tabs.selector';
import {selectCurrentTab} from '../redux/currentTab/currentTabs.selector';
import {SET_CURRENT_TAB} from '../redux/currentTab/currentTabs.actions';
import {ADD_TAB, REMOVE_TAB, SPLIT_TAB} from '../redux/tabs/tabs.actions';
import {ExpHostModel} from '../shared/domains/expHost.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnDestroy, OnInit {

  destroy$ = new Subject();
  buttons$: Observable<MenuButtonModel[]> = this.store.pipe(takeUntil(this.destroy$),
    select(selectButtons));
  tabs: TabModel[];
  currentTab: string;
  currentHost: ExpHostModel;
  split: string;

  columns = false;

  @HostListener('window:keypress', ['$event']) onPress(event: KeyboardEvent): void {
    if (event.key === 'a') {
      this.openModalAddHost();
    }
    if (event.key === 'o') {
      this.openSettings();
    }
    if (event.key === 's') {
      this.addTab();
    }
  }

  constructor(private crud: CrudService,
              private modal: MatDialog,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(LOAD_SETTINGS());
    this.store
      .select(selectTabs)
      .subscribe((obsTabs) => {
        this.tabs = obsTabs;
        this.columns = obsTabs.length > 1;
      });
    this.store
      .select(selectCurrentTab)
      .subscribe((obsCurr) => this.currentTab = obsCurr);
    this.createCurrentTab();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // TODO: сделать верную цепочку observable - pipeline
  // TODO: сделать отдельный метод для валидации, либо вытащить сюда ФормМодуль ?

  openModalAddHost(): void {
    const dialogResult = this.modal.open(AddHostModalElemComponent);
    dialogResult.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((host: HostModel) => {
        console.log('host');
        console.log(host);
        if (host && host.name.length === 0) {
          host.name = host.address;
        }
        if (host && host.address.length > 5) {

          console.log(`Current tab is ${this.currentTab}`);
          const tabModel = new TabModel(this.currentTab, [host]);
          this.store.dispatch(ADD_TAB({model: tabModel}));
        }
      });
  }

  openSettings(): void {
    this.modal.open(DisplaySettingsComponent);
  }

  addTab(): void {
    if (this.tabs.length === 1 && this.currentHost !== null) {
      const getCurTab: TabModel = this.tabs
        .filter((elem) => elem.name === this.currentHost.host.tabName)
        .shift();
      if (getCurTab.hosts.length > 1) {
        this.columns = true;
        this.split = this.generateTabUniqueId();
        this.store.dispatch(ADD_TAB({model: new TabModel(this.split, [])}));
        this.store.dispatch(SPLIT_TAB({
          oldTabBarName: this.currentHost.host.tabName,
          newTabBarName: this.split,
          prevInd: this.currentHost.index
        }));
      }
    } else if (this.tabs.length > 1) {
      this.columns = false;
      this.store.dispatch(REMOVE_TAB({name: this.split}));
      this.split = null;
    }
  }

  exeFunc(name): void {
    this[name]();
  }

  generateTabUniqueId(): string {
    let randomStr = '';
    do {
      randomStr = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5);
    } while (this.tabs.filter((x) => x.name === randomStr).length > 0);
    return randomStr;
  }

  createCurrentTab(): void {
    if (this.currentTab === null
      || this.currentTab === ''
      || this.currentTab === 'undefined') {
      if (this.tabs.length === 0) {
        this.store.dispatch(SET_CURRENT_TAB({name: this.generateTabUniqueId()}));
      } else {
        this.store.dispatch(SET_CURRENT_TAB({name: this.tabs[0].name}));
      }
    }
  }

  setCurrentTabBar(tabName: string): void {
    this.store.dispatch(SET_CURRENT_TAB({name: tabName}));
  }

  setCurrentHost($event: ExpHostModel): void {
    this.currentHost = $event;
  }
}
