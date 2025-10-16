import { Component, Input } from '@angular/core';

export interface InterviewItem {
  initials?: string;
  name: string;
  position: string;
  time: string;
  type: 'phone' | 'in-person' | 'video';
}

@Component({
  selector: 'app-dashboard-bottom-right',
  templateUrl: './dashboard-bottom-right.component.html',
  styleUrl: './dashboard-bottom-right.component.scss'
})
export class DashboardBottomRightComponent {
  @Input() interviews: { day: string; items: InterviewItem[] }[] = [
    {
      day: 'Today',
      items: [
        { initials: 'RK', name: 'Ravi Kumar', position: 'Software Engineer', time: '10:30 AM', type: 'phone' },
        { initials: 'RM', name: 'Rahul Mehta', position: 'Data Analyst', time: '12:00 PM', type: 'in-person' },
        { initials: 'VS', name: 'Vikram Singh', position: 'Project Coordinator', time: '1:00 PM', type: 'in-person' }
      ]
    },
    {
      day: 'Tomorrow',
      items: [
        { initials: 'AS', name: 'Ananya Sharma', position: 'UI/UX Designer', time: '11:30 AM', type: 'in-person' },
        { initials: 'PD', name: 'Priya Desai', position: 'Quality Assurance Engineer', time: '1:30 PM', type: 'phone' }
      ]
    }
  ];

  getInitials(name: string): string {
    if (!name) return '';
    const parts = name.split(' ');
    const initials = parts.map(part => part[0].toUpperCase()).join('');
    return initials.slice(0, 2); // show only first 2 letters
  }
}
