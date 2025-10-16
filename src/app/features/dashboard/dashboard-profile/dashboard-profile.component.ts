import { Component, Input, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    this.greeting = this.greetingOverride ?? this.computeGreeting(this.timeZone);
    // show what the component sees
    console.table(this.cards);
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
}
