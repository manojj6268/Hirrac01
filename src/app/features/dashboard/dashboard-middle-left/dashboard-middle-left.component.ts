import { Component, Input } from '@angular/core';

export interface JobRow {
  title: string;
  applications: number;
  shortlisted: number;
  interview: number;
  hired: number;
  rejected: number;
}

@Component({
  selector: 'app-dashboard-middle-left',
  templateUrl: './dashboard-middle-left.component.html',
  styleUrls: ['./dashboard-middle-left.component.scss']
})
export class DashboardMiddleLeftComponent {
jobs = [
  { "title": "Product Designer", "applications": 65, "shortlisted": 50, "interview": 30, "hired": 0, "rejected": 20 },
  { "title": "Java Developer", "applications": 100, "shortlisted": 65, "interview": 10, "hired": 1, "rejected": 35 },
  { "title": "React Developer", "applications": 20, "shortlisted": 10, "interview": 2, "hired": 0, "rejected": 15 },
  { "title": "Angular", "applications": 150, "shortlisted": 100, "interview": 50, "hired": 2, "rejected": 150 },
 ]   ;
}
