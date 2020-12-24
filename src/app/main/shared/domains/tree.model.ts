import {ZkNodeModel} from './zk-node.model';

export class TreeModel {

  constructor(public host: string,
              public zkTree: ZkNodeModel) {
  }

}
