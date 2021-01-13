import {HostModel} from './host.model';

export class Bookmark {

  constructor(public host?: HostModel,
              public button: boolean = false) {
  }

}
