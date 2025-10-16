import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-setting',
  templateUrl: './notification-setting.component.html',
  styleUrls: ['./notification-setting.component.scss']
})
export class NotificationSettingComponent implements OnInit {
  // sidebar navigation items
  navItems = [
    { label: 'Profile & Security', route: '/profile/profile-security' },
    { label: 'Notification Settings', route: '/profile/notification-settings' },
    { label: 'Subscription & Billing', route: '/profile/subscription-billing' },
    { label: 'Support & Help', route: '/profile/support-help' }
  ];

  // active route for highlighting
  activeRoute = this.navItems[1].route; // default to notifications view

  // toggle states
  notification = true;
  emailAlerts = true;
  candidateMessageAlerts = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // sync activeRoute with current url
    this.activeRoute = this.router.url || this.activeRoute;
    this.router.events.subscribe(() => {
      this.activeRoute = this.router.url;
    });
  }

  navigateTo(route: string): void {
    // navigate and update active state
    this.router.navigateByUrl(route);
    this.activeRoute = route;
  }

  toggle(field: 'notification' | 'emailAlerts' | 'candidateMessageAlerts'): void {
    this[field] = !this[field];
  }
}


