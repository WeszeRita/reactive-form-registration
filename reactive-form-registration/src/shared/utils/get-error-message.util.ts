import { ErrorMessage } from '../enums';
import { AbstractControl } from '@angular/forms';

export function getErrorMessage(formControl: AbstractControl): string {
  if (formControl.hasError('required')) {
    return ErrorMessage.required;
  }

  if (formControl.hasError('email')) {
    return ErrorMessage.emailFormat;
  }

  if (formControl.hasError('invalid-password')) {
    return ErrorMessage.passwordStrength;
  }

  if (formControl.hasError('password-mismatch')) {
    return ErrorMessage.passwordMatch;
  }

  if (formControl.hasError('min') || formControl.hasError('max')) {
    return ErrorMessage.zipFormat;
  }

  if (formControl.hasError('invalid-phone')) {
    return ErrorMessage.phoneFormat;
  }

  return ''
}
