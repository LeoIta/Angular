import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class CustomValidators {
  private static forbiddenEmail = 'test@gmail.com';

  static domainsRegex(allowedDomains: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let val = control.value;
      if (val != null) {
        const regExp = new RegExp('(?<=@)[^.]*');
        let domain = val.match(regExp);
        if (allowedDomains.indexOf(domain[0]) === -1) {
          return { domainIsForbidden: true };
        }
        return null;
      }
      return null;
    };
  }

  static asyncForbiddenMailsPrm(): AsyncValidatorFn {
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
}
