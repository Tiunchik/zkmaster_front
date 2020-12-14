import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-div-block',
  templateUrl: './div-block.component.html',
  styleUrls: ['./div-block.component.scss']
})
export class DivBlockComponent implements OnInit {

  @Input() tabs: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
