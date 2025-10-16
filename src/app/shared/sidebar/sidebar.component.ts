import { Component, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isCollapsed = false;

    // Emit expanded state (true when expanded)
    @Output() expandedChange = new EventEmitter<boolean>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.expandedChange.emit(this.isCollapsed);
  }

  toggleDashboardView() {
    // read current query param
    const q = this.route.snapshot.queryParamMap.get('view');
    if (q === 'expanded') {
      // remove the param -> back to compact
      this.router.navigate([], { relativeTo: this.route, queryParams: { view: null }, queryParamsHandling: 'merge' });
    } else {
      // set the param -> expanded view
      this.router.navigate([], { relativeTo: this.route, queryParams: { view: 'expanded' }, queryParamsHandling: 'merge' });
    }
  }
    
}

