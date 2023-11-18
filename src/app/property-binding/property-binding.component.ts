import { Component } from '@angular/core';

@Component({
  selector: 'app-property-binding',
  templateUrl: './property-binding.component.html',
  styleUrls: ['./property-binding.component.css'],
})
export class PropertyBindingComponent {
  disabled = true;
  constructor() {
    setInterval(() => {
      this.disabled = !this.disabled;
    }, 2000);
  }
  getTextColor() {
    return 'white';
  }
}
