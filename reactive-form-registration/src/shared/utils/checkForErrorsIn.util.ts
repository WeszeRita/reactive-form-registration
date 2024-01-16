import { ErrorMessage } from '../enums';

export function checkForErrorsIn(formControl: string): string {
  if (this.registrationForm.get(formControl).hasError('required')) {
    return ErrorMessage.required;
  }

  if (this.registrationForm.get(formControl).hasError('email')) {
    return ErrorMessage.emailFormat;
  }

  if (formControl === 'credentials.password' && this.registrationForm.get(formControl).hasError('pattern')) {
    return ErrorMessage.passwordStrength;
  }

  if (formControl === 'credentials.confirmPassword' && this.registrationForm.get('credentials').invalid) {
    return ErrorMessage.passwordMatch;
  }

  if (this.registrationForm.get(formControl).hasError('min') || this.registrationForm.get(formControl).hasError('max')) {
    return ErrorMessage.zipFormat;
  }

  if (formControl === 'address.phoneNumber' && this.registrationForm.get(formControl).hasError('pattern')) {
    return ErrorMessage.phoneFormat;
  }

  return ''
}
