import { Component } from '@angular/core';

@Component({
  selector: 'app-component-binding',
  templateUrl: './component-binding.component.html',
  styleUrls: ['./component-binding.component.css'],
})
export class ComponentBindingComponent {
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
