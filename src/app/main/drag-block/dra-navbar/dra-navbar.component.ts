import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dra-navbar',
  templateUrl: './dra-navbar.component.html',
  styleUrls: ['./dra-navbar.component.scss']
})
export class DraNavbarComponent implements OnInit {

  @Input() list: string[] = [];
  @Input() name: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>): void {
    const current: string[] = event.previousContainer.data;
    const next: string[] = event.container.data;
    console.log(current);
    console.log(next);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  log(): void {
    console.log(`You just have clicked on ${this.name}`);
  }
}
