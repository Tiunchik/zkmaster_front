import {Component, Input, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {ZkNodeModel} from '../../shared/domains/zk-node.model';

@Component({
  selector: 'app-tree-elem',
  templateUrl: './tree-elem.component.html',
  styleUrls: ['./tree-elem.component.scss']
})
export class TreeElemComponent implements OnInit {

  @Input() zknode: ZkNodeModel;
  treeControl = new NestedTreeControl<ZkNodeModel>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ZkNodeModel>();

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = [this.zknode];
  }

  hasChild = (_: number, node: ZkNodeModel) => !!node.children && node.children.length > 0;

}

