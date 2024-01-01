import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basic-control-ngModel',
  template: `
    <form #myForm="ngForm" (ngSubmit)="onSubmit()">
      <label>Username</label>
      <input type="text" ngModel name="username" />
      <label>Mail</label>
      <input type="email" ngModel name="email" />
      <button type="submit">Save</button>
    </form>
  `,
  styleUrls: ['../forms.css'],
})
export class BasicControlNgModelComponent {
  @ViewChild('myForm') form!: NgForm;

  onSubmit() {
    console.log(this.form);
  }
}
