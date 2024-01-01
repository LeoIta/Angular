import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basic-ngForm',
  template: `
    <!-- <form #myForm (ngSubmit)="onSubmit(myForm)"> -->
    <!-- <form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)"> -->
    <form #myForm="ngForm" (ngSubmit)="onSubmit()">
      <label>Username</label>
      <input type="text" />
      <label>Mail</label>
      <input type="email" />
      <button type="submit">Save</button>
    </form>
  `,
  styleUrls: ['../forms.css'],
})
export class BasicNgFormComponent {
  @ViewChild('myForm') form!: NgForm;

  // onSubmit(form: any) {
  //   console.log(form);
  // }

  // onSubmit(form: HTMLElement) {
  //   console.log(form);
  // }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    console.log(this.form);
  }
}
