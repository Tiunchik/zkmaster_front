import {Component} from '@angular/core';
import {HostModel} from '../../shared/domains/host.model';

// TODO: сделать закрытие на Enter

@Component({
  selector: 'app-add-host-modal-elem',
  templateUrl: './add-host-modal-elem.component.html',
  styleUrls: ['./add-host-modal-elem.component.scss']
})
export class AddHostModalElemComponent {

  public host: HostModel = new HostModel('local', 'localhost:2181');

  constructor() {
  }


  submit() : void {
    console.log("just test= (Add host):: Close Enter");
  }
}
