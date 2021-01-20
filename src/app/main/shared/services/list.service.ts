import {Injectable} from '@angular/core';
import {ZkNodeModel} from '../domains/zk-node.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() {
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
