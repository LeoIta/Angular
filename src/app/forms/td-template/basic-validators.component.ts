import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basic-validators',
  template: `
    <form #myForm="ngForm" (ngSubmit)="onSubmit()">
      <label>Username</label>
      <input type="text" ngModel name="username" required #username="ngModel" />
      <p *ngIf="username.invalid && username.touched">
        You must insert an username!
      </p>
      <label>Mail</label>
      <input type="email" ngModel name="email" email />
      <button type="submit" [disabled]="!myForm.valid">Save</button>
    </form>
  `,
  styleUrls: ['../forms.css', '../validators.css'],
})
export class BasicValidatorsComponent {
  @ViewChild('myForm') form!: NgForm;

  onSubmit() {
    console.log(this.form);
  }
}
