import {Component, OnDestroy, OnInit} from '@angular/core';
import {ZkNodeModel} from '../shared/domains/zk-node.model';
import {CrudService} from '../shared/services/crud.service';
import {MatDialog} from '@angular/material/dialog';
import {AddHostModalElemComponent} from '../modals/add-host-modal-elem/add-host-modal-elem.component';
import {DisplaySettingsComponent} from '../modals/display-settings/display-settings.component';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {selectButtons} from '../redux/menu.selectors';
import {AppState} from '../redux/app.state';
import {MenuButtonModel} from '../shared/domains/menu-button.model';
import {LOAD_SETTINGS} from "../redux/menu.actions";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnDestroy, OnInit {

  destroy$ = new Subject();

  buttons$: Observable<MenuButtonModel[]> = this.store.pipe(
    select(selectButtons));

  trees: ZkNodeModel[] = [];

  // TODO: re-Fuck-toring var naming
  dragAndDrop = false;

  constructor(private crud: CrudService,
              private modal: MatDialog,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
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
      .subscribe((answer) => {
        this.crud.getAll(answer)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data) => {
            this.trees.push(data);
          });
      });
  }

  openSettings(): void {
    const dialogResult = this.modal.open(DisplaySettingsComponent);
    dialogResult.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadOrSaveSettings());
  }

  addTab(): void {
    this.dragAndDrop = !this.dragAndDrop;
  }

  public loadOrSaveSettings(): void {
    this.store.dispatch(LOAD_SETTINGS(null));

    // const storedButtons = localStorage.getItem(SETTINGS_NAME);
    // if (storedButtons === 'undefined') {
    //   localStorage.setItem(SETTINGS_NAME, JSON.stringify(this.buttons));
    // }
    // if (storedButtons && storedButtons !== 'undefined') {
    //   this.buttons = JSON.parse(localStorage.getItem(SETTINGS_NAME));
    // }
  }

  exeFunc(name): void {
    this[name]();
  }
}
