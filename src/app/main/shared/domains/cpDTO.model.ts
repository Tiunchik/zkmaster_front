import {ZkNodeModel} from './zk-node.model';

export class CpDTOModel {

  constructor(public targetHost?: string,
              public createNodeList?: ZkNodeModel[],
              public updateNodeList?: ZkNodeModel[]) {
  }

}
