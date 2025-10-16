import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService, Candidate } from '../../../service/candidate.service';
import { InterviewSchedulingComponent } from '../../../shared/components/modals/interview-scheduling/interview-scheduling.component';
import { MessagingComponent } from '../../../shared/components/modals/messaging/messaging.component';

/**
 * Standalone component for displaying candidate search results.
 * Uses Angular 16 signals for reactive state management.
 * Reads search parameters from route query params.
 * Fetches candidates using HttpClient service.
 * Displays results in side-by-side layout with filters, list, and preview.
 */
@Component({
  selector: 'app-candidate-results',
  standalone: true, // Angular 16 standalone component
  imports: [CommonModule, InterviewSchedulingComponent, MessagingComponent],
  templateUrl: './candidate-result.component.html',
  styleUrls: ['./candidate-result.component.scss']
})
export class CandidateResultsComponent implements OnInit {
  // Signals for reactive state management (Angular 16 signals)
  searchQuery = signal<string>('Candidates');
  currentPage = signal<number>(1);
  selectedCandidate = signal<Candidate | null>(null);
  selectedCandidates = signal<Candidate[]>([]);

  // Modal state
  showInterviewModal = signal<boolean>(false);
  showMessagingModal = signal<boolean>(false);
  selectedCandidateForModal = signal<Candidate | null>(null);

  // Filter signals
  distance = signal<number>(10);
  excludeContacted = signal<string>('Show All');
  timeAtJob = signal<string>('All');
  showAvailableOnly = signal<boolean>(false);
  selectedSkills = signal<string[]>([]);

  // Options for filters
  distanceOptions = [5, 10, 25, 50];
  excludeOptions = ['Show All', 'Hide Contacted'];
  timeOptions = ['All', 'Less than 1 year', '1-2 years', '2+ years'];
  skillOptions = ['UI/UX', 'React', 'Figma', 'Adobe XD', 'Prototyping'];

  // Candidates data signal
  candidates = signal<Candidate[]>([]);

  // Computed signals for derived state
  filteredCandidates = computed(() => {
    let filtered = this.candidates();

    // Apply filters
    if (this.excludeContacted() === 'Hide Contacted') {
      filtered = filtered.filter(c => !c.contacted);
    }

    if (this.timeAtJob() !== 'All') {
      filtered = filtered.filter(c => c.timeAtJob === this.timeAtJob());
    }

    if (this.selectedSkills().length > 0) {
      filtered = filtered.filter(c =>
        this.selectedSkills().some(skill => c.skills.includes(skill))
      );
    }

    if (this.showAvailableOnly()) {
      filtered = filtered.filter(c => c.availability);
    }

    return filtered;
  });

  paginatedCandidates = computed(() => {
    const start = (this.currentPage() - 1) * 5;
    return this.filteredCandidates().slice(start, start + 5);
  });

  totalPages = computed(() =>
    Math.ceil(this.filteredCandidates().length / 5)
  );

  matchCount = computed(() => this.filteredCandidates().length);

  constructor(
    private route: ActivatedRoute, // ActivatedRoute to read query params
    private router: Router, // Router for navigation
    private candidateService: CandidateService // HttpClient service for API calls
  ) {}

  ngOnInit(): void {
    // Read search parameters from route query params
    this.route.queryParams.subscribe(params => {
      const searchParams = {
        jobTitle: params['jobTitle'] || '',
        skills: params['skills'] || '',
        location: params['location'] || '',
        // Add other params as needed
      };

      // Update search query signal
      this.searchQuery.set(
        [searchParams.jobTitle, searchParams.skills, searchParams.location]
          .filter(Boolean)
          .join(' ') || 'Candidates'
      );

      // Fetch candidates using service (HttpClient)
      this.candidateService.searchCandidates(searchParams).subscribe((candidates: Candidate[]) => {
        this.candidates.set(candidates);
      });
    });
  }

  onDistanceChange(event: any): void {
    this.distance.set(+event.target.value);
    // Note: Distance filtering would be implemented in service for real API
  }

  onExcludeChange(event: any): void {
    this.excludeContacted.set(event.target.value);
    this.applyFilters();
  }

  onTimeChange(event: any): void {
    this.timeAtJob.set(event.target.value);
    this.applyFilters();
  }

  onAvailabilityChange(event: any): void {
    this.showAvailableOnly.set(event.target.checked);
    this.applyFilters();
  }

  applyFilters(): void {
    // Filters are applied reactively via computed signals
    this.currentPage.set(1); // Reset to first page when filters change
  }

  selectCandidate(candidate: Candidate): void {
    this.selectedCandidate.set(candidate);
  }

  clearFilters(): void {
    this.distance.set(10);
    this.excludeContacted.set('Show All');
    this.timeAtJob.set('All');
    this.selectedSkills.set([]);
    this.showAvailableOnly.set(false);
    this.applyFilters();
  }

  toggleSkill(skill: string): void {
    const currentSkills = this.selectedSkills();
    const index = currentSkills.indexOf(skill);
    if (index > -1) {
      this.selectedSkills.set(currentSkills.filter(s => s !== skill));
    } else {
      this.selectedSkills.set([...currentSkills, skill]);
    }
    this.applyFilters();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  viewResume(candidate: Candidate): void {
    // Open resume in new tab using safe URL
    window.open(candidate.resumeUrl, '_blank');
  }

  downloadResume(candidate: Candidate): void {
    // Create download link
    const link = document.createElement('a');
    link.href = candidate.resumeUrl;
    link.download = `${candidate.name}_resume.pdf`;
    link.click();
  }

  toggleSelectAll(event: any): void {
    if (event.target.checked) {
      this.selectedCandidates.set([...this.paginatedCandidates()]);
    } else {
      this.selectedCandidates.set([]);
    }
  }

  toggleCandidateSelection(candidate: Candidate): void {
    const current = this.selectedCandidates();
    const index = current.findIndex(c => c.id === candidate.id);
    if (index > -1) {
      this.selectedCandidates.set(current.filter(c => c.id !== candidate.id));
    } else {
      this.selectedCandidates.set([...current, candidate]);
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Shortlisted': return '#DBEAFE'; // light blue
      case 'Interview Scheduled': return '#DCFCE7'; // light green
      case 'Rejected': return '#FEE2E2'; // light red
      default: return '#DBEAFE';
    }
  }

  getStatusTextColor(status: string): string {
    switch (status) {
      case 'Shortlisted': return '#1E40AF'; // blue
      case 'Interview Scheduled': return '#166534'; // green
      case 'Rejected': return '#DC2626'; // red
      default: return '#1E40AF';
    }
  }

  viewCandidateDetail(candidate: Candidate): void {
    // Navigate to candidate detail page
    this.router.navigate(['/candidate-search/profile', candidate.id]);
  }

  openMessagingModal(candidate: Candidate): void {
    this.selectedCandidateForModal.set(candidate);
    this.showMessagingModal.set(true);
  }

  openInterviewSchedulingModal(candidate: Candidate): void {
    this.selectedCandidateForModal.set(candidate);
    this.showInterviewModal.set(true);
  }

  closeMessagingModal(): void {
    this.showMessagingModal.set(false);
    this.selectedCandidateForModal.set(null);
  }

  closeInterviewModal(): void {
    this.showInterviewModal.set(false);
    this.selectedCandidateForModal.set(null);
  }

  onMessageSent(message: string): void {
    console.log('Message sent:', message);
    this.closeMessagingModal();
  }

  onInterviewScheduled(data: any): void {
    console.log('Interview scheduled:', data);
    this.closeInterviewModal();
  }

  navigateToAdvancedFilters(): void {
    this.router.navigate(['/candidate-search/advanced']);
  }
}
