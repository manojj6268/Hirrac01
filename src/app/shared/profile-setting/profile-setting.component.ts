import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})

export class ProfileSettingsComponent implements OnInit {
  profileForm!: FormGroup;
  isSaving = false;

     // define sidebar items
  navItems = [
    { label: 'Profile & Security', route: '/profile/profile-security' },
    { label: 'Notification Settings', route: '/profile/notification-settings' },
    { label: 'Subscription & Billing', route: '/profile/subscription-billing' },
    { label: 'Support & Help', route: '/profile/support-help' }
  ];

  activeRoute = this.navItems[0].route; // default active

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      email: ['', Validators.required],
      phone: ['9876543210'],
      firstName: ['Yugendar'],
      lastName: ['Sankepally'],
      password: ['********']
    });

    // Watch current route to highlight active item
    this.router.events.subscribe(() => {
      this.activeRoute = this.router.url;
    });
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    console.log('Form data:', this.profileForm.value);

    setTimeout(() => {
      this.isSaving = false;
      alert('Profile saved successfully!');
    }, 1000);
  }
}