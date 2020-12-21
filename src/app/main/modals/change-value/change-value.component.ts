import {Component, OnInit} from '@angular/core';
import {ZkNodeModel} from '../../shared/domains/zk-node.model';

@Component({
  selector: 'app-change-value',
  templateUrl: './change-value.component.html',
  styleUrls: ['./change-value.component.scss']
})
export class ChangeValueComponent implements OnInit {

  zkNode: ZkNodeModel = new ZkNodeModel();

  constructor() {
  }

  ngOnInit(): void {
  }

}
