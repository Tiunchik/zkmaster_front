import {Component, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {ZkNodeModel} from '../../../shared/domains/zk-node.model';
import {CrudService} from '../../../shared/services/crud.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatMenuTrigger} from '@angular/material/menu';
import {RequestDto} from '../../../shared/domains/request.dto';
import {Store} from '@ngrx/store';
import {selectTrees} from '../../../redux/zktrees/zktree.selector';
import {TreeModel} from '../../../shared/domains/tree.model';
import {ADD_TREE} from '../../../redux/zktrees/zktree.actions';
import {MatDialog} from '@angular/material/dialog';
import {ChangeValueComponent} from '../../../modals/change-value/change-value.component';
import {ApproveComponent} from '../../../modals/approve/approve.component';
import {SessionStorageService} from '../../../shared/services/session-storage.service';

@Component({
  selector: 'app-tree-elem',
  templateUrl: './tree-elem.component.html',
  styleUrls: ['./tree-elem.component.scss']
})
export class TreeElemComponent implements OnInit, OnChanges, OnDestroy {

  @Input() set loadHost(value: string) {
    this.host = value;
  }

  subject$ = new Subject();
  host = '';
  treeControl = new NestedTreeControl<ZkNodeModel>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ZkNodeModel>();

  @ViewChild(MatMenuTrigger, {static: false}) contextMenu: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};

  constructor(private http: CrudService,
              private modal: MatDialog,
              private sessionStore: SessionStorageService,
              private store: Store
  ) {
  }

  ngOnInit(): void {
    this.store.select(selectTrees)
      .pipe(takeUntil(this.subject$))
      .subscribe((data) => {
        data.forEach((value) => {
          if (value.host === this.host) {
            this.dataSource.data = [value.zkTree];
            const expand: ZkNodeModel[] = this.sessionStore
              .getExpandedNodes(this.host, this.dataSource.data.shift());
            if (expand) {
              expand.forEach(elem => this.treeControl.expand(elem));
            }
          }
        });
      });
  }

  ngOnChanges(): void {
    this.getAll();
  }

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }

  hasChild = (_: number, node: ZkNodeModel) => !!node.children && node.children.length > 0;

  contextMenuAction(event: MouseEvent, node: ZkNodeModel): void {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {node};
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }


  getAll(): void {
    this.http.getAll(this.host)
      .pipe(takeUntil(this.subject$))
      .subscribe((data) => {
        const tree: TreeModel = new TreeModel(this.host, data);
        this.store.dispatch(ADD_TREE({tree}));
      });
  }

  addNode(parent: ZkNodeModel): void {
    const dialogResult = this.modal.open(ChangeValueComponent,
      {
        data:
          {oldNode: parent, action: null}
      });
    dialogResult.afterClosed()
      .pipe(takeUntil(this.subject$))
      .subscribe((data: ZkNodeModel) => {
        if (data) {
          const dto = new RequestDto(this.host, (`${parent.path}/${data.name}`)
            .replace('//', '/'), data.value);
          this.http.addNode(dto).pipe(takeUntil(this.subject$))
            .pipe(takeUntil(this.subject$))
            .subscribe(() => this.getAll());
        }
      });
  }


  updateNode(node: ZkNodeModel): void {
    const dialogResult = this.modal.open(ChangeValueComponent, {
      data:
        {
          oldNode: node, action: 'update'
        },
    });
    dialogResult.afterClosed()
      .pipe(takeUntil(this.subject$))
      .subscribe((data: ZkNodeModel) => {
        if (data) {
          data.value = data.value === null ? ' ' : data.value;
          const dto = new RequestDto(this.host, `${node.path}`, `${data.name}&${data.value}`);
          this.http.updateNode(dto).pipe(takeUntil(this.subject$))
            .pipe(takeUntil(this.subject$))
            .subscribe(() => this.getAll());
        }
      });
  }


  deleteNode(item: ZkNodeModel): void {
    const dialogResult = this.modal.open(ApproveComponent);
    dialogResult.afterClosed()
      .pipe(takeUntil(this.subject$))
      .subscribe((data: boolean) => {
        if (data) {
          const dto = new RequestDto(this.host, `${item.path}`, item.value);
          this.http.deleteNode(dto).pipe(takeUntil(this.subject$))
            .pipe(takeUntil(this.subject$))
            .subscribe(() => this.getAll());
        }
      });
  }

  saveNodeState(node: ZkNodeModel, b: boolean): void {
    this.sessionStore.saveItem(this.host, node.path, !b);
  }


}

