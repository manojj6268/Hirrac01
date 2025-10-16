
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../service/sidebar.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})

export class SideNavComponent implements OnInit, OnDestroy {
  isOpen = false;
  isCollapsed = false;
  activeItem: string = 'Dashboard'; // Initialize with a default active item
  private subscription: Subscription = new Subscription();

  @Output() collapsedChange = new EventEmitter<boolean>();

  menuItems = [
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: '/dashboard'
    },
    {
      icon: 'add',
      label: 'Post A Job',
      route: '/jobs/create'
    },
    {
      icon: 'work',
      label: 'Jobs',
      route: '/jobs'
    },
    {
      icon: 'search',
      label: 'Search candidate',
      route: '/candidate-search'
    },
    {
      icon: 'people',
      label: 'Candidates'
    },
    {
      icon: 'event_note',
      label: 'Interviews',
      route: '/interviews'
    }
  ];

  navigateToAdvancedFilters(): void {
    this.router.navigate(['/candidate-search/advanced']);
  }

  constructor(
    private router: Router,
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    // Subscribe to sidebar collapse state from service
    this.subscription.add(
      this.sidebarService.isCollapsed$.subscribe(isCollapsed => {
        this.isCollapsed = isCollapsed;
        // Emit change when state updates
        this.collapsedChange.emit(isCollapsed);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  closeSidebar() {
    this.isOpen = false;
  }

  toggleCollapse() {
    this.sidebarService.toggleCollapse();
  }

  onTransitionEnd() {
    // Emit the current collapsed state when transition completes
    this.collapsedChange.emit(this.isCollapsed);
  }

  setActiveItem(label: string) {
    this.activeItem = label;
  }
}