import {ZkNodeModel} from './zk-node.model';

export class CopyPasteDTO {

  constructor(public targetHost?: string,
              public createNodeList?: ZkNodeModel[],
              public updateNodeList?: ZkNodeModel[]) {
  }
}
