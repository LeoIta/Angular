import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, map, timer } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  myForm!: FormGroup;
  languages!: FormArray;
  forbiddenNames = ['God', 'Devil'];
  allowedDomains = ['gmail', 'yahoo'];
  pswRgx = '[A-Z]+[a-z]+[0-9]{2,}[!@#$%^&*]+';
  forbiddenEmail = 'test@gmail.com';

  ngOnInit(): void {
    this.myForm = new FormGroup({
      personalData: new FormGroup({
        name: new FormControl(null, [
          Validators.required,
          this.names.bind(this),
        ]),
        gender: new FormControl('male'),
        age: new FormControl(null, [Validators.min(18), Validators.max(90)]),
      }),
      mail: new FormControl(
        null,
        [Validators.required, Validators.email, this.domains.bind(this)],
        [this.asyncForbiddenMailsPrm(), this.asyncForbiddenMailsObs()]
      ),
      password: new FormControl(null, [
        Validators.pattern(this.pswRgx),
        Validators.minLength(10),
        Validators.maxLength(12),
      ]),
      secret: new FormControl(),
      answer: new FormControl(null, Validators.required),
      languages: new FormArray([]),
    });
    this.languages = <FormArray>this.myForm.get('languages');
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
    if (this.myForm.controls['languages'].valid) {
      (<FormArray>this.myForm.get('languages')).push(control);
    }
  }

  domains(control: FormControl): { [s: string]: boolean } | null {
    let val = control.value;
    if (val !== null) {
      let at = val.indexOf('@');
      let hasDot = val.substring(at).indexOf('.') !== -1;
      let dot = hasDot ? val.substring(at).indexOf('.') + at : val.length;
      let domain = val.substring(at + 1, dot).toLowerCase();
      if (!this.allowedDomains.includes(domain)) {
        return { domainIsForbidden: true };
      }
    }
    return null;
  }

  names(control: FormControl): { [s: string]: boolean } | null {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return { nameForbidden: true };
    }
    return null;
  }

  asyncForbiddenMailsPrm(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          if (control.value === this.forbiddenEmail) {
            resolve({ mailForbidden: true });
          } else {
            resolve(null);
          }
        }, 1000);
      });
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
}
