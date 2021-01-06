import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ZkNodeModel} from '../../shared/domains/zk-node.model';

@Component({
  selector: 'app-txt-file-modal',
  templateUrl: './txt-file-modal.component.html',
  styleUrls: ['./txt-file-modal.component.scss']
})
export class TxtFileModalComponent implements OnInit {

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { oldNode: ZkNodeModel, action: string },
              public dialogRef: MatDialogRef<TxtFileModalComponent>) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      file: new FormControl('', Validators.required)
    });
  }

  log(): void {
    console.log(this.form);
  }
}
