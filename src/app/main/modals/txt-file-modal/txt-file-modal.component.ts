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
      const totalNode: ZkNodeModel = fileData.length > 0 ? this.convertToZkNode(fileData) : null;
      this.dialogRef.close({totalNode});
    };
    fileReader.readAsText(this.file);
  }

  convertToZkNode(str: string[]): ZkNodeModel {
    let zkNodes = this.makeZkNodesList(str);
    zkNodes = this.findChildrens(zkNodes);
    return this.findElder(zkNodes);
  }

  makeZkNodesList(str: string[]): ZkNodeModel[] {
    const zkNodes: ZkNodeModel[] = [];
    str.forEach(elem => {
      if (elem.indexOf(':') > 0) {
        const temp: string[] = elem.split(':');
        const value = temp[1].trim().length === 0 ? '' : temp[1].trim();
        const name = temp[0].substring(temp[0].lastIndexOf('/') + 1);
        const newNode = new ZkNodeModel(temp[0].trim(), value, name.trim(), []);
        zkNodes.push(newNode);
      }
    });
    return zkNodes;
  }

  findChildrens(zkNodes: ZkNodeModel[]): ZkNodeModel[] {
    zkNodes.forEach((outElem, outIndex) => {
      zkNodes.forEach((inElem, inIndex) => {
        const inPath = inElem.path.substring(0, inElem.path.length - (inElem.name.length + 1));
        if (inElem.path !== '/' && outElem.path === inPath) {
          zkNodes[outIndex].children.push(zkNodes[inIndex]);
        }
      });
    });
    return zkNodes;
  }

  findElder(zkNodes: ZkNodeModel[]): ZkNodeModel {
    let result = null;
    let finalNode: ZkNodeModel = zkNodes.length > 0 ? zkNodes[0] : null;
    if (finalNode) {
      zkNodes.forEach((elem, index) => {
        if (elem.path.length < finalNode.path.length) {
          finalNode = zkNodes[index];
        }
      });
      result = finalNode;
    }
    return result;
  }

}
