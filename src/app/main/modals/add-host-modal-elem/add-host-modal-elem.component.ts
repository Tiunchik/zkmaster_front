import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-host-modal-elem',
  templateUrl: './add-host-modal-elem.component.html',
  styleUrls: ['./add-host-modal-elem.component.scss']
})
export class AddHostModalElemComponent implements OnInit {

  form: FormGroup;

  @HostListener('window:keypress', ['$event']) onPress(event: KeyboardEvent): void {
    console.log(event);
    if (event.key === 'Enter') {
      this.submit();
    }
  }

  constructor(public dialogRef: MatDialogRef<AddHostModalElemComponent>) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('local', Validators.required),
      address: new FormControl('localhost:2181', Validators.required)
    });
  }

  submit(): void {
    this.dialogRef.close({...this.form.value});
  }
}
