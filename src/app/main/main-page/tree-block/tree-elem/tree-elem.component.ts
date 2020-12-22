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
import {selectZkHosts} from '../../../redux/zkhost/zkhost.selector';
import {ZkHostModel} from '../../../shared/domains/zk-host.model';
import {LOAD_TREE} from '../../../redux/zkhost/zkhost.actions';
import {MatDialog} from '@angular/material/dialog';
import {ChangeValueComponent} from '../../../modals/change-value/change-value.component';
import {log} from 'util';
import {ApproveComponent} from '../../../modals/approve/approve.component';

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
              private store: Store
  ) {
  }

  ngOnInit(): void {
    this.store.select(selectZkHosts)
      .pipe(takeUntil(this.subject$))
      .subscribe((data) => {
        data.forEach((value) => {
          if (value.host === this.host) {
            this.dataSource.data = [value.zkTree];
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
        const tree: ZkHostModel = new ZkHostModel(this.host, data);
        this.store.dispatch(LOAD_TREE({tree}));
      });
  }

  addChildren(parent: ZkNodeModel): void {
    const dialogResult = this.modal.open(ChangeValueComponent, {data: null});
    dialogResult.afterClosed()
      .pipe(takeUntil(this.subject$))
      .subscribe((data: ZkNodeModel) => {
        if (data) {
          const dto = new RequestDto(this.host, `${parent.path}/${data.name}`, data.value);
          this.http.addNode(dto).pipe(takeUntil(this.subject$))
            .pipe(takeUntil(this.subject$))
            .subscribe(() => this.getAll());
        }
      });
  }


  updateValue(node: ZkNodeModel): void {
    const dialogResult = this.modal.open(ChangeValueComponent, {
      data:
        {oldNode: node},
    });
    dialogResult.afterClosed()
      .pipe(takeUntil(this.subject$))
      .subscribe((data: ZkNodeModel) => {
          if (data) {
            const dto = new RequestDto(this.host, `${node.path}`, data.value);
            this.http.updateNode(dto).pipe(takeUntil(this.subject$))
              .pipe(takeUntil(this.subject$))
              .subscribe(() => this.getAll());
          }
        });
  }


  deleteValue(item: ZkNodeModel): void {
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
}

