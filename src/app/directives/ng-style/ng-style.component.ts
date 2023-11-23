import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-style',
  templateUrl: './ng-style.component.html',
  styleUrls: ['./ng-style.component.css'],
})
export class NgStyleComponent {
  alert = true;
  clock: any;

  constructor() {
    this.clock = setInterval(() => {
      this.alert = !this.alert;
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.clock);
  }

  getColor() {
    return this.alert ? 'red' : 'transparent';
  }
}
