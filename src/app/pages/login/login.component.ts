import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(12)],
    ],
  });

  constructor(private fb: FormBuilder, private _router: Router) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  handleSubmit() {
    const { email, password } = this.loginForm.value;

    if (email === 'mrinmaydey@ng.com' && password === '12345') {
      console.log('you loged in');
      localStorage.setItem('ng-auth', email);

      this._router.navigate(['dashboard']);
    } else {
      alert('Invalid credentials');
    }
  }
}
