import { Component } from '@angular/core';

@Component({
  selector: 'app-property-binding',
  templateUrl: './property-binding.component.html',
  styleUrls: ['./property-binding.component.css'],
})
export class PropertyBindingComponent {
  disabled = true;
  clock: any;
  constructor() {
    this.clock = setInterval(() => {
      this.disabled = !this.disabled;
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.clock);
  }
  getTextColor() {
    return 'white';
  }
}
