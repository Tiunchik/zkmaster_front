import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {HostModel} from '../../shared/domains/host.model';
import {selectHosts} from '../../redux/host/host.selector';
import {TabModel} from '../../shared/domains/tab.model';
import {selectTabs} from '../../redux/tabs/tabs.selector';
import {SET_CURRENT_TAB} from '../../redux/currentTab/currentTabs.actions';

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

  setCurrentTabBar(): void {
    this.store.dispatch(SET_CURRENT_TAB({name: this.name}));
  }
}
