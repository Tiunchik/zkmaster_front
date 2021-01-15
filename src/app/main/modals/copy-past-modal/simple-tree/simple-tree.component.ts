import {Component, Input, OnInit, Output} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {ZkNodeModel} from '../../../shared/domains/zk-node.model';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {ZkEmitModel} from '../../../shared/domains/zk-emit.model';
import {EventEmitter} from '@angular/core';


@Component({
  selector: 'app-simple-tree',
  templateUrl: './simple-tree.component.html',
  styleUrls: ['./simple-tree.component.scss']
})
export class SimpleTreeComponent implements OnInit {

  @Input() zkNode: ZkNodeModel;
  @Input() updateList: ZkNodeModel[];
  @Input() addList: ZkNodeModel[];

  @Output() checkerEvent = new EventEmitter<ZkEmitModel>();

  accessCheckerList: ZkNodeModel[];
  treeControl = new NestedTreeControl<ZkNodeModel>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ZkNodeModel>();

  stableAddList: ZkNodeModel[] = [];
  pathList: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.data = [this.zkNode];
    this.accessCheckerList = [...this.updateList, ...this.addList];
    this.stableAddList = [...this.addList];
  }

  hasChild = (_: number, node: ZkNodeModel) => !!node.children && node.children.length > 0;

  beInAddList(node: ZkNodeModel): boolean {
    return this.stableAddList.filter((el) => el.path === node.path).length > 0;
  }

  beInUpdateList(node: ZkNodeModel): boolean {
    return this.updateList.filter((el) => el.path === node.path).length > 0;
  }

  beInAccessList(node: ZkNodeModel): boolean {
    return this.accessCheckerList.filter((el) => el.path === node.path).length > 0;
  }

  beInPathList(zkNode: ZkNodeModel): boolean {
    return this.pathList.filter((elem) => elem === zkNode.path).length > 0;
  }

  changeChecker(event: MatCheckboxChange, zkNode: ZkNodeModel): void {
    this.checkerEvent.emit({node: zkNode, status: event.checked});
    if (event.checked) {
      this.pathList.splice(this.pathList.indexOf(zkNode.path), 1);
    } else {
      this.pathList.push(zkNode.path);
    }
  }

  nodeCurrentStatus(zkNode: ZkNodeModel): string {
    const beInUpdate = this.beInUpdateList(zkNode);
    const beInPath = this.beInPathList(zkNode);
    let result;
    if (beInUpdate && beInPath) {
      result = 'Don\'t change value';
    } else if (beInUpdate && !beInPath) {
      result = 'Update node value';
    } else if (beInPath) {
      result = 'Don\'t copy node';
    } else if (!beInPath) {
      result = 'Copy node';
    }
    return  result;
  }
}
