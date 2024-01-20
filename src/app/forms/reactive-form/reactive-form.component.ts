import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, map, timer } from 'rxjs';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  forbiddenNames = ['God', 'Devil'];
  allowedDomains: string[] = ['gmail', 'yahoo'];
  pswRgx = '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]{2,})(?=.*?[!@#$%^&*]).{1,}';
  myForm: FormGroup = new FormGroup({
    personalData: new FormGroup({
      name: new FormControl(null, [Validators.required, this.names.bind(this)]),
      gender: new FormControl('male'),
      age: new FormControl(null, [Validators.min(18), Validators.max(90)]),
    }),
    mail: new FormControl(
      null,
      [
        Validators.required,
        Validators.email,
        CustomValidators.domainsRegex(this.allowedDomains),
      ],
      [CustomValidators.asyncForbiddenMailsPrm(), this.asyncForbiddenMailsObs()]
    ),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(this.pswRgx),
      Validators.minLength(10),
      Validators.maxLength(12),
    ]),
    secret: new FormControl(),
    answer: new FormControl(null, Validators.required),
    languages: new FormArray([]),
  });

  ngOnInit(): void {
    this.myForm.valueChanges.subscribe((value) => {
      console.log('value changed!');
      console.log(value);
    });
    this.myForm.statusChanges.subscribe((status) => {
      console.log('current status of the form is: ' + status);
    });
  }

  onSubmit() {
    console.log(this.myForm);
  }

  onAddLanguages() {
    const control = new FormControl(null, Validators.required);
    let languagesArray = this.myForm.controls['languages'];
    if (languagesArray.valid) {
      (<FormArray>languagesArray).push(control);
    }
  }

  names(control: FormControl): { [s: string]: boolean } | null {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return { nameForbidden: true };
    }
    return null;
  }

  name(): ValidatorFn {
    return (control: AbstractControl) => {
      return this.forbiddenNames.indexOf(control.value) !== -1
        ? { nameForbidden: true }
        : null;
    };
  }

  asyncForbiddenMailsObs(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return timer(1000).pipe(
        map(() => {
          return control.value === 'test@yahoo.com'
            ? { mailForbidden: true }
            : null;
        })
      );
    };
  }

  get languages(): FormArray {
    return this.myForm.get('languages') as FormArray;
  }

  domainsWithoutRegex(
    control: FormControl,
    allowedDomains: string[]
  ): ValidationErrors | null {
    let val = control.value;
    if (val !== null) {
      let at = val.indexOf('@');
      let hasDot = val.substring(at).indexOf('.') !== -1;
      let dot = hasDot ? val.substring(at).indexOf('.') + at : val.length;
      let domain = val.substring(at + 1, dot).toLowerCase();
      if (!allowedDomains.includes(domain)) {
        return { domainIsForbidden: true };
      }
    }
    return null;
  }
}
