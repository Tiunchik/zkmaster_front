import {ZkNodeModel} from './zk-node.model';

export class ZkHostModel {

  constructor(public host: string,
              public zkTree: ZkNodeModel) {
  }

}
