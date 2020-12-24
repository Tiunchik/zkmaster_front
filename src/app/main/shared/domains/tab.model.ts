import {HostModel} from './host.model';

export class TabModel {

  constructor(public name?: string,
              public hosts?: HostModel[]) {
  }

}
