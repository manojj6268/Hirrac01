import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-top-left',
  templateUrl: './dashboard-top-left.component.html',
  styleUrls: ['./dashboard-top-left.component.scss']
})
export class DashboardTopLeftComponent {
  @Input() username = 'Yugendar';
  @Input() newApplicationsCount = 20;

}
