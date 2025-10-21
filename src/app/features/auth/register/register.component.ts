import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, Validators.requiredTrue]
    });
  }

  togglePassword(): void {
    this.hide = !this.hide;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    console.log('Register', this.registerForm.value);
    this.router.navigate(['/auth/employer-details']);
  }

  onContinueWithGoogle(): void {
    alert('Continue with Google (demo).');
  }

  onContinueWithFacebook(): void {
    alert('Continue with Facebook (demo).');
  }
}
