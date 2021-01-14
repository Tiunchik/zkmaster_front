import {Component, Input, OnInit, Output} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {ZkNodeModel} from '../../../shared/domains/zk-node.model';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {ZkEmitModel} from '../../../shared/domains/zk-emit.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-simple-tree',
  templateUrl: './simple-tree.component.html',
  styleUrls: ['./simple-tree.component.scss']
})
export class SimpleTreeComponent implements OnInit {

  @Input() zkNode: ZkNodeModel;
  @Input() accessCheckerList: ZkNodeModel[];
  @Output() checkerEvent = new EventEmitter<ZkEmitModel>();
  treeControl = new NestedTreeControl<ZkNodeModel>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ZkNodeModel>();

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.data = [this.zkNode];
  }

  hasChild = (_: number, node: ZkNodeModel) => !!node.children && node.children.length > 0;

  testAccess(node: ZkNodeModel): boolean {
    return this.accessCheckerList.filter((el) => el.path === node.path).length === 0;
  }

  changeChecker($event: MatCheckboxChange, zkNode: ZkNodeModel): void {
    this.checkerEvent.emit({node: zkNode, status: $event.checked});
  }
}
