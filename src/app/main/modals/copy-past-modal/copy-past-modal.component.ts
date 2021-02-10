import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ZkNodeModel} from '../../shared/domains/zk-node.model';
import {ZkEmitModel} from '../../shared/domains/zk-emit.model';
import {CopyPasteDTO} from '../../shared/domains/copyPasteDTO';
import {ZkNodeUtilService} from '../../shared/services/zk-node-util.service';

@Component({
  selector: 'app-copy-past-modal',
  templateUrl: './copy-past-modal.component.html',
  styleUrls: ['./copy-past-modal.component.scss']
})
export class CopyPastModalComponent implements OnInit {

  unitedTreeModel: ZkNodeModel = null;
  unitedTreeModelList: ZkNodeModel[] = [];

  copiedNodePath: string;
  copiedNode: ZkNodeModel;
  copiedNodeList: ZkNodeModel[];

  newFatherNodePath: string;
  newFatherNode: ZkNodeModel;
  newFatherNodeList: ZkNodeModel[] = [];

  addNodeList: ZkNodeModel[] = [];
  updateNodeList: ZkNodeModel[] = [];

  fullList: ZkNodeModel[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { copiedNode: ZkNodeModel, newFatherNode: ZkNodeModel },
              private lister: ZkNodeUtilService,
              public dialogRef: MatDialogRef<CopyPastModalComponent>) {
  }

  ngOnInit(): void {
    this.makeShortVariables();
    this.takeNodesFatherPaths();
    this.prepareNodes();
    this.prepareUnitedTree();
    console.log("this.addNodeList.length + this.updateNodeList.length === 0",
      this.addNodeList.length + this.updateNodeList.length === 0)
    if (this.addNodeList.length + this.updateNodeList.length === 0) {
      const tryToFix = new CopyPasteDTO("", [], []);
      this.dialogRef.close(tryToFix);
    }
  }

  makeShortVariables(): void {
    this.copiedNode = {...this.data.copiedNode};
    this.newFatherNode = {...this.data.newFatherNode};
    console.log("copiedNode", this.copiedNode);
    console.log("newFatherNode", this.newFatherNode);
  }

  takeNodesFatherPaths(): void {
    this.copiedNodePath = this.copiedNode.path
      .substring(0, this.copiedNode.path.length - this.copiedNode.name.length);
    this.newFatherNodePath = this.newFatherNode.path
      .substring(0, this.newFatherNode.path.length - this.newFatherNode.name.length);
    // this.newFatherNodePath = (this.newFatherNodePath === "") ? "/" : this.newFatherNodePath;
    console.log("copiedNodePath", this.copiedNodePath);
    console.log("newFatherNodePath", this.newFatherNodePath);
    console.log("newFatherNodePath undefined", (this.newFatherNodePath === undefined));
    console.log("newFatherNodePath null", (this.newFatherNodePath === null));
  }

  prepareNodes(): void {
    this.newFatherNode = this.preparePaths(this.newFatherNode, this.newFatherNodePath.length, '');
    this.copiedNode = this.preparePaths(this.copiedNode, this.copiedNodePath.length, this.newFatherNode.path);
    this.copiedNodeList = this.lister.zkNodeToList(this.copiedNode);
    this.newFatherNodeList = this.lister.zkNodeToList(this.newFatherNode);
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
              this.updateNodeList.push(child);
              child.value = newChild.value;
            }
          }
        });
        if (check) {
          currentNode.children.push(newChild);
          this.lister.zkNodeToList(newChild).forEach(el => {
            this.addNodeList.push(el);
          });
        }
      });
    }
    this.fullList = [...this.addNodeList, ...this.updateNodeList];
    this.unitedTreeModelList = this.lister.zkNodeToList(this.unitedTreeModel);
  }


  /* Outside methods*/


  changeUnitedTree(event: ZkEmitModel): void {
    let add = true;
    if (this.updateNodeList.filter((elem) => event.node.path === elem.path).length !== 0) {
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
      if (this.addNodeList.filter((elem) => event.node.path === elem.path).length === 0) {
        this.addNodeList.push(event.node);
      }
    } else if (add) {
      this.addNodeList.forEach((elem, index) => {
        if (event.node.path === elem.path) {
          this.addNodeList.splice(index, 1);
          return;
        }
      });
    }
  }

  /**
   * TODO - fix "root-case" normally.
   */
  submit(): void {
    const updateNodeListRsl: ZkNodeModel[] = [];
    this.updateNodeList.forEach(elem => {
      let newFatherNodeListElem: ZkNodeModel = this.newFatherNodeList
        .filter(el => el.path === elem.path).shift();
      if (newFatherNodeListElem.value !== elem.value) {
        elem.path = this.newFatherNodePath + elem.path;
        updateNodeListRsl.push(elem);
      }
    });


    let createNodeListRsl: ZkNodeModel[] = [];
    this.addNodeList.forEach(elem => {
      elem.path = this.newFatherNodePath + elem.path;
      createNodeListRsl.push(elem);
    });
    createNodeListRsl = createNodeListRsl
      .sort((el1, el2) => el1.path.length - el2.path.length);
    console.log('before');
    console.log(createNodeListRsl);
    createNodeListRsl.forEach((elem, ind) => {
      if (createNodeListRsl[ind].path.startsWith('//')) {
        createNodeListRsl[ind].path = createNodeListRsl[ind].path.substring(1);
      }
    });
    console.log('after');
    console.log(createNodeListRsl);
    const copyPastModel = new CopyPasteDTO('', createNodeListRsl, updateNodeListRsl);
    console.log("copyPastModel", copyPastModel);
    this.dialogRef.close({cpModel: copyPastModel});
  }


}
