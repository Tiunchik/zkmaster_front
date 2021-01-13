import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ZkNodeModel} from '../../shared/domains/zk-node.model';
import {UnitedModel} from '../../shared/domains/united.model';

@Component({
  selector: 'app-copy-past-modal',
  templateUrl: './copy-past-modal.component.html',
  styleUrls: ['./copy-past-modal.component.scss']
})
export class CopyPastModalComponent implements OnInit {

  unitedTreeModel: UnitedModel = null;
  copiedNode: ZkNodeModel;
  newFatherNode: ZkNodeModel;
  copiedNodePath: string;
  newFatherNodePath: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { copiedNode: ZkNodeModel, newFatherNode: ZkNodeModel },
              public dialogRef: MatDialogRef<CopyPastModalComponent>) {
  }

  ngOnInit(): void {
    this.makeShortVariables();
    this.takeNodesFatherPaths();
    this.prepareUnitedTree();
  }

  makeShortVariables(): void {
    this.copiedNode = {...this.data.copiedNode};
    this.newFatherNode = {...this.data.newFatherNode};
  }

  takeNodesFatherPaths(): void {
    this.copiedNodePath = this.copiedNode.path
      .substring(0, this.copiedNode.path.length - this.copiedNode.name.length);
    this.newFatherNodePath = this.newFatherNode.path
      .substring(0, this.newFatherNode.path.length - this.newFatherNode.name.length);
  }

  deepRecursionCopy(zkNode: ZkNodeModel): ZkNodeModel {
    const newZkNode: ZkNodeModel = {...zkNode};
    newZkNode.children = [];
    zkNode.children.forEach((elem) => newZkNode.children.push(this.deepRecursionCopy(elem)));
    return newZkNode;
  }

  preparePaths(zkNode: ZkNodeModel, pathStart: number, fatherPrefix: string): ZkNodeModel {
    fatherPrefix = fatherPrefix === '' ? '' : fatherPrefix + '/';
    const nodes = this.deepRecursionCopy(zkNode);
    const circleList: ZkNodeModel[] = [];
    let currentNode: ZkNodeModel;
    circleList.push(nodes);
    while (circleList.length !== 0) {
      currentNode = circleList.shift();
      currentNode.children.forEach(elem => circleList.push(elem));
      currentNode.path = fatherPrefix + currentNode.path.substring(pathStart);
    }
    return nodes;
  }

  prepareUnitedTree(): void {
    console.log(this.deepRecursionCopy(this.copiedNode));
    console.log(this.deepRecursionCopy(this.newFatherNode));
    this.newFatherNode = this.preparePaths(this.newFatherNode, this.newFatherNodePath.length, '');
    this.copiedNode = this.preparePaths(this.copiedNode, this.copiedNodePath.length, this.newFatherNode.path);
    this.newFatherNode.children = [...this.newFatherNode.children, this.copiedNode];
    this.unitedTreeModel = this.newFatherNode;

  }


}
