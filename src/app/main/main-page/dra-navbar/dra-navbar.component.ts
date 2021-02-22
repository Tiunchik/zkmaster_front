import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {select, Store} from '@ngrx/store';
import {HostModel} from '../../shared/domains/host.model';
import {TabModel} from '../../shared/domains/tab.model';
import {selectTabs} from '../../redux/tabs/tabs.selector';
import {CHOOSE_TAB, MOVE_TABBAR, REMOVE_TAB, TRANSFER_TABBAR} from '../../redux/tabs/tabs.actions';
import {ExpHostModel} from '../../shared/domains/expHost.model';
import {MatMenuTrigger} from '@angular/material/menu';
import {ADD_BOOKMARK} from '../../redux/bookmarks/host.actions';
import {map, takeUntil} from 'rxjs/operators';
import {TreeModel} from '../../shared/domains/tree.model';
import {ADD_TREE} from '../../redux/zktrees/zktree.actions';
import {CrudService} from '../../shared/services/http/crud.service';
import {Observable, Subject} from 'rxjs';
import {START_COMPARE} from '../../redux/compare/compare.actions';

@Component({
  selector: 'app-dra-navbar',
  templateUrl: './dra-navbar.component.html',
  styleUrls: ['./dra-navbar.component.scss']
})
export class DraNavbarComponent implements OnInit, OnDestroy {

  @Input() name: string;
  @Output() emitter = new EventEmitter<ExpHostModel>();

  @ViewChild(MatMenuTrigger, {static: false}) tabMenu: MatMenuTrigger;
  tabMenuPosition = {x: '0px', y: '0px'};

  subject$ = new Subject();

  tab: TabModel;
  countTabs$: Observable<number> = this.store.select(selectTabs).pipe(map(x => x.length));
  currentTree = '';

  constructor(private store: Store,
              private http: CrudService) {
  }

  ngOnInit(): void {
    this.store
      .select(selectTabs)
      .subscribe((inpTab) => {
        inpTab.forEach((val) => {
          if (val.name === this.name) {
            this.tab = val;
            this.currentTree = val.chosenOne.address;
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
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
    this.store.dispatch(CHOOSE_TAB({model: host, index}));
  }

  tabMenuAction(event: MouseEvent, host: HostModel, ind: number): void {
    event.preventDefault();
    this.tabMenuPosition.x = event.clientX + 'px';
    this.tabMenuPosition.y = event.clientY + 'px';
    this.tabMenu.menuData = {host, ind};
    this.tabMenu.menu.focusFirstItem('mouse');
    this.tabMenu.openMenu();
  }

  addToBookmarks(host: HostModel): void {
    this.store.dispatch(ADD_BOOKMARK({model: host}));
  }

  refreshTab(host: HostModel): void {
    this.http.getAll(host.address)
      .pipe(takeUntil(this.subject$))
      .subscribe((data) => {
        const tree: TreeModel = new TreeModel(host.address, data);
        this.store.dispatch(ADD_TREE({tree}));
      });
  }

  closeTab(host: HostModel, ind: number): void {
    this.store.dispatch(REMOVE_TAB({model: host, index: ind}));
  }


  compareMode(): void {
    this.store.dispatch(START_COMPARE());
  }
}
