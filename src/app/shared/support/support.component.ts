import { Component } from '@angular/core';

interface NavItem {
  key: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})

export class SupportComponent {

    // Title for the sidebar
  title = 'Profile Settings';

  // Currently active nav key
  activeKey = 'support';

  // Sidebar navigation items
  navItems: NavItem[] = [
    { key: 'profile', label: 'Profile & Security', icon: '👤' },
    { key: 'notifications', label: 'Notification Settings', icon: '🔔' },
    { key: 'billing', label: 'Subscription & Billing', icon: '💳' },
    { key: 'support', label: 'Support & Help', icon: '❓' }
  ];

  setActive(key: string): void {
    this.activeKey = key;
    console.log('Selected nav:', key);
  }

}
