import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SummaryCard {
  label: string;
  value: string | number;
  icon?: string;
  cssClass?: string;
}

@Component({
  selector: 'app-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.scss']
})
export class DashboardProfileComponent implements OnInit {
  // internal storage with default sample cards
  private _cards: SummaryCard[] = [
    { label: 'Posted Jobs', value: 12, icon: 'assets/images/posted Jobs.png', cssClass: 'posted-jobs' },
    { label: 'Applications', value: 128, icon: 'assets/images/applicants.png', cssClass: 'applications' },
    { label: 'Shortlisted', value: 24, icon: 'assets/images/shortlist .png', cssClass: 'shortlisted' },
    { label: 'Interview', value: 8, icon: 'assets/images/interview.png', cssClass: 'interview' },
    { label: 'Hired', value: 5, icon: 'assets/images/hired.png', cssClass: 'hired' },
    { label: 'Rejected', value: 34, icon: 'assets/images/reject .png', cssClass: 'rejected' }
   
  ];
  

  
  /** Public Input with setter to protect against undefined/overwrite */
  @Input()
  set cards(value: SummaryCard[] | undefined) {
    if (Array.isArray(value)) {
      // if parent passes an array (even empty) we accept it — but log empty
      if (value.length === 0) {
        console.warn('app-dashboard-profile: received empty cards array from parent. Using default sample cards instead.');
        this._cards = [...this._cards]; // keep default
      } else {
        this._cards = value;
      }
    } else if (value === undefined) {
      // no input provided — keep default sample cards
      // (don't overwrite)
    } else {
      // Malformed value (not an array) — keep default and warn
      console.warn('app-dashboard-profile: invalid cards input (not an array). Using default sample cards.');
    }
    // helpful debug
    console.debug('app-dashboard-profile cards set:', this._cards);
  }
  get cards(): SummaryCard[] {
    return this._cards;
  }

  // greeting options (keep your existing greeting code if present)
  @Input() timeZone?: string;
  @Input() greetingOverride?: string;
  greeting = 'Greetings';

  // Active Jobs table
  activeJobsColumns: string[] = ['Applications', 'Shortlisted', 'Interview', 'Hired', 'Rejected'];
  activeJobs: Array<{
    title: string;
    Applications: number;
    Shortlisted: number;
    Interview: number;
    Hired: number;
    Rejected: number;
  }> = [
    { title: 'Product Designer', Applications: 65, Shortlisted: 50, Interview: 30, Hired: 0,  Rejected: 20 },
    { title: 'Java Developer',   Applications: 60, Shortlisted: 50, Interview: 10, Hired: 3,  Rejected: 30 },
    { title: 'React Developer',  Applications: 20, Shortlisted: 5,  Interview: 2,  Hired: 3,  Rejected: 5  },
    { title: 'Angular',          Applications: 200,Shortlisted: 50, Interview: 3,  Hired: 1,  Rejected: 150},
    { title: 'Sr. UI/UXDesigner',Applications: 100,Shortlisted: 20, Interview: 5,  Hired: 1,  Rejected: 80 }
  ];

  // Interviews list
  interviews: {
    today: Array<{ name: string; role: string; mode: 'Phone' | 'In-Person'; time: string; initials: string }>;
    tomorrow: Array<{ name: string; role: string; mode: 'Phone' | 'In-Person'; time: string; initials: string }>;
  } = {
    today: [
      { name: 'Ravi Kumar',    role: 'Software Engineer',      mode: 'Phone',     time: '10:30 AM', initials: 'RK' },
      { name: 'Rahul Mehta',   role: 'Data Analyst',           mode: 'In-Person', time: '12:00 PM', initials: 'RM' },
      { name: 'Vikram Singh',  role: 'Project Coordinator',    mode: 'In-Person', time: '02:00 PM', initials: 'VS' }
    ],
    tomorrow: [
      { name: 'Ananya Sharma', role: 'UX Designer',            mode: 'In-Person', time: '11:30 AM', initials: 'AS' },
      { name: 'Priya Desai',   role: 'Quality Assurance Engineer', mode: 'Phone', time: '01:30 PM', initials: 'PD' }
    ]
  };

  // Recently searched
  recentSearches: Array<{ title: string; location: string; criteria: string; age: string }> = [
    {
      title: 'UI Designer',
      location: 'Orange . 15 Miles',
      criteria: 'UI Design, Interaction design, UX basics,',
      age: '4d ago'
    }
  ];

  ngOnInit(): void {
    this.greeting = this.greetingOverride ?? this.computeGreeting(this.timeZone);
    // show what the component sees
    console.table(this.cards);
    this.loadDashboardData();
  }

  computeGreeting(timeZone?: string): string {
    let hour = new Date().getHours();
    if (timeZone) {
      try {
        const parts = new Intl.DateTimeFormat('en-US', { hour: '2-digit', hour12: false, timeZone })
          .formatToParts(new Date());
        const hourPart = parts.find(p => p.type === 'hour')?.value ?? '0';
        hour = parseInt(hourPart, 10);
        if (Number.isNaN(hour)) hour = new Date().getHours();
      } catch (e) {
        hour = new Date().getHours();
      }
    }
    if (hour >= 5 && hour < 12) return 'Good morning!';
    if (hour >= 12 && hour < 17) return 'Good afternoon!';
    if (hour >= 17 && hour < 21) return 'Good evening!';
    return 'Good night!';
  }

  // Optional debug helper you can call from template
  refreshGreeting(): void {
    this.greeting = this.greetingOverride ?? this.computeGreeting(this.timeZone);
  }

  constructor(private http: HttpClient) {}

  private loadDashboardData(): void {
    this.http.get<any>('assets/data/dashboard.json').subscribe({
      next: (data) => {
        if (Array.isArray(data?.jobs)) {
          this.activeJobs = data.jobs.map((j: any) => ({
            title: j.title,
            Applications: Number(j.applications ?? 0),
            Shortlisted: Number(j.shortlisted ?? 0),
            Interview: Number(j.interview ?? 0),
            Hired: Number(j.hired ?? 0),
            Rejected: Number(j.rejected ?? 0)
          }));
        }

        if (Array.isArray(data?.interviews)) {
          const today: any[] = [];
          const tomorrow: any[] = [];
          data.interviews.forEach((i: any) => {
            const t: string = String(i.time ?? '');
            const isTomorrow = t.toLowerCase().includes('tomorrow');
            const cleanTime = t.replace(/\s*\(Tomorrow\)\s*/i, '');
            const item = {
              name: String(i.name ?? ''),
              role: String(i.role ?? ''),
              mode: (String(i.type ?? 'Phone') as 'Phone' | 'In-Person'),
              time: cleanTime,
              initials: this.getInitials(String(i.name ?? ''))
            };
            (isTomorrow ? tomorrow : today).push(item);
          });
          this.interviews = { today, tomorrow };
        }

        if (data?.recentSearch) {
          const rs = data.recentSearch;
          this.recentSearches = [{
            title: String(rs.title ?? ''),
            location: String(rs.location ?? ''),
            criteria: String(rs.criteria ?? ''),
            age: String(rs.timeAgo ?? '')
          }];
        }
      },
      error: () => {
        // silent failover uses existing defaults
      }
    });
  }

  private getInitials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    return parts.slice(0, 2).map(p => p[0]?.toUpperCase() ?? '').join('');
  }
}
