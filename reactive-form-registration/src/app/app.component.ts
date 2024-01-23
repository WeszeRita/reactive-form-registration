import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { getErrorMessage } from '../shared/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  registrationForm: FormGroup;
  getErrorMessage = getErrorMessage;
  private readonly passwordRegEx = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$');
  private readonly phoneRegEx = RegExp(/^[1-9][0-9]{8}$/);

  get usernameControl(): AbstractControl<string> {
    return this.registrationForm.get('username');
  }

  get emailControl(): AbstractControl<string> {
    return this.registrationForm.get('email');
  }

  get passwordControl(): AbstractControl<string> {
    return this.registrationForm.get('credentials.password');
  }

  get confirmPasswordControl(): AbstractControl<string> {
    return this.registrationForm.get('credentials.confirmPassword');
  }

  get zipControl(): AbstractControl<string> {
    return this.registrationForm.get('address.zip');
  }

  get phoneNumberControl(): AbstractControl<string> {
    return this.registrationForm.get('address.phoneNumber');
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      credentials: this.formBuilder.group({
          password: [null, [Validators.required, this.customPatternValidator(this.passwordRegEx, 'invalid-password')]],
          confirmPassword: [null],
        },
        {
          validators: this.passwordMatchValidator
        }),
      address: this.formBuilder.group({
        street: [null],
        city: [null],
        state: [null],
        zip: [null, [Validators.min(1011), Validators.max(9985)]],
        phoneNumber: [null, this.customPatternValidator(this.phoneRegEx, 'invalid-phone')],
      }),
    });
  }

  passwordMatchValidator(control: AbstractControl): void {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ 'password-mismatch': true });
    }
  };

  customPatternValidator(pattern: RegExp, errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const valid = pattern.test(control.value);
      return valid ? null : {[ errorMessage]: true } as ValidationErrors;
    };
  }

  onSubmit(): void {
    console.log('Form values:', this.registrationForm.value);
    this.registrationForm.reset();
  }
}
