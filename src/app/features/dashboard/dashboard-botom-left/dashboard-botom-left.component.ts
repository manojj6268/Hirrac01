import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-botom-left',
  templateUrl: './dashboard-botom-left.component.html',
  styleUrl: './dashboard-botom-left.component.scss'
})
export class DashboardBotomLeftComponent {

  @Input() recentSearch: {
    title?: string;
    location?: string;
    criteria?: string;
    timeAgo?: string;
  } = {};

}
