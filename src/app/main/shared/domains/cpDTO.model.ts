import {ZkNodeModel} from './zk-node.model';

export class CpDTOModel {

  constructor(public host?: string,
              public addNode?: ZkNodeModel[],
              public updateNode?: ZkNodeModel[]) {
  }

}
