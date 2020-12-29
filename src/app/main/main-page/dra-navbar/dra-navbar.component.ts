import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Store} from '@ngrx/store';
import {HostModel} from '../../shared/domains/host.model';
import {TabModel} from '../../shared/domains/tab.model';
import {selectTabs} from '../../redux/tabs/tabs.selector';
import {MOVE_TABBAR, TRANSFER_TABBAR} from '../../redux/tabs/tabs.actions';
import {ExpHostModel} from '../../shared/domains/expHost.model';

@Component({
  selector: 'app-dra-navbar',
  templateUrl: './dra-navbar.component.html',
  styleUrls: ['./dra-navbar.component.scss']
})
export class DraNavbarComponent implements OnInit {

  @Input() name: string;
  @Output() emitter = new EventEmitter<ExpHostModel>();

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
            this.chooseHost(this.tab.chosenOne, this.tab.hosts.indexOf(this.tab.chosenOne));
          }
        });
      });
  }


  drop(event: CdkDragDrop<HostModel[]>): void {
    const current: HostModel[] = event.previousContainer.data;
    const next: HostModel[] = event.container.data;
    if (event.previousContainer === event.container && event.previousIndex !== event.currentIndex) {
      this.store.dispatch(MOVE_TABBAR({
        tabBarName: current[0].tabName,
        prevInd: event.previousIndex,
        newInd: event.currentIndex
      }));
    } else if (event.previousContainer !== event.container) {
      this.store.dispatch(TRANSFER_TABBAR({
        oldTabBarName: current[0].tabName,
        newTabBarName: next[0].tabName,
        prevInd: event.previousIndex,
        newInd: event.currentIndex
      }));
    }
  }

  chooseHost(host: HostModel, index: number): void {
    this.currentTree = host.address;
    this.emitter.emit(new ExpHostModel(host, index));
  }
}
