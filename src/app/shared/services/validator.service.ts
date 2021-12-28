import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  firstNameRegex = '^[a-zA-Z](( |-)?[a-zA-Zà-ü]*){2,20}';
  lastNameRegex = '^[a-zA-Z](( |-)?[a-zA-Zà-ü]*){2,20}';
  emailRegex = '([a-z0-9])*((\\.|_)*[a-z0-9])+@[a-z]+\\.[a-z]{2,3}';

  constructor() { }

  validAge(): ValidatorFn {
    return (control: AbstractControl) => {
      return moment().diff(control?.value, 'years') >= 18 ? null : { isUnderAge: true };
    };
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : { isMatching: true };
    };
  }
}
