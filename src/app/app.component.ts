import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'HirracApp';

    // keep track of sidebar state received from child
    sidebarExpanded = false;
    isAuthRoute = false;

    constructor(private router: Router) {}

    ngOnInit(): void {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        this.isAuthRoute = event.url.includes('/auth');
      });
    }
}
