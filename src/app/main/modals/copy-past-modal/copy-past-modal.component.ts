import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ZkNodeModel} from '../../shared/domains/zk-node.model';
import {ZkEmitModel} from '../../shared/domains/zk-emit.model';

@Component({
  selector: 'app-copy-past-modal',
  templateUrl: './copy-past-modal.component.html',
  styleUrls: ['./copy-past-modal.component.scss']
})
export class CopyPastModalComponent implements OnInit {

  unitedTreeModel: ZkNodeModel = null;
  unitedTreeModelList: ZkNodeModel[] = [];
  copiedNode: ZkNodeModel;
  copiedNodeList: ZkNodeModel[];
  newFatherNode: ZkNodeModel;
  newFatherNodeList: ZkNodeModel[] = [];
  copiedNodePath: string;
  newFatherNodePath: string;

  isCopy: ZkNodeModel[] = [];
  newValue: ZkNodeModel[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { copiedNode: ZkNodeModel, newFatherNode: ZkNodeModel },
              public dialogRef: MatDialogRef<CopyPastModalComponent>) {
  }

  ngOnInit(): void {
    this.makeShortVariables();
    this.takeNodesFatherPaths();
    this.prepareNodes();
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

  prepareNodes(): void {
    this.newFatherNode = this.preparePaths(this.newFatherNode, this.newFatherNodePath.length, '');
    this.copiedNode = this.preparePaths(this.copiedNode, this.copiedNodePath.length, this.newFatherNode.path);
    this.copiedNodeList = this.makeList(this.copiedNode);
    this.newFatherNodeList = this.makeList(this.newFatherNode);
  }

  prepareUnitedTree(): void {
    this.unitedTreeModel = {...this.deepRecursionCopy(this.newFatherNode)};
    const unitedListForCheck: ZkNodeModel[] = [this.unitedTreeModel];
    let currentNode: ZkNodeModel;
    while (unitedListForCheck.length !== 0) {
      currentNode = unitedListForCheck.shift();
      currentNode.children.forEach((elem) => unitedListForCheck.push(elem));
      const newChildrens = this.copiedNodeList.filter((elem) => {
        const fatherPath = elem.path.substring(0, elem.path.length - (elem.name.length + 1));
        return currentNode.path === fatherPath;
      });
      newChildrens.forEach((newChild) => {
        let check = true;
        currentNode.children.forEach((child) => {
          if (child.path === newChild.path) {
            this.isCopy.push(child);
            check = false;
            if (child.value !== newChild.value) {
              this.newValue.push(child);
              child.value = newChild.value;
            }
          }
        });
        if (check) {
          this.isCopy.push(newChild);
          currentNode.children.push(newChild);
        }
      });
    }

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

  makeList(zkNode: ZkNodeModel): ZkNodeModel[] {
    const circleList = [];
    const answerList = [];
    let currentNode;
    circleList.push(zkNode);
    while (circleList.length !== 0) {
      currentNode = circleList.shift();
      currentNode.children.forEach(elem => circleList.push(elem));
      answerList.push(currentNode);
    }
    return answerList;
  }

  changeUnitedTree($event: ZkEmitModel): void {
    console.log($event);
  }
}
