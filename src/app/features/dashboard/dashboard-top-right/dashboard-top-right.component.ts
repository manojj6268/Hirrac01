import { Component , Input } from '@angular/core';

export interface SummaryCard {
  label: string;
  value: string | number;
  icon?: string; // path to icon
  cssClass?: string; // posted-jobs, applications, shortlisted, interview, hired, rejected
}

@Component({
  selector: 'app-dashboard-top-right',
  templateUrl: './dashboard-top-right.component.html',
  styleUrl: './dashboard-top-right.component.scss'
})
export class DashboardTopRightComponent {
   // Allow parent component to pass cards; fallback to defaults
  @Input() cards: SummaryCard[] = [
    { label: 'Posted Jobs', value: '050', icon: 'assets/images/posted Jobs.png', cssClass: 'posted-jobs' },
    { label: 'Applications', value: '150', icon: 'assets/images/applicants.png', cssClass: 'applications' },
    { label: 'Shortlisted', value: '100', icon: 'assets/images/shortlist .png', cssClass: 'shortlisted' },
    { label: 'Interview', value: '050', icon: 'assets/images/interview.png', cssClass: 'interview' },
    { label: 'Hired', value: '02', icon: 'assets/images/hired.png', cssClass: 'hired' },
    { label: 'Rejected', value: '50', icon: 'assets/images/reject .png', cssClass: 'rejected' }
  ];
}
