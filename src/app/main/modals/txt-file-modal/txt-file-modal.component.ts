import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ZkNodeModel} from '../../shared/domains/zk-node.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-txt-file-modal',
  templateUrl: './txt-file-modal.component.html',
  styleUrls: ['./txt-file-modal.component.scss']
})
export class TxtFileModalComponent implements OnInit {

  form: FormGroup;
  file: File;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { newNode: ZkNodeModel },
              public dialogRef: MatDialogRef<TxtFileModalComponent>,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      file: new FormControl('', Validators.required)
    });
  }

  prepareFile($event): void {
    this.file = $event.target.files[0];
    console.log(this.file);
  }

  uploadAndParseFile(): void {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      let fileData: string[] = fileReader.result.toString().split('\n');
      fileData = fileData.filter(el => el !== '');
      console.log(fileData);
    };
    fileReader.readAsText(this.file);
  }

  convertToZkNode(str: string[]): ZkNodeModel {
    return null;
  }
}
