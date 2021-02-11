import {Component, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {ZkNodeModel} from '../../../shared/domains/zk-node.model';
import {CrudService} from '../../../shared/services/http/crud.service';
import {Subject} from 'rxjs';
import {saveAs} from 'file-saver';
import * as Blob from 'blob';
import {finalize, takeUntil} from 'rxjs/operators';
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
import {TxtFileModalComponent} from '../../../modals/txt-file-modal/txt-file-modal.component';
import {ADD_CLIPBOARD} from '../../../redux/copy-past/copy-past.actions';
import {copyPastData} from '../../../redux/copy-past/copy-past.selector';
import {CopyPastModalComponent} from '../../../modals/copy-past-modal/copy-past-modal.component';
import {CopyPasteDTO} from '../../../shared/domains/copyPasteDTO';
import {SeriousMethodsService} from '../../../shared/services/http/seriousMethodsService';
import {ZkNodeUtilService} from '../../../shared/services/zk-node-util.service';
import {TransferDTOModel} from '../../../shared/domains/transferDTO.model';
import {EXPORT_TYPE} from '../../../shared/constants/constants';

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
  copiedZkNode: ZkNodeModel = null;
  dataList: ZkNodeModel[];

  @ViewChild(MatMenuTrigger, {static: false}) contextMenu: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};

  constructor(private http: CrudService,
              private serious: SeriousMethodsService,
              private modal: MatDialog,
              private sessionStore: SessionStorageService,
              private store: Store,
              private lister: ZkNodeUtilService
  ) {
  }

  ngOnInit(): void {
    this.store.select(selectTrees)
      .pipe(takeUntil(this.subject$))
      .subscribe((data) => {
        data.forEach((value) => {
          if (value.host === this.host) {
            this.dataSource.data = [value.zkTree];
            this.dataList = this.lister.zkNodeToList(value.zkTree);
            const expand: ZkNodeModel[] = this.sessionStore
              .getExpandedNodes(this.host, this.dataSource.data.shift());
            if (expand) {
              expand.forEach(elem => this.treeControl.expand(elem));
            }
          }
        });
      });
    this.store.select(copyPastData)
      .pipe(takeUntil(this.subject$))
      .subscribe((data) => {
        this.copiedZkNode = data;
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
    if (node.path !== '/') {
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
  }


  deleteNode(item: ZkNodeModel): void {
    const dialogResult = this.modal.open(ApproveComponent, {
      data: {node: item}
    });
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

  txtExport(node: ZkNodeModel): void {
    const transferDTO: TransferDTOModel = {host: this.host, nodePath: node.path, type: EXPORT_TYPE};
    this.serious.toTxt(transferDTO).subscribe(data => {
      const updatedData = data.map((elem) => elem + '\n');
      const blob = new Blob([...updatedData], {type: 'text/plain;charset=utf-8'});
      saveAs(blob, 'export.zkf');
    });

  }

  txtImport(node: ZkNodeModel): void {
    const dialogResult = this.modal.open(TxtFileModalComponent, {
      data: {newNode: node}
    });
    dialogResult.afterClosed()
      .pipe(takeUntil(this.subject$))
      .subscribe((data: ZkNodeModel) => {
        this.copiedZkNode = data;
        this.pastNode(node);
      });
  }

  saveNodeState(node: ZkNodeModel, b: boolean): void {
    this.sessionStore.saveItem(this.host, node.path, !b);
  }


  copyNode(zkNode: ZkNodeModel): void {
    this.store.dispatch(ADD_CLIPBOARD({node: zkNode}));
  }

  pastNode(zkNode: ZkNodeModel): void {
    const dialogResult = this.modal.open(CopyPastModalComponent,
      {
        data: {
          copiedNode: this.copiedZkNode,
          newFatherNode: zkNode
        }
      });
    dialogResult.afterClosed()
      .pipe(takeUntil(this.subject$))
      .subscribe((data: CopyPasteDTO) => {
        if (data !== null && data !== undefined) {
          // @ts-ignore
          const sendDTO: CopyPasteDTO = {...data.cpModel, targetHost: this.host};
          console.log(sendDTO);
          this.serious.sendCopyPast(sendDTO)
            .pipe(takeUntil(this.subject$),
              finalize(() => this.getAll()))
            .subscribe();
        }
      });
  }

}

