import {Component, OnInit} from '@angular/core';
import {ZkNode} from '../shared/domains/ZkNode';
import {CrudService} from '../shared/services/crud.service';
import {MatDialog} from '@angular/material/dialog';
import {AddHostModalElemComponent} from '../elements/add-host-modal-elem/add-host-modal-elem.component';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  trees: ZkNode[] = [];

  constructor(private crud: CrudService,
              private modal: MatDialog) {
  }

  ngOnInit(): void {
  }

  openModalAddHost(): void {
    const dialogResult = this.modal.open(AddHostModalElemComponent);
    dialogResult.afterClosed().subscribe((answer) => console.log(answer));
  }
}
