import {HostModel} from './host.model';

export class CompareModel {

  constructor(public hosts?: HostModel[],
              public compare?: boolean) {
  }

}
