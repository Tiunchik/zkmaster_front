import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {ZkNodeModel} from '../../shared/domains/zk-node.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SeriousMethodsService} from '../../shared/services/http/seriousMethodsService';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-change-value',
  templateUrl: './change-value.component.html',
  styleUrls: ['./change-value.component.scss']
})
export class ChangeValueComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();
  form: FormGroup;
  zkNode: ZkNodeModel = new ZkNodeModel('', '', '');

  @HostListener('window:keypress', ['$event']) onPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.submit();
    }
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: { oldNode: ZkNodeModel, action: string },
              public dialogRef: MatDialogRef<ChangeValueComponent>,
              private seriousHttp: SeriousMethodsService) {
  }

  ngOnInit(): void {
    this.zkNode.path = this.data.oldNode.path;
    if (this.data.action) {
      this.zkNode = this.data.oldNode;
    }
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.zkNode.name, Validators.required),
      value: new FormControl(this.zkNode.value)
    });
  }

  path(): string {
    const str = this.data.action ? this.zkNode.path.substring(0, this.zkNode.path.lastIndexOf('/')) : this.zkNode.path;
    return str === '//' ? '/' : str;
  }

  disabled(): boolean {
    const update = this.data.action === 'update' ?
      (this.form.value.name !== this.zkNode.name || this.form.value.value !== this.zkNode.value) :
      true;
    return !(!this.form.invalid && update);
  }

  submit(): void {
    this.dialogRef.close({...this.form.value});
  }

  encryptValue(): void {
    const value: string = this.form.value.value.trim();
    console.log(value);
    if (value) {
      this.seriousHttp.encrypt(value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.form.get('value').setValue(data.data);
        });
    }
  }
}
