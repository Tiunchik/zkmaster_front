import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {ZkNodeModel} from '../../shared/domains/zk-node.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-change-value',
  templateUrl: './change-value.component.html',
  styleUrls: ['./change-value.component.scss']
})
export class ChangeValueComponent implements OnInit {

  form: FormGroup;
  zkNode: ZkNodeModel = new ZkNodeModel('', '', '');

  @HostListener('window:keypress', ['$event']) onPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.submit();
    }
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: { oldNode: ZkNodeModel },
              public dialogRef: MatDialogRef<ChangeValueComponent>) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.zkNode = this.data.oldNode;
    }
    this.form = new FormGroup({
      name: new FormControl(this.zkNode.name),
      value: new FormControl(this.zkNode.value)
    });
  }

  submit(): void {
    this.dialogRef.close({...this.form.value});
  }
}
