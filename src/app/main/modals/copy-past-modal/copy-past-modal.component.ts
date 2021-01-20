import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ZkNodeModel} from '../../shared/domains/zk-node.model';
import {ZkEmitModel} from '../../shared/domains/zk-emit.model';
import {CpDTOModel} from '../../shared/domains/cpDTO.model';
import {ListService} from '../../shared/services/list.service';

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

  addNode: ZkNodeModel[] = [];
  updateNode: ZkNodeModel[] = [];

  fullList: ZkNodeModel[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { copiedNode: ZkNodeModel, newFatherNode: ZkNodeModel },
              private lister: ListService,
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
    this.copiedNodeList = this.lister.makeList(this.copiedNode);
    this.newFatherNodeList = this.lister.makeList(this.newFatherNode);
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
            check = false;
            if (child.value !== newChild.value) {
              this.updateNode.push(child);
              child.value = newChild.value;
            }
          }
        });
        if (check) {
          currentNode.children.push(newChild);
          this.lister.makeList(newChild).forEach(el => {
            this.addNode.push(el);
          });
        }
      });
    }
    this.fullList = [...this.addNode, ...this.updateNode];
    this.unitedTreeModelList = this.lister.makeList(this.unitedTreeModel);
  }

  changeUnitedTree(event: ZkEmitModel): void {
    let add = true;
    if (this.updateNode.filter((elem) => event.node.path === elem.path).length !== 0) {
      add = false;
      let newValue: string;
      if (event.status) {
        newValue = this.copiedNodeList.filter((elem) => event.node.path === elem.path).shift().value;
      } else {
        newValue = this.newFatherNodeList.filter((elem) => event.node.path === elem.path).shift().value;
      }
      this.unitedTreeModelList.filter((elem) => event.node.path === elem.path).shift().value = newValue;
    }
    if (event.status && add) {
      if (this.addNode.filter((elem) => event.node.path === elem.path).length === 0) {
        this.addNode.push(event.node);
      }
    } else if (add) {
      this.addNode.forEach((elem, index) => {
        if (event.node.path === elem.path) {
          this.addNode.splice(index, 1);
          return;
        }
      });
    }
  }

  submit(): void {
    const finUpNodes: ZkNodeModel[] = [];
    this.updateNode.forEach(elem => {
      if (this.newFatherNodeList
        .filter(el => el.path === elem.path)
        .shift().value !== elem.value) {
        elem.path = this.newFatherNodePath + elem.path;
        finUpNodes.push(elem);
      }
    });
    const finAddNote: ZkNodeModel[] = [];
    this.addNode.forEach(elem => {
      elem.path = this.newFatherNodePath + elem.path;
      finAddNote.push(elem);
    });
    finAddNote.sort((el1, el2) => el1.path.length - el2.path.length);
    console.log(finAddNote);
    const cpModel = new CpDTOModel('', finAddNote, finUpNodes);
    this.dialogRef.close({cpModel});
  }

}
