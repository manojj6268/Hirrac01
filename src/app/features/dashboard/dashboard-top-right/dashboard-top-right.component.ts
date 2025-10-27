import { Component , Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';

export interface SummaryCard {
  label: string;
  value: string | number;
  icon?: string; // path to icon
  cssClass?: string; // posted-jobs, applications, shortlisted, interview, hired, rejected
  backgroundColor?: string;
  color?: string;
}

@Component({
  selector: 'app-dashboard-top-right',
  templateUrl: './dashboard-top-right.component.html',
  styleUrls: ['./dashboard-top-right.component.scss']
})
export class DashboardTopRightComponent implements OnInit {
   // Allow parent component to pass cards; fallback to defaults
  @Input() cards: SummaryCard[] = [
    { label: 'Posted Jobs', value: '050', icon: 'assets/images/posted Jobs.png', cssClass: 'posted-jobs' },
    { label: 'Applications', value: '150', icon: 'assets/images/applicants.png', cssClass: 'applications' },
    { label: 'Shortlisted', value: '100', icon: 'assets/images/shortlist .png', cssClass: 'shortlisted' },
    { label: 'Interview', value: '050', icon: 'assets/images/interview.png', cssClass: 'interview' },
    { label: 'Hired', value: '02', icon: 'assets/images/hired.png', cssClass: 'hired' },
    { label: 'Rejected', value: '50', icon: 'assets/images/reject .png', cssClass: 'rejected' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/dashboard.json').subscribe(data => {
      const summary = Array.isArray(data?.summary) ? data.summary : [];
      this.cards = summary.map((item: any) => {
        const cssClass = (item.label || '')
          .toString()
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9\-]/g, '');

        const icon = this.iconFor(cssClass);

        // Normalize colors: prefer solid accent colors for legibility
        let color: string | undefined = item.color;
        // If color has alpha like #RRGGBBAA, strip AA for solid display
        if (typeof color === 'string' && color.length === 9 && color.startsWith('#')) {
          color = color.slice(0, 7);
        }
        // Specific fix: posted-jobs number color
        if (cssClass === 'posted-jobs') {
          color = '#053997';
        }

        return {
          label: item.label,
          value: item.value,
          cssClass,
          icon,
          backgroundColor: item['background-color'] || item.backgroundColor,
          color
        } as SummaryCard;
      });
    });
  }

  private iconFor(cssClass: string): string | undefined {
    switch (cssClass) {
      case 'posted-jobs':
        return 'assets/images/posted Jobs.png';
      case 'applications':
        return 'assets/images/applicants.png';
      case 'shortlisted':
        return 'assets/images/shortlist .png';
      case 'interview':
        return 'assets/images/interview.png';
      case 'hired':
        return 'assets/images/hired.png';
      case 'rejected':
        return 'assets/images/reject .png';
      default:
        return undefined;
    }
  }
}
