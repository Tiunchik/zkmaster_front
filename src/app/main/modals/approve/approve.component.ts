import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ZkNodeModel} from '../../shared/domains/zk-node.model';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent implements OnInit {

  path: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { node: ZkNodeModel}) { }

  ngOnInit(): void {
    this.path = this.data.node.path;
  }

}
