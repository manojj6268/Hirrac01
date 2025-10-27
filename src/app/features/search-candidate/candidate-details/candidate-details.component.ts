import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss']
})
export class CandidateDetailsComponent implements OnInit {
  jobTitle: string = '';
  skills: string = '';
  location: string = '';
  showAdvancedFilters: boolean = false;

  recentSearches: { title: string; location: string; criteria: string; date: Date; query: any }[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const raw = localStorage.getItem('recent_candidate_searches');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this.recentSearches = parsed.map((x: any) => ({
            title: x.title || '—',
            location: x.location || '—',
            criteria: x.criteria || '—',
            date: x.date ? new Date(x.date) : new Date(),
            query: x.query || {},
          })).slice(0, 5);
        }
      } catch {}
    }
  }

  /**
   * Triggered when the user clicks the main "Search" button.
   * Navigates to CandidateSearchComponent with search parameters.
   */
  onSearch(): void {
    const queryParams = {
      jobTitle: this.jobTitle.trim(),
      skills: this.skills.trim(),
      location: this.location.trim(),
    };

    console.log('Searching candidates with:', queryParams);

    // store into recent list (keep latest at top, max 5)
    const title = queryParams.jobTitle || '—';
    const location = queryParams.location || '—';
    const criteria = queryParams.skills || '—';
    this.recentSearches.unshift({
      title,
      location,
      criteria,
      date: new Date(),
      query: queryParams,
    });
    this.recentSearches = this.recentSearches.slice(0, 5);
    this.persistRecent();

    this.router.navigate(['/search-candidate/search'], {
      queryParams,
    });
  }

  /**
   * Opens the advanced filters overlay/panel.
   */
  onAdvancedFilters(): void {
    this.showAdvancedFilters = true;
  }

  onAdvancedApply(filters: any): void {
    this.showAdvancedFilters = false;
    const queryParams = {
      jobTitle: this.jobTitle.trim(),
      skills: this.skills.trim(),
      location: this.location.trim(),
      ...filters,
    };

    const title = queryParams.jobTitle || '—';
    const location = queryParams.location || '—';
    const criteria = queryParams.skills || '—';
    this.recentSearches.unshift({
      title,
      location,
      criteria,
      date: new Date(),
      query: queryParams,
    });
    this.recentSearches = this.recentSearches.slice(0, 5);
    this.persistRecent();

    this.router.navigate(['/search-candidate/search'], { queryParams });
  }

  /**
   * Closes the advanced filters overlay/panel.
   */
  onCloseFilters(): void {
    this.showAdvancedFilters = false;
  }

  /**
   * Called when user applies filters from AdvancedSearchFiltersComponent.
   * Merges filters into the existing search and triggers navigation.
   */
  onApplyFilters(filters: any): void {
    console.log('Applied filters:', filters);
    this.showAdvancedFilters = false;

    this.router.navigate(['/search-candidate/search'], {
      queryParams: {
        ...filters,
        jobTitle: this.jobTitle,
        skills: this.skills,
        location: this.location,
      },
    
    });

  }

  timeAgo(d: Date): string {
    const diff = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
    const days = Math.floor(diff / 86400);
    if (days > 0) return `${days}d ago`;
    const hours = Math.floor(diff / 3600);
    if (hours > 0) return `${hours}h ago`;
    const mins = Math.floor(diff / 60);
    return `${mins}m ago`;
  }

  repeatSearch(item: { query: any }): void {
    this.router.navigate(['/search-candidate/search'], { queryParams: item.query });
  }

  private persistRecent() {
    try {
      localStorage.setItem('recent_candidate_searches', JSON.stringify(this.recentSearches));
    } catch {}
  }
  // Job Experience options
  experienceOptions = [
    { label: '1 year', checked: false },
    { label: '2 years', checked: false },
    { label: '5 years', checked: false },
    { label: '10 years', checked: false }
  ];

  // Job Type options
  typeOptions = [
    { label: 'Fulltime', checked: false },
    { label: 'Temporary', checked: false },
    { label: 'Contract', checked: false },
    { label: 'Part time', checked: false },
    { label: 'Seasonal', checked: false }
  ];

  // Education options
  educationOptions = [
    { label: 'Graduation', checked: false },
    { label: 'PG', checked: false },
    { label: 'Diploma', checked: false }
  ];

  // Notice Period options
  noticeOptions = [
    { label: 'Immediate', checked: false },
    { label: '1 month', checked: false },
    { label: '3 months', checked: false }
  ];

  onCheckboxChange(option: any, category: string): void {
    option.checked = !option.checked;
  }

  onSave(): void {
    const selectedFilters = {
      experience: this.experienceOptions.filter(opt => opt.checked).map(opt => opt.label),
      type: this.typeOptions.filter(opt => opt.checked).map(opt => opt.label),
      education: this.educationOptions.filter(opt => opt.checked).map(opt => opt.label),
      notice: this.noticeOptions.filter(opt => opt.checked).map(opt => opt.label)
    };
    this.onApplyFilters(selectedFilters);
    this.onClose();
  }

  onCancel(): void {
    this.onClose();
  }

  onClose(): void {
    this.showAdvancedFilters = false;
  }
}

