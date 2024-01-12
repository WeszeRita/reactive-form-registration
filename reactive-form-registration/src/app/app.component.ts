import { Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      confirmPassword: [null, Validators.required],
      address: this.formBuilder.group({
        street: [null],
        city: [null],
        state: [null],
        zip: [null, [Validators.min(1011), Validators.max(9985)]],
        phoneNumber: [null, Validators.pattern('^[1-9][0-9]{8}$')],
      }),
    })
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    if (password !== confirmPassword) {
      confirmPassword.setErrors({ passwordMismatchError: true })
    }
  };

  onSubmit(): void {
    console.log('Form values:', this.registrationForm.value);
    this.registrationForm.reset();
  }
}
