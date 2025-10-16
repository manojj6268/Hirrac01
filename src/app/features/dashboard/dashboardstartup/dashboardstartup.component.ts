import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';



type InterviewType = 'phone' | 'in-person' | 'video';

interface LocalInterviewItem {
  initials?: string;
  name: string;
  position: string;
  time: string;
  type: InterviewType;
}

interface InterviewDayBlock {
  day: string;
  items: LocalInterviewItem[];
}


@Component({
  selector: 'app-dashboardstartup',
  templateUrl: './dashboardstartup.component.html',
  styleUrls: ['./dashboardstartup.component.scss']
})
export class DashboardstartupComponent implements OnInit, OnDestroy {
  isExpandedView = false; // false = compact (initial), true = expanded/greeting layout
  private subs = new Subscription();

  username = 'Yugendar';
  newApplicationsCount = 20;

  // sample summary cards (used by top-right component)
  summaryCards= [
    { label: 'Posted Jobs', value: '050', cssClass: 'posted-jobs', icon: 'assets/images/posted Jobs.png' },
    { label: 'Applications', value: '150', cssClass: 'applications', icon: 'assets/images/applicants.png' },
    { label: 'Shortlisted', value: '100', cssClass: 'shortlisted', icon: 'assets/images/shortlist .png' },
    { label: 'Interview', value: '050', cssClass: 'interview', icon: 'assets/images/interview.png' },
    { label: 'Hired', value: '02', cssClass: 'hired', icon: 'assets/images/hired.png' },
    { label: 'Rejected', value: '50', cssClass: 'rejected', icon: 'assets/images/reject .png' }
  ];

  // sample jobs list for middle-left
  jobs = [
    { title: 'Product Designer', applications: 65, shortlisted: 50, interview: 30, hired: 2, rejected: 20 },
    { title: 'Java Developer', applications: 100, shortlisted: 65, interview: 30, hired: 2, rejected: 35 },
    { title: 'React Developer', applications: 80, shortlisted: 20, interview: 20, hired: 1, rejected: 20 },
    { title: 'Angular', applications: 200, shortlisted: 50, interview: 20, hired: 3, rejected: 10 },
    { title: 'Sr. UI/UX Designer', applications: 100, shortlisted: 20, interview: 5, hired: 1, rejected: 30 }
  ];
  // sample interviews for bottom-right
  interviews: any[] = [
    { day: 'Today', items: [
      { initials: 'RK', name: 'Ravi Kumar', position: 'Software Engineer', time: '10:30 AM', type: 'phone' },
      { initials: 'RM', name: 'Rahul Mehta', position: 'Data Analyst', time: '12:00 PM', type: 'in-person' },
      { initials: 'VS', name: 'Vikram Singh', position: 'Project Coordinator', time: '1:00 PM', type: 'in-person' }
    ]},
    { day: 'Tomorrow', items: [
      { initials: 'AS', name: 'Ananya Sharma', position: 'UI/UX Designer', time: '11:30 AM', type: 'in-person' },
      { initials: 'PD', name: 'Priya Desai', position: 'Quality Assurance Engineer', time: '1:30 PM', type: 'phone' }
    ]}
  ];

  recentSearch = {
    title: 'UI Designer',
    location: 'Orange, 1-5 Miles',
    criteria: 'UI Design, interaction design, UX basics, & more...',
    timeAgo: '4d ago'
  };

  greetingText = ''; // computed greeting (Good morning / afternoon / evening / night)

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // compute greeting text once
    this.greetingText = this.computeGreeting();

    // watch query params to toggle expanded view
    this.subs.add(
      this.route.queryParams.subscribe((params: Params) => {
        this.isExpandedView = params['view'] === 'expanded';
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  computeGreeting(): string {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'Good Morning';
    if (h >= 12 && h < 17) return 'Good Afternoon';
    if (h >= 17 && h < 21) return 'Good Evening';
    return 'Good Night';
  }

  // optional helper: toggle between compact and expanded programmatically
  showCompact() {
    // navigate to /dashboard (no view param)
    this.router.navigate([], { relativeTo: this.route, queryParams: {}, queryParamsHandling: 'merge' });
  }

}
