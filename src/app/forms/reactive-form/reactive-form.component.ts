import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  myForm!: FormGroup;
  languages!: FormArray;

  ngOnInit(): void {
    this.myForm = new FormGroup({
      personalData: new FormGroup({
        name: new FormControl(),
        gender: new FormControl(),
        age: new FormControl(),
      }),
      mail: new FormControl(),
      password: new FormControl(),
      secret: new FormControl(),
      answer: new FormControl(),
      languages: new FormArray([]),
    });
    this.languages = <FormArray>this.myForm.get('languages');
  }

  onSubmit() {
    console.log(this.myForm);
  }

  onAddLanguages() {
    const control = new FormControl(null, Validators.required);
    if (this.myForm.controls['languages'].valid) {
      (<FormArray>this.myForm.get('languages')).push(control);
    }
  }
}
