import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  registrationForm: FormGroup;
  private readonly passwordRegEx = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
  private readonly phoneRegEx = '^[1-9][0-9]{8}$';

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

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      credentials: this.formBuilder.group({
          password: [null, [Validators.required, Validators.pattern(this.passwordRegEx)]],
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
        phoneNumber: [null, Validators.pattern(this.phoneRegEx)],
      }),
    });
  }

  passwordMatchValidator(control: AbstractControl): void {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatchError: true });
    }
  };

  onSubmit(): void {
    console.log('Form values:', this.registrationForm.value);
    this.registrationForm.reset();
  }
}
