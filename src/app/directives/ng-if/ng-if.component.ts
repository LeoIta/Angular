import { Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ng-if',
  templateUrl: './ng-if.component.html',
  styleUrls: ['./ng-if.component.css'],
})
export class NgIfComponent {
  active = false;
  actived = this.isActived();
  clock: any;

  ngOnInit() {
    this.clock = setInterval(() => {
      this.active = !this.active;
      this.actived = this.isActived();
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.clock);
  }

  isActive() {
    console.log('isActive() has been called');
    return this.active;
  }

  isActived() {
    console.log('isActive() has been called');
    return this.active;
  }
}
