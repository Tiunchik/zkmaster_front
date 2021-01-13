import {Component, Input, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {ZkNodeModel} from '../../../shared/domains/zk-node.model';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {UnitedModel} from '../../../shared/domains/united.model';

@Component({
  selector: 'app-simple-tree',
  templateUrl: './simple-tree.component.html',
  styleUrls: ['./simple-tree.component.scss']
})
export class SimpleTreeComponent implements OnInit {

  @Input() zkNode: UnitedModel;
  treeControl = new NestedTreeControl<UnitedModel>(node => node.children);
  dataSource = new MatTreeNestedDataSource<UnitedModel>();

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.data = [this.zkNode];
  }

  hasChild = (_: number, node: UnitedModel) => !!node.children && node.children.length > 0;
}
