import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {GET_CURRENT_TAB} from '../../redux/currentTab/currentTabs.actions';
import {selectCurrentTab} from '../../redux/currentTab/currentTabs.selector';
import {HostModel} from '../../shared/domains/host.model';

@Component({
  selector: 'app-add-host-modal-elem',
  templateUrl: './add-host-modal-elem.component.html',
  styleUrls: ['./add-host-modal-elem.component.scss']
})
export class AddHostModalElemComponent implements OnInit {

  form: FormGroup;
  currentTab = '';

  @HostListener('window:keypress', ['$event']) onPress(event: KeyboardEvent): void {
    console.log(event);
    if (event.key === 'Enter') {
      this.submit();
    }
  }

  constructor(public dialogRef: MatDialogRef<AddHostModalElemComponent>,
              private store: Store) {
  }

  ngOnInit(): void {
    this.store
      .select(selectCurrentTab)
      .subscribe((tabName) => {
        this.currentTab = tabName;
      });
    this.form = new FormGroup({
      name: new FormControl('local', Validators.required),
      address: new FormControl('localhost:2181', Validators.required)
    });
  }

  submit(): void {
    if (this.currentTab !== '' && this.currentTab !== null) {
      const host: HostModel = new HostModel(this.form.value.name, this.form.value.address, this.currentTab);
      this.dialogRef.close({...host});
    } else {
      this.dialogRef.close();
    }
  }
}
