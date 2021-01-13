import {ZkNodeModel} from './zk-node.model';

export class UnitedModel extends ZkNodeModel {

  constructor(path: string,
              value: string,
              name: string,
              children: ZkNodeModel[],
              public isCopy?: boolean,
              public newValue?: boolean) {
    super(path, value, name, children);
  }
}
