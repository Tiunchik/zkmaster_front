import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Store} from '@ngrx/store';
import {HostModel} from '../../shared/domains/host.model';
import {TabModel} from '../../shared/domains/tab.model';
import {selectTabs} from '../../redux/tabs/tabs.selector';
import {CHANGE_POSITION} from '../../redux/tabs/tabs.actions';

@Component({
  selector: 'app-dra-navbar',
  templateUrl: './dra-navbar.component.html',
  styleUrls: ['./dra-navbar.component.scss']
})
export class DraNavbarComponent implements OnInit {

  @Input() name: string;
  tab: TabModel;
  currentTree = '';

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store
      .select(selectTabs)
      .subscribe((inpTab) => {
        inpTab.forEach((val) => {
          if (val.name === this.name) {
            this.tab = val;
          }
        });
      });
  }

  drop(event: CdkDragDrop<HostModel[]>): void {
    const current: HostModel[] = event.previousContainer.data;
    const next: HostModel[] = event.container.data;
    if (event.previousContainer === event.container && event.previousIndex !== event.currentIndex) {
      this.store.dispatch(CHANGE_POSITION({
        tabName: current[0].tabName,
        prevNum: event.previousIndex,
        newNum: event.currentIndex
      }));
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
