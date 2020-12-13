import {Component, OnDestroy, OnInit} from '@angular/core';
import {ZkNodeModel} from '../shared/domains/zk-node.model';
import {CrudService} from '../shared/services/crud.service';
import {MatDialog} from '@angular/material/dialog';
import {AddHostModalElemComponent} from '../modals/add-host-modal-elem/add-host-modal-elem.component';
import {MenuButtonModel} from '../shared/domains/menu-button.model';
import {SETTINGS_NAME} from '../shared/constants/constants';
import {DisplaySettingsComponent} from '../modals/display-settings/display-settings.component';
import {pipe, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  public buttons: MenuButtonModel[] = [
    {name: 'Add Zookeeper', icon: 'playlist_add', navbar: true},
    {name: 'Left Tab', icon: 'vertical_split', navbar: true},
    {name: 'Check connections', icon: 'playlist_add_check', navbar: true},
    {name: 'Settins', icon: 'settings', navbar: true},
  ];

  trees: ZkNodeModel[] = [];

  dragAndDrop: number[] = [1];

  constructor(private crud: CrudService,
              private modal: MatDialog) {
  }

  ngOnInit(): void {
    this.loadOrSaveSettings();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // TODO: сделать верную цепочку observable - pipeline
  // TODO: сделать отдельный метод для валидации, либо вытащить сюда ФормМодуль ?

  openModalAddHost(): void {
    console.log('lorem5');
    const dialogResult = this.modal.open(AddHostModalElemComponent);
    dialogResult.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((answer) => {
        console.log(answer);
        this.crud.getAll(answer)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data) => {
            this.trees.push(data);
            console.log(this.trees);
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
    const storagedButtons = localStorage.getItem(SETTINGS_NAME);
    if (storagedButtons) {
      this.buttons = JSON.parse(localStorage.getItem(SETTINGS_NAME));
    } else {
      localStorage.setItem(SETTINGS_NAME, JSON.stringify(this.buttons));
    }
  }

  // TODO: потыкай function.apply
  callFunction(name: string): void {
    const button = this.buttons.filter((but) => but.name === name).pop();
    const str = button.run;
    this[str]();
  }

}
