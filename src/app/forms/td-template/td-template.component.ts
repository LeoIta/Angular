import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-td-template',
  templateUrl: './td-template.component.html',
  styleUrls: ['./td-template.component.css', '../validators.css'],
})
export class TdTemplateComponent {
  @ViewChild('myForm') appForm!: NgForm;
  defaultUser = 'Pippo';
  secretAnswer = '';
  defaultEmail = 'user@gmail.com';

  details = {
    answer: '',
    password: '',
    personalData: {
      name: '',
      gender: '',
      age: 0,
      mail: '',
    },
    secret: '',
  };

  onSubmit() {
    console.log(this.appForm);
    this.details.password = this.appForm.value.password;
    this.details.secret = this.appForm.value.secret;
    this.details.answer = this.appForm.value.answer;
    this.details.personalData.name = this.appForm.value.personalData.name;
    this.details.personalData.gender = this.appForm.value.personalData.gender;
    this.details.personalData.age = this.appForm.value.personalData.age;
    this.details.personalData.mail = this.appForm.value.personalData.mail;
    this.appForm.reset();
  }

  setDefaultEmail() {
    // this.appForm.setValue({
    //   answer: '',
    //   password: '',
    //   personalData: {
    //     name: '',
    //     gender: '',
    //     age: 0,
    //     mail: this.defaultEmail,
    //   },
    //   secret: '',
    // });

    this.appForm.form.patchValue({ personalData: { mail: this.defaultEmail } });
  }
}
