import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-form',
  template: `
    <form (ngSubmit)="onSubmit()">
      <label>Username</label>
      <input type="text" />
      <label>Mail</label>
      <input type="email" />
      <button type="submit">Save</button>
    </form>
  `,
  styleUrls: ['../forms.css'],
})
export class BasicFormComponent {
  onSubmit() {
    console.log('form saved');
  }
}
