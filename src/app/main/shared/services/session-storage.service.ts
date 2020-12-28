import {Injectable} from '@angular/core';
import {ZkNodeModel} from '../domains/zk-node.model';

@Injectable(
  {providedIn: 'root'}
)
export class SessionStorageService {

  constructor() {
  }

  getExpandedNodes(host: string, nodes: ZkNodeModel): ZkNodeModel[] {
    const allNodes: ZkNodeModel[] = [];
    const expandableNodes: ZkNodeModel[] = [];
    let currentNode: ZkNodeModel;
    allNodes.push(nodes);
    while (allNodes.length !== 0) {
      currentNode = allNodes.shift();
      currentNode.children.forEach(elem => allNodes.push(elem));
      if (this.getItem(host, currentNode.path) || currentNode.path === '/') {
        expandableNodes.push(currentNode);
      }
    }
    return expandableNodes;
  }

  saveItem(host: string, path: string, expand: boolean): void {
    sessionStorage.setItem(`${host}${path}`, `${expand}`);
  }

  getItem(host: string, path: string): boolean {
    const answer = sessionStorage.getItem(`${host}${path}`);
    return (!(answer === null || answer === 'false'));
  }

}
