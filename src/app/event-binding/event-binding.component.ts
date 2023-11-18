import { Component } from '@angular/core';

@Component({
  selector: 'app-event-binding',
  templateUrl: './event-binding.component.html',
  styleUrls: ['./event-binding.component.css'],
})
export class EventBindingComponent {
  userName = 'unknown user';
  defaultValue = '';
  color = 'black';

  // onInput(event: any) {
  //   this.userName = event.target.value;
  //   this.defaultValue = this.userName;
  // }

  onInput(event: Event) {
    this.userName = (<HTMLInputElement>event.target).value;
    this.defaultValue = this.userName;
  }

  onClick() {
    this.defaultValue = '';
    this.userName = 'unknown user';
  }
}
