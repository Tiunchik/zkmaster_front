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
  addPathList: string[] = [];
  updatePathList: string[] = [];

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

  beInAddPathList(zkNode: ZkNodeModel): boolean {
    return this.addPathList.filter((elem) => elem === zkNode.path).length > 0;
  }

  beInUpdatePathList(zkNode: ZkNodeModel): boolean {
    return this.updatePathList.filter((elem) => elem === zkNode.path).length > 0;
  }

  indeterminate(zkNode: ZkNodeModel): boolean {
    let check = false;
    if (zkNode.children.length > 1) {
      zkNode.children.forEach((elem) => {
        if (this.beInAddPathList(elem) || this.beInUpdatePathList(elem)) {
          check = true;
        }
      });
    }
    return check;
  }

  checkDisable(zkNode: ZkNodeModel): boolean {
    if (this.beInUpdateList(zkNode)) {
      return false;
    }
    const str = zkNode.path.substring(0, zkNode.path.length - (zkNode.name.length + 1));
    console.log(this.addPathList);
    return this.addPathList.filter((elem) => elem === str).length > 0;
  }

  changeChecker(event: MatCheckboxChange, zkNode: ZkNodeModel): void {
    if (this.beInUpdateList(zkNode)) {
      this.checkerEvent.emit({node: zkNode, status: event.checked});
      if (event.checked) {
        this.updatePathList = this.updatePathList.filter((elem) => elem !== zkNode.path);
      } else {
        this.updatePathList.push(zkNode.path);
      }
    } else if (this.beInAddList(zkNode)) {
      const nods: ZkNodeModel[] = this.makeList(zkNode);
      nods.forEach((nod) => {
        this.checkerEvent.emit({node: nod, status: event.checked});
        if (event.checked) {
          this.addPathList = this.addPathList.filter((elem) => elem !== nod.path);
        } else {
          this.addPathList.push(nod.path);
        }
      });
    }
  }

  nodeCurrentStatus(zkNode: ZkNodeModel): string {
    const beInUpdate = this.beInUpdateList(zkNode);
    const beInAddPath = this.beInAddPathList(zkNode);
    const beInUpdatePath = this.beInUpdatePathList(zkNode);
    let result;
    if (beInUpdate && beInUpdatePath) {
      result = 'Don\'t change value';
    } else if (beInUpdate && !beInUpdatePath) {
      result = 'Update node value';
    } else if (beInAddPath) {
      result = 'Don\'t copy node';
    } else if (!beInAddPath) {
      result = 'Copy node';
    }
    return result;
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


}
