export class ZkNode {

  constructor(public path?: string,
              public value?: string,
              public name?: string,
              public father?: ZkNode,
              public children?: ZkNode[]) {
  }

}
