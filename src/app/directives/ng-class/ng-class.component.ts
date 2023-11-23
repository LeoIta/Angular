import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-class',
  templateUrl: './ng-class.component.html',
  styleUrls: ['./ng-class.component.css'],
})
export class NgClassComponent {
  timer = 0;
  clock: any;

  constructor() {
    this.clock = setInterval(() => {
      this.timer++;
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.clock);
  }

  getClass() {
    return this.timer % 2 == 1 ? 'default' : 'alert';
  }
}
