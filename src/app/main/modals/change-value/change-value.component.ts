import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-change-value',
  templateUrl: './change-value.component.html',
  styleUrls: ['./change-value.component.scss']
})
export class ChangeValueComponent implements OnInit {

  value = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
