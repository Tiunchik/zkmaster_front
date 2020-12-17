import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {ZkNodeModel} from '../../shared/domains/zk-node.model';
import {CrudService} from '../../shared/services/crud.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatMenuTrigger} from '@angular/material/menu';
import {RequestDto} from '../../shared/domains/request.dto';

@Component({
  selector: 'app-tree-elem',
  templateUrl: './tree-elem.component.html',
  styleUrls: ['./tree-elem.component.scss']
})
export class TreeElemComponent implements OnInit, OnDestroy {

  @Input('hostAddress') host: string;
  subject$ = new Subject();

  treeControl = new NestedTreeControl<ZkNodeModel>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ZkNodeModel>();

  @ViewChild(MatMenuTrigger, {static: false}) contextMenu: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};

  constructor(private http: CrudService) {
  }

  ngOnInit(): void {
    this.http.getAll(this.host)
      .pipe(takeUntil(this.subject$))
      .subscribe(data => this.dataSource.data = [data]);
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

  addChildren(item: ZkNodeModel): void {
    const dto = new RequestDto(this.host, item.path, item.value);
    this.http.addNode(dto).pipe(takeUntil(this.subject$)).subscribe();
  }


  updateValue(item: ZkNodeModel): void {
    const dto = new RequestDto(this.host, item.path, item.value);
    this.http.updateNode(dto).pipe(takeUntil(this.subject$)).subscribe();
  }


  deleteValue(item: ZkNodeModel): void {
    const dto = new RequestDto(this.host, item.path, item.value);
    this.http.deleteNode(dto).pipe(takeUntil(this.subject$)).subscribe();
  }
}

