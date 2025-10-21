import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('login-page');
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('login-page');
    }
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  togglePassword(): void { this.hide = !this.hide; }

  onSubmit(): void {
    console.log('onSubmit called');
    console.log('Form valid:', this.loginForm.valid);
    console.log('Form errors:', this.loginForm.errors);
    console.log('Email errors:', this.email?.errors);
    console.log('Password errors:', this.password?.errors);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    // replace with real auth logic
    console.log('Login values', this.loginForm.value);
    alert('Logged in (demo).');
    // this.router.navigate(['/dashboard']);
  }

  onContinueWithGoogle(): void {
    alert('Google login (demo).');
  }

  onContinueWithFacebook(): void {
    alert('Facebook login (demo).');
  }
}
