import { Component } from '@angular/core';

@Component({
  selector: 'app-advance-attribute',
  templateUrl: './advance-attribute.component.html',
  styleUrls: ['./advance-attribute.component.css'],
})
export class AdvanceAttributeComponent {
  inColor = 'transparent';
  outColor = 'transparent';

  updateAwayColor(color: string) {
    this.outColor = color;
  }

  updateOverColor(color: string) {
    this.inColor = color;
  }
}
