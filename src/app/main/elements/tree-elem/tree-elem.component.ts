import {Component, Input, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {ZkNode} from '../../shared/domains/ZkNode';

@Component({
  selector: 'app-tree-elem',
  templateUrl: './tree-elem.component.html',
  styleUrls: ['./tree-elem.component.scss']
})
export class TreeElemComponent implements OnInit {

  @Input() zknode: ZkNode;
  treeControl = new NestedTreeControl<ZkNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ZkNode>();

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = [this.zknode];
  }

  hasChild = (_: number, node: ZkNode) => !!node.children && node.children.length > 0;

}

