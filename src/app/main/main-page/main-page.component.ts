import {Component, OnInit} from '@angular/core';
import {ZkNode} from '../shared/domains/ZkNode';
import {CrudService} from '../shared/services/crud.service';
import {MatDialog} from '@angular/material/dialog';
import {AddHostModalElemComponent} from '../tree-block/add-host-modal-elem/add-host-modal-elem.component';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  trees: ZkNode[] = [];

  dragAndDrop: number[] = [1];

  constructor(private crud: CrudService,
              private modal: MatDialog) {
  }

  ngOnInit(): void {
  }

  // TODO: сделать верную цепочку observable - pipeline
  // TODO: сделать отдельный метод для валидации, либо втащить сюда ФормМодуль ?

  openModalAddHost(): void {
    const dialogResult = this.modal.open(AddHostModalElemComponent);
    dialogResult.afterClosed().subscribe((answer) => {
      console.log(answer);
      this.crud.getAll(answer).subscribe((data) => {
        this.trees.push(data);
        console.log(this.trees);
      });
    });
  }

  addTab(): void {
    this.dragAndDrop.push(2);
  }
}
