import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-class',
  templateUrl: './ng-class.component.html',
  styleUrls: ['./ng-class.component.css'],
})
export class NgClassComponent {
  timer = 0;

  constructor() {
    setInterval(() => {
      this.timer++;
    }, 2000);
  }

  getClass() {
    return this.timer % 2 == 1 ? 'default' : 'alert';
  }
}
