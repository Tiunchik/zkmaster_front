import {AfterContentChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ZkNodeModel} from '../shared/domains/zk-node.model';
import {CrudService} from '../shared/services/crud.service';
import {MatDialog} from '@angular/material/dialog';
import {AddHostModalElemComponent} from '../modals/add-host-modal-elem/add-host-modal-elem.component';
import {MenuButtonModel} from '../shared/domains/menu-button.model';
import {SETTINGS_NAME} from '../shared/constants/constants';
import {DisplaySettingsComponent} from '../modals/display-settings/display-settings.component';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {log} from 'util';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnDestroy, AfterViewInit {

  destroy$ = new Subject();

  public buttons: MenuButtonModel[] = [
    {name: 'Add Zookeeper', icon: 'playlist_add', navbar: true, functionName: 'openModalAddHost'},
    {name: 'Left Tab', icon: 'vertical_split', navbar: true, functionName: 'addTab'},
    {name: 'Check connections', icon: 'playlist_add_check', navbar: false, functionName: 'Cyberpunk2077! Fix me!'},
    {name: 'Settings', icon: 'settings', navbar: false, functionName: 'openSettings'},
  ];

  trees: ZkNodeModel[] = [];

  dragAndDrop: number[] = [1];

  constructor(private crud: CrudService,
              private modal: MatDialog) {
  }

  ngAfterViewInit(): void {
    this.loadOrSaveSettings();
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
    this.dragAndDrop.push(2);
  }

  public loadOrSaveSettings(): void {
    const storedButtons = localStorage.getItem(SETTINGS_NAME);
    if (storedButtons === 'undefined') {
      localStorage.setItem(SETTINGS_NAME, JSON.stringify(this.buttons));
    }
    if (storedButtons && storedButtons !== 'undefined') {
      this.buttons = JSON.parse(localStorage.getItem(SETTINGS_NAME));
    }
  }

  exeFunc(name): void {
    this[name]();
  }
}
