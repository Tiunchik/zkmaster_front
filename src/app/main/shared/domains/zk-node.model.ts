export class ZkNodeModel {

  constructor(public path?: string,
              public value?: string,
              public name?: string,
              public father?: ZkNodeModel,
              public children?: ZkNodeModel[]) {
  }

}
