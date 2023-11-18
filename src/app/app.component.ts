import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular';
  label = 'show current example';
  bool = true;

  updateBool(display: boolean) {
    this.bool = display;
  }
}
