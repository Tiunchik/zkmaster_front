import {Component, Host, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectLeftTab} from '../../redux/tab/tab.selector';
import {HostModel} from '../../shared/domains/host.model';

@Component({
  selector: 'app-dra-navbar',
  templateUrl: './dra-navbar.component.html',
  styleUrls: ['./dra-navbar.component.scss']
})
export class DraNavbarComponent implements OnInit {

  @Input() name: string;
  list: Observable<HostModel[]> = this.store.select(selectLeftTab);
  currentTree: string = '';

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<HostModel[]>): void {
    const current: HostModel[] = event.previousContainer.data;
    const next: HostModel[] = event.container.data;
    console.log(current);
    console.log(next);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  chooseHost(hostName: string): void {
    console.log('clicked');
    this.currentTree = hostName;
  }
}
